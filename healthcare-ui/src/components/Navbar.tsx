import React from "react";
import {
  AiFillHome,
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { MdLocalHospital, MdEventAvailable } from "react-icons/md";

interface NavbarProps {
  roles: string[];
  activeSection: string;
  setActiveSection: (section: string) => void;
  handleLogout: () => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  roles,
  activeSection,
  setActiveSection,
  handleLogout,
  menuOpen,
  setMenuOpen,
}) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
        Healthcare System
      </h1>

      {/* Hamburger for mobile */}
      <button
        className="sm:hidden text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-4">
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
                activeSection === "users" ? "bg-blue-900" : "hover:bg-blue-700"
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
  );
};

export default Navbar;
