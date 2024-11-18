import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { loginUser } from '../../api/api'
import 'react-toastify/dist/ReactToastify.css'
import showToast from '../../alert/ShowToast'
import { FaEye, FaEyeSlash, FaSign, FaSignInAlt, FaUser } from 'react-icons/fa'

const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword,setShowPassword]=useState(false)
  const [errors, setErrors] = useState({})
  const navigate=useNavigate()

  const togglePasswordVisibility=()=>{
    setShowPassword(!showPassword)
  }

  const validateForm = () => {
    const errors = {}
    // Email validation
    if (!email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid'
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required'
    } else if (password.length < 5) {
      errors.password = 'Password must be at least 5 characters long'
    }

    setErrors(errors)
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    validateForm(); // Formu tekrar doğrula
  
    if (Object.keys(errors).length > 0) {
      return; // Hatalar varsa giriş işlemini yapma
    }
  
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsAuthenticated(true);
  
      const loggedUser = JSON.parse(localStorage.getItem('user'));
  
      showToast(`Hoşgeldiniz, ${loggedUser.username} ${loggedUser.role}`, 'info');
  
      setTimeout(() => {
        navigate(loggedUser.role === 'admin' ? '/admin' : '/');
        window.location.reload();
      }, 2000);
  
    } catch (error) {
      console.error('Login failed:', error);
  
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          showToast('Kullanıcı bulunamadı', 'error');
        } else if (status === 401) {
          showToast('Geçersiz kimlik bilgileri', 'error');
        } else {
          showToast('Sunucu hatası. Lütfen tekrar deneyin.', 'error');
        }
      } else {
        showToast('Bağlantı hatası. Lütfen tekrar deneyin.', 'error');
      }
      setErrors({ api: 'Giriş başarısız, Tekrar deneyiniz.' });
    }
  };
  

  return (
    <div className="select-none login-page w-full flex items-center justify-center min-h-screen bg-gray-100">
      <div className="sm:w-full md:w-2/3 max-w-2xl border-2 border-violet-300 border-t-black border-r-black bg-gradient-to-tr from-orange-600 to-slate-100  p-8 shadow-md rounded-lg">
          <div className='flex items-center justify-self-center my-5'>

          <FaSignInAlt color='64748b' size={30}/>
        <h2 className="text-3xl font-semibold text-center mx-5 text-slate-500">
          LOGIN
        </h2>
          </div>
        <form onSubmit={handleLogin} className="space-y-4">
          {errors.api && (
            <p className="text-red-500 text-center">{errors.api}</p>
          )}
          <div className="grid grid-flow-col">
            <i className="pi pi-at text-gray-500 my-auto text-xl"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full col-span-5 text-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="grid grid-flow-col">
            <div className="grid grid-flow-col">
            <i className="pi pi-key col-span-2 text-gray-500 my-auto text-xl"></i>
            <input
              type={showPassword?'text':'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-lg col-span-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            <button 
              className='items-center w-0 mx-2 px-1'
          type="button" 
          onClick={togglePasswordVisibility}
          style={{ color:'#335DB3FF', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        </div>
          </div>
          <div className="text-center">
            <button
            disabled={(password==="" || email==='')}
              type="submit"
              className="w-1/2 bg-orange-600 disabled:bg-orange-700 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-300"
            >
              Login
            </button>
            <div className='text-center'>
              <p className="text-gray-700 text-lg my-2">If you have not an account?
                <NavLink to="/register" 
                className="text-gray-700 mx-2 text-lg hover:text-orange-700 transition duration-300">Register</NavLink>
                </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
