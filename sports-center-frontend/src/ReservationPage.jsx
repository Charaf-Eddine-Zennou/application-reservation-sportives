import React, { useState } from 'react';
import { useParams } from "react-router-dom";

function ReservationPage({ user }) {
  const { activityId } = useParams();
  const [date, setDate] = useState("");
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleReservation = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activityId: Number(activityId),
          date,
          userId: user.id
        }),
      });

      if (response.ok) {
        setMessage(" Réservation réussie !");
        setIsError(false);
        setDate('');
      } else {
        throw new Error("Erreur lors de la réservation");
      }
    } catch (error) {
      setMessage(" Une erreur est survenue");
      setIsError(true);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center uppercase">
        Réserver une activité
      </h2>

      <p className="text-center text-gray-600 mb-4">Activité ID : <span className="font-semibold">{activityId}</span></p>

      {message && (
        <p className={`text-center font-medium mb-4 ${isError ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Date :</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleReservation}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition shadow"
      >
        Réserver
      </button>
    </div>
  );
}

export default ReservationPage;
