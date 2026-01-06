import React, { useEffect, useState } from "react";
import type DoctorResponseDto from "../../types/DoctorResponseDto";
import { deleteDoctor, getAllDoctors } from "./doctor.service";
import DoctorCard from "./DoctorCard";
import AddDoctorDrawer from "../common/AddSlider";
import EditDoctorModal from "./EditDoctorModal";
import AddDoctorPage from "./AddDoctor";
import AddSlider from "../common/AddSlider";

const DoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<DoctorResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [addDoctor, setAddDoctor] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const roles = localStorage.getItem("roles");

  const [editingDoctor, setEditingDoctor] = useState<DoctorResponseDto | null>(
    null
  );
  const [formData, setFormData] = useState<Partial<DoctorResponseDto>>({});
  const [doctorEdited, setDoctorEdited] = useState("");

  // Fetch doctors
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const docs = await getAllDoctors();
      setDoctors(docs);
    } catch {
      console.log("Failed to get all the doctors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Remove doctor
  const removeDoctor = async (id: number) => {
    try {
      await deleteDoctor(id);
      setDoctors((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
    } catch {
      console.log("Failed to delete doctor");
    }
  };

  // Edit doctor
  const handleEdit = (doctor: DoctorResponseDto) => {
    setEditingDoctor(doctor);
    setFormData(doctor);
  };

  const handleSave = async () => {
    if (!editingDoctor) return;
    try {
      await updateDoctor(editingDoctor.id, formData);
      setDoctors((prev) =>
        prev.map((d) => (d.id === editingDoctor.id ? { ...d, ...formData } : d))
      );
      setDoctorEdited("Doctor updated successfully!");
      setEditingDoctor(null);
      setTimeout(() => setDoctorEdited(""), 3000);
    } catch (err) {
      console.log("Error updating doctor:", err);
    }
  };

  // Filter doctors
  const filteredDoctors = doctors.filter((doc) =>
    `${doc.name} ${doc.specialization}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8">
      {/* Banner */}
      <div className="relative mb-10">
        <img
          src="/images/doctors-banner.png"
          alt="Meet Our Dedicated Doctors"
          className="w-full h-72 md:h-96 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rounded-lg flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
            MEET OUR DEDICATED DOCTORS
          </h1>
        </div>
      </div>

      {/* Intro */}
      <p className="text-gray-700 text-lg mb-8 text-center max-w-3xl mx-auto">
        Our healthcare system is powered by experienced doctors across multiple
        specializations. They are committed to providing compassionate care and
        ensuring the well-being of every patient.
      </p>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Find a doctor by name or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Alerts */}
      {doctorEdited && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          {doctorEdited}
        </div>
      )}

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {loading ? (
          <p className="text-center col-span-3">Loading doctors...</p>
        ) : filteredDoctors.length === 0 ? (
          <p className="text-center text-gray-500 font-medium col-span-3">
            No doctors found.
          </p>
        ) : (
          filteredDoctors.map((doc) => (
            <DoctorCard
              key={doc.id}
              doctor={doc}
              roles={roles}
              onRemove={removeDoctor}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>

      {/* Add Doctor Drawer */}
      {roles?.includes("ROLE_ADMIN") && addDoctor && (
        <AddSlider
          onClose={() => setAddDoctor(false)}
          addHeader="Add Doctor"
          sliderComponent={<AddDoctorPage onDoctorAdded={fetchDoctors} />}
        />
      )}

      {roles?.includes("ROLE_ADMIN") && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md transition"
            onClick={() => setAddDoctor(true)}
          >
            ➕ Add New Doctor
          </button>
        </div>
      )}

      {/* Edit Doctor Modal */}
      {editingDoctor && (
        <EditDoctorModal
          formData={formData}
          setFormData={setFormData}
          handleSave={handleSave}
          closeEditModal={() => setEditingDoctor(null)}
        />
      )}
    </div>
  );
};

export default DoctorsPage;
