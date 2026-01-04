import { useEffect, useState } from "react";
import AppointmentList from "./AppointmentsList";
import AppointmentForm from "./AppointmentsForm";

export default function AppointmentsPage() {
  const [showForm, setShowForm] = useState(false);
  const role = localStorage.getItem("roles");
  const [bannerMessage, setBannerMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");

  useEffect(() => {
    if (role?.includes("ROLE_ADMIN")) {
      setBannerMessage("Upcoming Appointments.");
      setDisplayMessage(
        "View upcoming appointments and schedule new ones with ease."
      );
    } else {
      setBannerMessage("Book an Appointment.");
      setDisplayMessage("View Scheduled appointments here.");
    }
  }, []);

  return (
    <div className="p-8">
      {/* Hero Banner */}
      <div className="relative mb-10">
        <img
          src="/images/appointments-banner.png"
          alt="Appointments Banner"
          className="w-full h-[30rem] object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rounded-lg flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
            {bannerMessage}
          </h1>
        </div>
      </div>

      {/* Intro */}
      <p className="text-gray-700 text-lg mb-8 text-center max-w-3xl mx-auto">
        {displayMessage}
      </p>

      {/* Appointment List */}

      {role?.includes("ROLE_ADMIN") && <AppointmentList />}

      {/* Schedule Button */}
      {!showForm && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow-md transition"
          >
            Schedule Appointment
          </button>
        </div>
      )}

      {/* Sliding Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          />

          {/* Sliding Panel */}
          <div className="w-full max-w-md bg-white shadow-xl transform translate-x-0 transition-transform duration-300 ease-out p-6 overflow-y-auto relative">
            {/* X Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Form */}
            <AppointmentForm />
          </div>
        </div>
      )}
    </div>
  );
}
