import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import HeroBanner from "./HeroBanner";
import SummaryCards from "./SummaryCards";
import PatientsPage from "./Patients/PatientsPage";
import DoctorsPage from "./Doctor/DoctorsPage";
import UsersPage from "./Users/UsersPage";
import AppointmentsPage from "./Appointments/AppointmentsPage";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

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
      <Navbar
        roles={roles}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        handleLogout={handleLogout}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-blue-700 text-white flex flex-col gap-2 px-4 py-3">
          <button
            onClick={() => {
              setActiveSection("");
              setMenuOpen(false);
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded ${
              activeSection === "" ? "bg-blue-900" : "hover:bg-blue-600"
            }`}
          >
            Home
          </button>

          {roles.includes("ROLE_ADMIN") && (
            <>
              <button
                onClick={() => {
                  setActiveSection("doctors");
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-600"
              >
                Doctors
              </button>
              <button
                onClick={() => {
                  setActiveSection("patients");
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-600"
              >
                Patients
              </button>
              <button
                onClick={() => {
                  setActiveSection("users");
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-600"
              >
                Users
              </button>
              <button
                onClick={() => {
                  setActiveSection("appointments");
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-600"
              >
                Appointments
              </button>
            </>
          )}

          {roles.includes("ROLE_USER") && (
            <>
              <button
                onClick={() => {
                  setActiveSection("doctors");
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-600"
              >
                Doctors
              </button>
              <button
                onClick={() => {
                  setActiveSection("appointments");
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-600"
              >
                Appointments
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
      )}

      {/* Main Content */}
      {activeSection === "" && (
        <div className="p-6 sm:p-8">
          <HeroBanner />
          <SummaryCards role={roles} setActiveSection={setActiveSection} />
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
