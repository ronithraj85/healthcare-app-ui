import React from "react";
import type DoctorResponseDto from "../../types/DoctorResponseDto";

interface DoctorCardProps {
  doctor: DoctorResponseDto;
  roles: string | null;
  onRemove: (id: number) => void;
  onEdit: (doctor: DoctorResponseDto) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  roles,
  onRemove,
  onEdit,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition">
      <img
        src={doctor.imageUrl || ""}
        alt="profile picture"
        className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
      <p className="text-gray-600">{doctor.specialization}</p>

      {roles?.includes("ROLE_ADMIN") && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => onRemove(doctor.id)}
            className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            🗑 Remove
          </button>
          <button
            onClick={() => onEdit(doctor)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
          >
            ✏️ Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
