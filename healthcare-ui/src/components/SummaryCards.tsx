import React from "react";
import { MdLocalHospital, MdEventAvailable } from "react-icons/md";
import { AiOutlineUser, AiOutlineTeam } from "react-icons/ai";

interface SummaryCardsProps {
  setActiveSection: (section: string) => void;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ setActiveSection }) => {
  const roles = localStorage.getItem("roles");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        className="bg-white shadow-md rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition"
        onClick={() => setActiveSection("doctors")}
      >
        <MdLocalHospital className="text-blue-600 text-2xl sm:text-3xl mx-auto mb-2" />
        <h3 className="text-base sm:text-lg font-semibold">Doctors</h3>
        <p className="text-gray-600 text-sm sm:text-base">
          Manage healthcare providers
        </p>
      </div>
      {roles?.includes("ROLE_ADMIN") && (
        <div
          className="bg-white shadow-md rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition"
          onClick={() => setActiveSection("patients")}
        >
          <AiOutlineUser className="text-blue-600 text-2xl sm:text-3xl mx-auto mb-2" />
          <h3 className="text-base sm:text-lg font-semibold">Patients</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Track patient records
          </p>
        </div>
      )}
      {roles?.includes("ROLE_ADMIN") && (
        <div
          className="bg-white shadow-md rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition"
          onClick={() => setActiveSection("users")}
        >
          <AiOutlineTeam className="text-blue-600 text-2xl sm:text-3xl mx-auto mb-2" />
          <h3 className="text-base sm:text-lg font-semibold">Users</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Administer system users
          </p>
        </div>
      )}
      <div
        className="bg-white shadow-md rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition"
        onClick={() => setActiveSection("appointments")}
      >
        <MdEventAvailable className="text-blue-600 text-2xl sm:text-3xl mx-auto mb-2" />
        <h3 className="text-base sm:text-lg font-semibold">Appointments</h3>
        <p className="text-gray-600 text-sm sm:text-base">
          Schedule and manage visits
        </p>
      </div>
    </div>
  );
};

export default SummaryCards;
