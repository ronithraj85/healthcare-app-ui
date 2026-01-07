import React from "react";

const PatientCard = ({ patient, handleEdit, handleDelete }) => {
  return (
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
      <h3 className="text-xl font-semibold text-gray-800">{patient.name}</h3>
      <p className="text-gray-600">{patient.email}</p>
      <p className="text-gray-600">{patient.mobile}</p>
      <p className="text-gray-600">{patient.dateOfBirth}</p>

      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => handleEdit(patient)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => handleDelete(patient.id)}
          className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
