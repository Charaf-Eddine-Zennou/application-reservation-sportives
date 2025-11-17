import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ActivityList from './ActivityList';
import ReservationPage from './ReservationPage';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Top Bar */}
        {user && (
          <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md border-b border-gray-200">
            <span className="text-lg font-semibold text-blue-700">
              Bienvenue, {user.username} !
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition"
            >
              Déconnexion
            </button>
          </div>
        )}

      

        {/* Routes */}
        <div className="max-w-xl mx-auto mt-10 px-4">
          <Routes>
            {/* Accueil (login / register) */}
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to="/activities" replace />
                ) : showRegister ? (
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <RegisterForm onRegisterSuccess={() => setShowRegister(false)} />
                    <p className="mt-4 text-center text-sm">
                      Déjà inscrit ?{" "}
                      <button
                        onClick={() => setShowRegister(false)}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        Se connecter
                      </button>
                    </p>
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <LoginForm
                      onLoginSuccess={(userData) => {
                        setUser(userData);
                        localStorage.setItem("user", JSON.stringify(userData));
                      }}
                    />
                    <p className="mt-4 text-center text-sm">
                      Pas encore de compte ?{" "}
                      <button
                        onClick={() => setShowRegister(true)}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        S'inscrire
                      </button>
                    </p>
                  </div>
                )
              }
            />

            {/* Liste des activités */}
            <Route
              path="/activities"
              element={
                user ? <ActivityList user={user} /> : <Navigate to="/" replace />
              }
            />

            {/* Réservation */}
            <Route
              path="/reservation/:activityId"
              element={
                user ? <ReservationPage user={user} /> : <Navigate to="/" replace />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
