import React, { useEffect, useState } from "react";
import type DoctorResponseDto from "../../types/DoctorResponseDto";
import { deleteDoctor, getAllDoctors } from "./doctor.service";
import AddDoctorPage from "./AddDoctor";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<DoctorResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [addDoctor, setAddDoctor] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const roles = localStorage.getItem("roles");

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

  const removeDoctor = async (id: number) => {
    try {~
      await deleteDoctor(id);
      setDoctors((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
    } catch {
      console.log("Failed to delete doctor");
    }
  };

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter((doc) =>
    `${doc.name} ${doc.specialization}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8">
      {/* Hero Banner */}
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

      {/* Intro Text */}
      <p className="text-gray-700 text-lg mb-8 text-center max-w-3xl mx-auto">
        Our healthcare system is powered by experienced doctors across multiple
        specializations. They are committed to providing compassionate care and
        ensuring the well-being of every patient.
      </p>

      {/* Find a Doctor Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Find a doctor by name or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

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
            <div
              key={doc.id}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition"
            >
              <img
                src={
                  doc.imageUrl ||
                  "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80"
                }
                alt="profile picture"
                className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {doc.name}
              </h3>
              <p className="text-gray-600">{doc.specialization}</p>

              {/* Admin Actions */}
              {roles?.includes("ROLE_ADMIN") && (
                <div className="flex justify-center gap-2 mt-4">
                  <button
                    onClick={() => removeDoctor(doc.id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    🗑 Remove
                  </button>
                  <button
                    onClick={() => console.log("Edit doctor", doc)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    ✏️ Edit
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Doctor Drawer */}
      {roles?.includes("ROLE_ADMIN") && addDoctor && (
        <AddDoctorPage onDoctorAdded={fetchDoctors} />
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
    </div>
  );
};

export default DoctorsPage;
