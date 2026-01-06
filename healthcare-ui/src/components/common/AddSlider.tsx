import React from "react";

interface AddDoctorDrawerProps {
  onClose: () => void;
  addHeader: string;
  sliderComponent: React.ReactNode;
}

const AddSlider: React.FC<AddDoctorDrawerProps> = ({
  onClose,
  addHeader,
  sliderComponent,
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
          <p className="text-xl font-bold">➕ {addHeader}</p>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            ✖
          </button>
        </div>
        {sliderComponent}
      </div>
    </div>
  );
};

export default AddSlider;
