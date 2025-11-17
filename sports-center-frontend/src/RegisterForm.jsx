import React, { useState } from 'react';

function RegisterForm({ onRegisterSuccess }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, email, password, role }),
    })
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) throw new Error(text);
        return JSON.parse(text);
      })
      .then(() => {
        setMessage("✅ Inscription réussie, vous pouvez maintenant vous connecter.");
        setIsError(false);
        onRegisterSuccess();
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.message || "❌ Erreur lors de l'inscription");
        setIsError(true);
      });
  };

  return (
    <form onSubmit={handleRegister} className="bg-white max-w-lg mx-auto mt-10 p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center uppercase">Inscription</h2>

      {message && (
        <p className={`text-center font-semibold mb-4 ${isError ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Nom :</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Entrez votre nom complet"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Nom d'utilisateur :</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Choisissez un nom d'utilisateur"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="votre@email.com"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="********"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-1">Rôle :</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="USER">Utilisateur</option>
          <option value="ADMIN">Administrateur</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition shadow"
      >
        S'inscrire
      </button>
    </form>
  );
}

export default RegisterForm;
