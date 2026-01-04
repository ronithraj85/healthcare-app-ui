import React, { useEffect, useState } from "react";
import type DoctorResponseDto from "../../types/DoctorResponseDto";
import { deleteDoctor, getAllDoctors } from "./doctor.service";
import AddDoctorPage from "./AddDoctor";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<DoctorResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [addDoctor, setAddDoctor] = useState(false);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const doctors = await getAllDoctors();
      setDoctors(doctors);
    } catch {
      console.log("Failed to get all the doctors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const removeDoctor = async (id: any) => {
    try {
      console.log("Deleting the doctor with id-", id);
      await deleteDoctor(id);
      setDoctors((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
    } catch {
      console.log("Failed to delete doctor");
    }
  };

  return (
    <div className="p-8">
      {/* Hero Section */}
      <div className="relative mb-8">
        <img
          src="https://images.unsplash.com/photo-1586773860418-d37222d3d6b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          alt="Hospital building"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-40 rounded-lg flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Meet Our Dedicated Doctors
          </h1>
        </div>
      </div>

      {/* Intro Text */}
      <p className="text-gray-700 mb-6 text-lg">
        Our healthcare system is powered by experienced doctors across multiple
        specializations. They are committed to providing compassionate care and
        ensuring the well-being of every patient.
      </p>

      {/* Header + Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">List of Doctors</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md transition"
          onClick={() => setAddDoctor(true)}
        >
          ➕ Add New Doctor
        </button>
      </div>

      {/* Doctors Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        {loading && <p className="text-center py-4">Fetching Doctors List...</p>}
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Specialization</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-3 px-4 font-medium">{doctor.name}</td>
                <td className="py-3 px-4">{doctor.specialization}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => removeDoctor(doctor.id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded shadow-sm transition"
                  >
                    🗑 Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {addDoctor && <AddDoctorPage onDoctorAdded={fetchDoctors} />}
      </div>
    </div>
  );
};

export default DoctorsPage;
