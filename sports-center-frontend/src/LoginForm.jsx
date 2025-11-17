import React, { useState } from 'react';

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Échec de la connexion");
        const data = await res.json();
        if (data) {
          setError('');
          onLoginSuccess(data);
        } else {
          throw new Error("Utilisateur non trouvé");
        }
      })
      .catch(() => {
        setError("Nom d'utilisateur ou mot de passe incorrect");
      });
  };

  return (
    <form onSubmit={handleLogin} className="bg-white max-w-md mx-auto mt-10 p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center uppercase">Connexion</h2>

      {error && (
        <p className="text-red-600 text-sm mb-4 text-center font-semibold">
          {error}
        </p>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Nom d'utilisateur :
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Entrer votre nom"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-1">
          Mot de passe :
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="*********"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow"
      >
        Se connecter
      </button>
    </form>
  );
}

export default LoginForm;
