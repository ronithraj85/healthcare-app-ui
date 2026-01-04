import React from "react";
import type DoctorResponseDto from "../../types/DoctorResponseDto";

interface EditDoctorModalProps {
  formData: Partial<DoctorResponseDto>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<DoctorResponseDto>>>;
  handleSave: () => void;
  closeEditModal: () => void;
}

const EditDoctorModal: React.FC<EditDoctorModalProps> = ({
  formData,
  setFormData,
  handleSave,
  closeEditModal,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      onClick={closeEditModal}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg transform transition-all duration-200 ease-out scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4">Edit Doctor</h3>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={formData.specialization || ""}
            onChange={(e) =>
              setFormData({ ...formData, specialization: e.target.value })
            }
            placeholder="Specialization"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={formData.imageUrl || ""}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            placeholder="Image URL"
            className="border p-2 rounded"
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={closeEditModal}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDoctorModal;
