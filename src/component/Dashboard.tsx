// src/component/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f7fa] p-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
      <div className="bg-white p-8 rounded-lg shadow-xl border-2 border-black max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-black mb-4">Welcome to your Dashboard!</h1>
        <p className="text-sm text-black mb-6">You are successfully authenticated.</p>
        <button
          onClick={handleLogout}
          className="w-full py-2.5 px-4 bg-black text-white text-sm font-bold rounded hover:bg-gray-800 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;