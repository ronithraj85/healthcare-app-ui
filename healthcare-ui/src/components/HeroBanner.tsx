import React from "react";

const HeroBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-lg p-6 sm:p-10 mb-8 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">
        Welcome to the Healthcare System
      </h2>
      <p className="text-base sm:text-lg">
        Manage doctors, patients, users, and appointments with ease.
      </p>
    </div>
  );
};

export default HeroBanner;
