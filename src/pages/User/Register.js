import React, { useState } from 'react'
import { registerUser } from '../../api/api'
import 'react-toastify/dist/ReactToastify.css'
import showToast from '../../alert/ShowToast'
import { useNavigate } from 'react-router-dom'
import { FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa'

const Register = () => {
  const [name, setName] = useState('')
  const [validate,setValidate]=useState(false)
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const navigate = useNavigate()
  const [showPassword,setShowPassword]=useState(false)
  const [showPasswordAgain,setShowPasswordAgain]=useState(false)

  const togglePasswordVisibility=()=>{
    setShowPassword(!showPassword)
  }
  const togglePasswordAgainVisibility=()=>{
    setShowPasswordAgain(!showPasswordAgain)
  }

  const resetForm=()=>{
    setName('')
    setLastname('')
    setUsername('')
    setEmail('')
    setPassword('')
    setPasswordAgain('')

  }

  const validatePassword=()=>{
    if(password !== passwordAgain){
      setValidate(false)
    }
    else{
      setValidate(true)
      }

  }

  const handleSubmit = async (e) => {
    try {
      validatePassword()
      if(validate){
        // await registerUser({ username, email, password })
        resetForm()
        navigate.apply('/login')
        showToast('Kayıt işlemi başarılı. Giriş yapabilirsiniz.', 'success')
        
      }
      else{
        showToast('Passwords do not match', 'error')
      }
    } catch (error) {
      console.error('Registration failed:', error)
    }
    e.preventDefault()
  }

  return (
    <div className="select-none flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-2/3 max-w-2xl border-2 border-lime-600 bg-gradient-to-tr border-l-black border-t-black from-white to-lime-300  p-8 shadow-md rounded-lg">
        <div className="flex items-center justify-center my-5">
          <FaUserPlus color="64748b" size={40} />
          <h2 className="text-3xl font-semibold text-center mt-1 mx-4 select-none text-slate-500">
            REGISTER
          </h2>
        </div>
        <form  onSubmit={handleSubmit} className="space-y-4">


          <div className=" grid grid-flow-col">
            <i className="pi pi-user-edit text-gray-500 my-auto text-xl"></i>
            <input
            
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full col-span-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-lg focus:ring-2 focus:ring-lime-500"
            />
          </div>

          <div className=" grid grid-flow-col">
            <i className="pi pi-id-card text-gray-500 my-auto text-xl"></i>
            <input
              type="text"
              placeholder="Lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="w-full col-span-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-lg focus:ring-2 focus:ring-lime-500"
            />
          </div>

          <div className=" grid grid-flow-col">
            <i className="pi pi-user text-gray-500 my-auto text-xl"></i>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full col-span-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-lg focus:ring-2 focus:ring-lime-500"
            />
          </div>


          <div className="grid grid-flow-col">
            <i className="pi pi-at text-gray-500 my-auto text-xl"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full col-span-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-lg focus:ring-2 focus:ring-lime-500"
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
              className="w-full col-span-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-lg focus:ring-2 focus:ring-lime-500"
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
          <div className="grid grid-flow-col">
          <div className="grid grid-flow-col">
            <i className="pi pi-key  col-span-2 text-gray-500 my-auto text-xl"></i>
            <input
              type={showPasswordAgain?'text':'password'}
              placeholder="Password Again"
              value={passwordAgain}
              onChange={(e) =>setPasswordAgain(e.target.value)}
              required
              className="w-full col-span-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-lg focus:ring-2 focus:ring-lime-500"
            />
            <button 
          type="button" 
          onClick={togglePasswordAgainVisibility}
          className='items-center w-0 mx-2 px-1'
          style={{background: 'none', border: 'none', cursor: 'pointer', color:'#335DB3FF' }}
        >
          {showPasswordAgain ? <FaEyeSlash /> : <FaEye />}
        </button>
            </div>
          </div>
          <div className="text-center">
            <button
            disabled={name===''||lastname===''||username===''||email===''||password===''||passwordAgain===''}
              type="submit"
              className="w-1/2 mx-auto text-center bg-lime-600 text-white py-2 px-4 rounded-md hover:bg-lime-700 disabled:bg-lime-700 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
