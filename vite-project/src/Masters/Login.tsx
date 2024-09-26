import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check credentials
    if (username === 'user1@gmail.com' && password === 'password') {
      console.log('Login successful');
      navigate('/dashboard'); // Navigate to the dashboard
    } else {
      console.log('Invalid credentials');
      window.alert('Invalid credentials');
      // You may want to handle error display here
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-500 to-purple-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <div className="mb-6">
          <img src="path_to_your_logo.png" alt="Mindteck Logo" className="mx-auto w-24 h-24" />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform transform hover:scale-105"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="mt-4 text-center text-gray-500">
          &copy; Mindteck Limited 2024 - 2025
        </div>
      </div>
    </div>
  );
};

export default Login;