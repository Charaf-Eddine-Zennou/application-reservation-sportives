import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddActivityForm from './AddActivityForm';

function ActivityList({ user }) {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/activities")
      .then(res => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP : ${res.status}`);
        }
        return res.json();
      })
      .then(data => setActivities(data))
      .catch(error => console.error("Erreur lors du chargement :", error));
  }, []);

  const handleActivityAdded = (newActivity) => {
    setActivities(prev => [...prev, newActivity]);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette activité ?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/activities/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setActivities(prev => prev.filter(a => a.id !== id));
        } else {
          alert("Erreur lors de la suppression.");
        }
      } catch (error) {
        console.error("Erreur suppression :", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6 uppercase tracking-wide">
        Liste des Activités Sportives
      </h2>

      {user?.role === 'ADMIN' && (
        <div className="mb-8">
          <AddActivityForm onActivityAdded={handleActivityAdded} />
        </div>
      )}

      <ul className="space-y-4">
        {activities.length > 0 ? (
          activities.map((a) => (
            <li
              key={a.id}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{a.name}</h3>
                  <p className="text-gray-600">{a.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/reservation/${a.id}`)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Réserver
                  </button>

                  {user?.role === 'ADMIN' && (
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">Aucune activité pour le moment.</li>
        )}
      </ul>
    </div>
  );
}

export default ActivityList;
