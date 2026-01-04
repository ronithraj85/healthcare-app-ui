import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineUser, AiOutlineTeam } from "react-icons/ai";
import { MdLocalHospital, MdEventAvailable } from "react-icons/md";
import PatientsPage from "./Patients/PatientsPage";
import DoctorsPage from "./Doctor/DoctorsPage";
import UsersPage from "./Users/UsersPage";
import AppointmentsPage from "./Appointments/AppointmentsPage";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>("");

  function parseJwt(
    token: string
  ): { roles?: string[]; authorities?: string[] } | null {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64));
    } catch {
      return null;
    }
  }

  const [roles] = useState<string[]>(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = parseJwt(token);
      localStorage.setItem("roles", decoded?.roles || "");
      return decoded?.roles ?? decoded?.authorities ?? [];
    }
    return [];
  });

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("roles");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">Healthcare System</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveSection("")}
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${
              activeSection === "" ? "bg-blue-900" : "hover:bg-blue-700"
            }`}
          >
            <AiFillHome className="text-xl" />
            <span>Home</span>
          </button>

          {roles.includes("ROLE_ADMIN") && (
            <>
              <button
                onClick={() => setActiveSection("doctors")}
                className={`flex items-center gap-2 px-3 py-2 rounded transition ${
                  activeSection === "doctors"
                    ? "bg-blue-900"
                    : "hover:bg-blue-700"
                }`}
              >
                <MdLocalHospital /> Doctors
              </button>
              <button
                onClick={() => setActiveSection("patients")}
                className={`flex items-center gap-2 px-3 py-2 rounded transition ${
                  activeSection === "patients"
                    ? "bg-blue-900"
                    : "hover:bg-blue-700"
                }`}
              >
                <AiOutlineUser /> Patients
              </button>
              <button
                onClick={() => setActiveSection("users")}
                className={`flex items-center gap-2 px-3 py-2 rounded transition ${
                  activeSection === "users"
                    ? "bg-blue-900"
                    : "hover:bg-blue-700"
                }`}
              >
                <AiOutlineTeam /> Users
              </button>
              <button
                onClick={() => setActiveSection("appointments")}
                className={`flex items-center gap-2 px-3 py-2 rounded transition ${
                  activeSection === "appointments"
                    ? "bg-blue-900"
                    : "hover:bg-blue-700"
                }`}
              >
                <MdEventAvailable /> Appointments
              </button>
            </>
          )}

          {roles.includes("ROLE_USER") && (
            <>
              <button
                onClick={() => setActiveSection("doctors")}
                className={`flex items-center gap-2 px-3 py-2 rounded transition ${
                  activeSection === "doctors"
                    ? "bg-blue-900"
                    : "hover:bg-blue-700"
                }`}
              >
                <MdLocalHospital /> Doctors
              </button>
              <button
                onClick={() => setActiveSection("appointments")}
                className={`flex items-center gap-2 px-3 py-2 rounded transition ${
                  activeSection === "appointments"
                    ? "bg-blue-900"
                    : "hover:bg-blue-700"
                }`}
              >
                <MdEventAvailable /> Appointments
              </button>
            </>
          )}

          <button
            onClick={handleLogout}
            className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      {activeSection === "" && (
        <div className="p-8">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-lg p-10 mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">
              Welcome to the Healthcare System
            </h2>
            <p className="text-lg">
              Manage doctors, patients, users, and appointments with ease.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <MdLocalHospital className="text-blue-600 text-3xl mx-auto mb-2" />
              <h3 className="text-lg font-semibold">Doctors</h3>
              <p className="text-gray-600">Manage healthcare providers</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <AiOutlineUser className="text-blue-600 text-3xl mx-auto mb-2" />
              <h3 className="text-lg font-semibold">Patients</h3>
              <p className="text-gray-600">Track patient records</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <AiOutlineTeam className="text-blue-600 text-3xl mx-auto mb-2" />
              <h3 className="text-lg font-semibold">Users</h3>
              <p className="text-gray-600">Administer system users</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <MdEventAvailable className="text-blue-600 text-3xl mx-auto mb-2" />
              <h3 className="text-lg font-semibold">Appointments</h3>
              <p className="text-gray-600">Schedule and manage visits</p>
            </div>
          </div>
        </div>
      )}

      {/* Conditional rendering */}
      {activeSection === "users" && <UsersPage />}
      {activeSection === "doctors" && <DoctorsPage />}
      {activeSection === "patients" && <PatientsPage />}
      {activeSection === "appointments" && <AppointmentsPage />}
    </div>
  );
};

export default HomePage;
