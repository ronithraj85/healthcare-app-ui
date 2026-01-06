import React, { useEffect, useState, useCallback } from "react";
import { deletePatient, getPatients, updatePatient } from "./patient.service";
import type { PatientResponseDto } from "../../types/PatientResponseDto";
import AddPatient from "./AddPatient";
import EditPatientModal from "./EditPatientModal";
import AddSlider from "../common/AddSlider";

const PatientsPage: React.FC = () => {
  const [addPatient, setAddPatient] = useState(false);
  const [patientEdited, setPatientEdit] = useState("");
  const [patientDeleted, setPatientDeleted] = useState("");
  const [patients, setPatients] = useState<PatientResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPatient, setEditingPatient] =
    useState<PatientResponseDto | null>(null);
  const [formData, setFormData] = useState<Partial<PatientResponseDto>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      const pats = await getPatients();
      setPatients(pats);
    } catch (err) {
      console.log("Error fetching patients:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleDelete = async (id: number) => {
    try {
      await deletePatient(id);
      setPatients((prev) => prev.filter((u) => u.id !== id));
      setPatientDeleted("Patient removed successfully");
      setTimeout(() => setPatientDeleted(""), 3000);
    } catch (err) {
      console.log("Error deleting patient:", err);
    }
  };

  const handleEdit = (patient: PatientResponseDto) => {
    setEditingPatient(patient);
    setFormData(patient);
  };

  const handleSave = async () => {
    if (!editingPatient) return;
    try {
      await updatePatient(editingPatient.id, formData);
      setPatients((prev) =>
        prev.map((p) =>
          p.id === editingPatient.id ? { ...p, ...formData } : p
        )
      );
      setPatientEdit("Patient updated successfully!");
      setEditingPatient(null);
      setTimeout(() => setPatientEdit(""), 3000);
    } catch (err) {
      console.log("Error updating patient:", err);
    }
  };

  // Filter for showcase
  const activePatients = patients.filter((p) => p.active);
  const filteredPatients = activePatients.filter((p) =>
    `${p.name} ${p.email} ${p.mobile}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Close handlers (overlay click + Esc key)
  const closeEditModal = () => setEditingPatient(null);
  const closeAddDrawer = () => setAddPatient(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (editingPatient) closeEditModal();
        if (addPatient) closeAddDrawer();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [editingPatient, addPatient]);

  return (
    <div className="p-4 md:p-8">
      {/* Hero Banner */}
      <div className="relative mb-10">
        <img
          src="/images/patients-banner.png"
          alt="Our Valued Patients"
          className="w-full h-[30rem] object-cover object-top rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rounded-lg flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
            OUR VALUED PATIENTS
          </h1>
        </div>
      </div>

      {/* Intro Text */}
      <p className="text-gray-700 text-lg mb-8 text-center max-w-3xl mx-auto">
        We are committed to compassionate, continuous care. Browse patient
        profiles and manage records to support every health journey.
      </p>

      {/* Search + Add */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Find a patient by name, email, or mobile..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md transition"
          onClick={() => setAddPatient(true)}
        >
          ➕ New Patient
        </button>
      </div>

      {/* Alerts */}
      {patientDeleted && (
        <div className="mb-4 p-3 bg-orange-100 text-orange-600 rounded">
          {patientDeleted}
        </div>
      )}
      {patientEdited && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          {patientEdited}
        </div>
      )}

      {/* Patient Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {loading ? (
          <p className="text-center py-4 col-span-3">Loading patients...</p>
        ) : filteredPatients.length === 0 ? (
          <p className="text-center text-gray-500 font-medium col-span-3">
            No patients to showcase.
          </p>
        ) : (
          filteredPatients.map((pat) => (
            <PatientsPage
              patient={pat}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))
        )}
      </div>

      {/* Add Patient Slider */}
      {addPatient && (
        <div>
          <AddSlider
            onClose={() => setAddPatient(false)}
            addHeader="Add Patient"
            sliderComponent={<AddPatient refreshCall={fetchPatients} />}
          />
        </div>
      )}

      {/* Edit Patient Modal */}
      {editingPatient && (
        <EditPatientModal
          formData={formData}
          setFormData={setFormData}
          handleSave={handleSave}
          closeEditModal={() => setEditingPatient(null)}
        />
      )}
    </div>
  );
};

export default PatientsPage;
