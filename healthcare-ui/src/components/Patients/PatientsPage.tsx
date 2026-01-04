import React, { useEffect, useState } from "react";
import { deletePatient, getPatients, updatePatient } from "./patient.service";
import type { PatientResponseDto } from "../../types/PatientResponseDto";
import AddPatient from "./AddPatient";

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

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const pats = await getPatients();
      setPatients(pats);
    } catch (err) {
      console.log("Error fetching patients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

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

  // Filter for both showcase and table
  const activePatients = patients.filter((p) => p.active);
  const filteredPatients = activePatients.filter((p) =>
    `${p.name} ${p.email} ${p.mobile}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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

      {/* Find a Patient Search */}
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

      {/* Patient Showcase Grid (uses filteredPatients) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {loading ? (
          <p className="text-center py-4 col-span-3">Loading patients...</p>
        ) : filteredPatients.length === 0 ? (
          <p className="text-center text-gray-500 font-medium col-span-3">
            No patients to showcase.
          </p>
        ) : (
          filteredPatients.slice(0, 6).map((patient) => (
            <div
              key={patient.id}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition"
            >
              <img
                src={
                  patient.imageUrl ||
                  "https://images.unsplash.com/photo-1544723795-3fb6469f5ae5?auto=format&fit=crop&w=600&q=80"
                }
                alt={patient.name}
                className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {patient.name}
              </h3>
              <p className="text-gray-600">{patient.email}</p>
            </div>
          ))
        )}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">All Patients</h2>
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

      {/* Patients Table (filtered) */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        {loading && (
          <p className="text-center py-4">Fetching Patients List...</p>
        )}
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Mobile</th>
              <th className="py-3 px-4 text-left">DOB</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading && filteredPatients.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-600">
                  No patients found
                </td>
              </tr>
            ) : (
              filteredPatients.map((patient, idx) => (
                <tr
                  key={patient.id}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-3 px-4">{patient.name}</td>
                  <td className="py-3 px-4">{patient.email}</td>
                  <td className="py-3 px-4">{patient.mobile}</td>
                  <td className="py-3 px-4">{patient.dateOfBirth}</td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      onClick={() => handleDelete(patient.id)}
                      className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      🗑 Delete
                    </button>
                    <button
                      onClick={() => handleEdit(patient)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                    >
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Patient Modal */}
      {addPatient && <AddPatient refreshCall={fetchPatients} />}

      {/* Edit Drawer */}
      {editingPatient && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">Edit Patient</h3>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Name"
              className="border p-2 rounded"
            />
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              className="border p-2 rounded"
            />
            <input
              type="text"
              value={formData.mobile || ""}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              placeholder="Mobile"
              className="border p-2 rounded"
            />
            <input
              type="date"
              value={formData.dateOfBirth || ""}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
              className="border p-2 rounded"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditingPatient(null)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;
