import React, { useState } from 'react'
import { registerUser } from '../../api/api'
import 'react-toastify/dist/ReactToastify.css'
import showToast from '../../alert/ShowToast'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa'

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  })
  const [passwordAgain, setPasswordAgain] = useState('')
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordAgain, setShowPasswordAgain] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const togglePasswordAgainVisibility = () => {
    setShowPasswordAgain(!showPasswordAgain)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const register = async(userData) => {
    if (
      userData.name &&
      userData.lastname &&
      userData.username &&
      userData.email &&
      userData.password
    ) {
      if (userData.password === passwordAgain) {
        await registerUser(userData)
          .then((res) => {
            if (res.status === 201) {
              showToast('User created successfully','success')
              navigate('/login')
            }
          })
          .catch((err) => {
            showToast('Error creating user' ,'error')
          })
      } else {
        showToast('Passwords do not match','error')
      }
    }
  }


 

  const handleSubmit = (e) => {
    e.preventDefault()
    register(userData)
  }

  return (
    <div className="select-none flex items-center justify-center min-h-screen bg-gray-100">
      <div className="sm:w-full md:w-1/2 lg:w-2/3 max-w-2xl border-2 border-lime-600 bg-gradient-to-tr border-l-black border-t-black from-white to-lime-300  p-4 shadow-md rounded-lg">
        <div className="flex items-center justify-center mb-4">
          <FaUserPlus color="64748b" size={40} />
          <h2 className="text-3xl font-semibold text-center mt-1 mx-4 select-none text-slate-500">
            REGISTER
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className=" grid grid-flow-col">
            <i className="pi pi-user-edit text-gray-500 my-auto text-xl text-center "></i>
            <input
              type="text"
              placeholder="Name"
              name='name'
              value={userData.name}
              onChange={handleChange}
              required
              className="w-full col-span-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-lg focus:ring-2 focus:ring-lime-500"
            />
          </div>

          <div className=" grid grid-flow-col">
            <i className="pi pi-id-card text-gray-500 my-auto text-xl text-center "></i>
            <input
              type="text"
              placeholder="Lastname"
              name='lastname'
              value={userData.lastname}
              onChange={handleChange}
              required
              className="w-full col-span-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-lg focus:ring-2 focus:ring-lime-500"
            />
          </div>

          <div className=" grid grid-flow-col">
            <i className="pi pi-user text-gray-500 my-auto text-xl text-center "></i>
            <input
              type="text"
              placeholder="Username"
              name='username'
              value={userData.username}
              onChange={handleChange}
              required
              className="w-full col-span-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-lg focus:ring-2 focus:ring-lime-500"
            />
          </div>

          <div className="grid grid-flow-col">
            <i className="pi pi-at text-gray-500 my-auto text-xl text-center "></i>
            <input
              type="email"
              placeholder="Email"
              name='email'
              value={userData.email}
              onChange={handleChange}
              required
              className="w-full col-span-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-lg focus:ring-2 focus:ring-lime-500"
            />
          </div>
          <div className="grid grid-flow-col">
            <div className="grid grid-flow-col">
              <i className="pi pi-key col-span-2 text-gray-500 my-auto text-xl text-center "></i>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name='password'
                value={userData.password}
                onChange={handleChange}
                required
                className="w-full col-span-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-lg focus:ring-2 focus:ring-lime-500"
              />
              <button
                className="items-center w-0 mx-2 px-1"
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  color: '#335DB3FF',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="grid grid-flow-col">
            <div className="grid grid-flow-col">
              <i className="pi pi-key  col-span-2 text-gray-500 my-auto text-xl text-center "></i>
              <input
                type={showPasswordAgain ? 'text' : 'password'}
                placeholder="Password Again"
                value={passwordAgain}
                name='passwordAgain'
                onChange={(e) => setPasswordAgain(e.target.value)}
                required
                className="w-full col-span-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-lg focus:ring-2 focus:ring-lime-500"
              />
              <button
                type="button"
                onClick={togglePasswordAgainVisibility}
                className="items-center w-0 mx-2 px-1"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#335DB3FF',
                }}
              >
                {showPasswordAgain ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="text-center">
            <button
              disabled={
                userData.name === '' ||
                userData.lastname === '' ||
                userData.username === '' ||
                userData.email === '' ||
                userData.password === '' ||
                passwordAgain === ''
              }
              type="submit"
              className="w-1/2 mx-auto text-center bg-lime-600 text-white py-2 px-4 rounded-md hover:bg-lime-700 disabled:bg-lime-700 transition duration-300"
            >
              Register
            </button>
            <div className="text-center">
              <p className="text-gray-500 text-lg my-2">
                Already have an account?
                <NavLink
                  to="/login"
                  className="text-black mx-2 text-lg hover:text-lime-700
                transition duration-300"
                >
                  Login
                </NavLink>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
