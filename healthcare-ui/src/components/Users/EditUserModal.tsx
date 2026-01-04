import React from "react";
import type UserResponseDto from "../../types/UserResponseDto";

interface EditUserModalProps {
  formData: Partial<UserResponseDto>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<UserResponseDto>>>;
  onClose: () => void;
  onSave: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  formData,
  setFormData,
  onClose,
  onSave,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative transform transition-all duration-300 scale-100 opacity-100">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Edit User</h3>
        <div className="space-y-3">
          <input
            type="text"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={formData.username || ""}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            placeholder="Username"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
