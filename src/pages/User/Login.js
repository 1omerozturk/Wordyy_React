import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../api/api'
import 'react-toastify/dist/ReactToastify.css'
import showToast from '../../alert/ShowToast'
import { FaSign, FaSignInAlt, FaUser } from 'react-icons/fa'

const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate=useNavigate()

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
    e.preventDefault()
    validateForm() // Formu tekrar doğrula

    if (Object.keys(errors).length > 0) {
      return // Hatalar varsa giriş işlemini yapma
    }

    try {
      const response = await loginUser({ email, password })
      const token = localStorage.setItem('token', response.data.token)
      const user = localStorage.setItem(
        'user',
        JSON.stringify(response.data.user),
      )
      setIsAuthenticated(!!user && !!token)
      const admin = localStorage.getItem('user')
      const loggedUser = JSON.parse(admin)
      const role = JSON.parse(admin)

      if (role.role === 'admin') {
        showToast(
          `Hoşgeldiniz, ${loggedUser.username} ${loggedUser.role}`,
          'info',
        )
        setTimeout(() => {
          navigate.apply('/admin')
          window.location.reload()
        }, 2000)
      } else {
        showToast(
          `Hoşgeldiniz, ${loggedUser.username} ${loggedUser.role}`,
          'info',
        )
        setTimeout(() => {
          navigate.apply('/')
          window.location.reload()
        }, 2000)
      }
    } catch (error) {
      console.error('Login failed:', error)
      setErrors({ api: 'Login failed. Please try again.' })
    }
  }

  return (
    <div className="login-page w-full flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-2/3 border-2 border-violet-300 border-t-black border-r-black bg-gradient-to-l from-orange-600 to-slate-100  p-8 shadow-md rounded-lg">
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
              className="w-full col-span-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="grid grid-flow-col">
            <i className="pi pi-key text-gray-500 my-auto text-xl"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full col-span-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-1/2 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage