import React, { useState } from "react";

function ReservationForm({ userId }) {
  const [activity, setActivity] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activity, reservationDate, user: { id: userId } }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la réservation");
        return res.json();
      })
      .then(() => {
        setMessage("✅ Réservation créée avec succès !");
        setIsError(false);
        setActivity('');
        setReservationDate('');
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Une erreur est survenue.");
        setIsError(true);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 mt-10 rounded-xl shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center uppercase">
        Réserver une activité
      </h2>

      {message && (
        <p className={`text-center font-semibold mb-4 ${isError ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Activité :</label>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Nom de l'activité"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-1">Date et heure :</label>
        <input
          type="datetime-local"
          value={reservationDate}
          onChange={(e) => setReservationDate(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition shadow"
      >
        Réserver
      </button>
    </form>
  );
}

export default ReservationForm;
