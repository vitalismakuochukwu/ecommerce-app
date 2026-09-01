// src/component/Login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import passIcon from '../assets/pass.png'; // Make sure pass.png is in your assets folder

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    const existingToken = localStorage.getItem('accessToken');
    if (existingToken) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          expiresInMins: 30,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Use username: emilys and password: emilyspass');
      }

      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }

      navigate('/dashboard');

    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7fa] py-10 px-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
      <div className="w-[420px] bg-white p-8 shadow-xl border-2 border-black relative rounded-sm">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-[#f6b74f]"></div>

        <div className="mt-2 mb-6">
          <h2 className="text-xl font-bold text-black mb-2 tracking-wide">Sign in to your account</h2>
          <div className="w-12 h-1 bg-[#f6b74f]"></div>
        </div>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-black text-xs font-bold mb-1" htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="e.g. emilys"
              className="block w-full px-3 py-2 border border-gray-300 text-black placeholder-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-black text-sm"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-black text-xs font-bold mb-1" htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="e.g. emilyspass"
                className="block w-full px-3 py-2 pr-10 border border-gray-300 text-black placeholder-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-black text-sm"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Toggle password visibility"
              >
                <img src={passIcon} alt="Toggle password" className="w-5 h-5 object-contain" />
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 text-sm font-bold rounded text-white bg-black hover:bg-gray-800 transition-colors disabled:opacity-70"
            >
              {loading ? 'Processing...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="text-center mt-5">
          <p className="text-sm text-black">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-black underline hover:text-gray-700">
              Register
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;