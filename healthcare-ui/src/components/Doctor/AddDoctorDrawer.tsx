import React from "react";
import AddDoctorPage from "./AddDoctor";

interface AddDoctorDrawerProps {
  onClose: () => void;
  refreshCall: () => void;
}

const AddDoctorDrawer: React.FC<AddDoctorDrawerProps> = ({
  onClose,
  refreshCall,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white w-full sm:w-[30rem] h-full shadow-xl p-6 transform transition-transform duration-300 ease-out translate-x-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">➕ Add Doctor</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            ✖
          </button>
        </div>
        <AddDoctorPage onDoctorAdded={refreshCall} />
      </div>
    </div>
  );
};

export default AddDoctorDrawer;
