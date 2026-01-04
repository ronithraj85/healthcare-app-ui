// src/components/AppointmentList.tsx
import React, { useEffect, useState } from "react";
import { getAllAppointments } from "./appointment.service";
import type AppointmentResponseDto from "../../types/AppointmentResponseDto";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState<AppointmentResponseDto[]>(
    []
  );

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointments = await getAllAppointments();
        setAppointments(appointments);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Upcoming Appointments
      </h2>
      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments scheduled.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((a) => (
            <div
              key={a.id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                {a.patientName}
              </h3>
              <p className="text-gray-600">
                <strong>Doctor:</strong> {a.doctorName}
              </p>
              <p className="text-gray-600">
                <strong>Start:</strong> {new Date(a.startTime).toLocaleString()}
              </p>
              <p className="text-gray-600">
                <strong>Duration:</strong> {a.durationMinutes} mins
              </p>
              {a.notes && (
                <p className="text-gray-600 mt-2">
                  <strong>Notes:</strong> {a.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
