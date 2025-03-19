import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../context/User';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    
  const {loginUser, btnLoading} = UserData();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    loginUser(email, password, navigate);
  };

  return (
    <div className='flex items-center justify-center h-screen max-h-screen bg-gray-900'>
      <div className='bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        <h2 className='text-3xl font-semibold text-center mb-8'>Đăng nhập để nghe nhạc</h2>
        <form onSubmit={handleSubmit} className='mt-8'>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>Email or Username</label>
            <input 
              type="email" 
              placeholder='Nhập email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>Password</label>
            <input 
              type="password" 
              placeholder='Nhập mật khẩu' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <button
            disabled={btnLoading} 
            type="submit" 
            className='w-full bg-blue-600 text-white py-2 rounded-md 
            hover:bg-blue-700 transition duration-300 ease-in-out 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          >
            {btnLoading ? "Please Wait..." : "Đăng nhập"}
          </button>
          <div className='text-center mt-6'>
            <Link to="/register" 
              className="text-sm text-gray-400 hover:text-gray-300 hover:underline"
            >
              Bạn chưa có tài khoản? đăng ký ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login