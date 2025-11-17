import React, { useState } from 'react';

function AddActivityForm({ onActivityAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newActivity = { name, description };

    try {
      const response = await fetch('http://localhost:8080/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivity),
      });

      if (response.ok) {
        const savedActivity = await response.json();
        onActivityAdded(savedActivity);
        setName('');
        setDescription('');
      } else {
        console.error('Erreur lors de l’ajout de l’activité');
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="text-2xl font-bold text-green-700 mb-4 uppercase tracking-wide">
        Ajouter une Activité
      </h3>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Nom :</label>
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Ex: Yoga, Football..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Description :</label>
        <input
          type="text"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Brève description de l'activité"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold shadow"
      >
        Ajouter
      </button>
    </form>
  );
}

export default AddActivityForm;
