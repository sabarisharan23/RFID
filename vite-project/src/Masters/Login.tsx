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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <div className="mb-4">
          <img src="path_to_your_logo.png" alt="Mindteck Logo" className="mx-auto" />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <button
          className="w-full px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
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
