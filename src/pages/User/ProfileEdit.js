import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { updateUser } from '../../api/api'
import showToast from '../../alert/ShowToast'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { FaSignInAlt, FaUserEdit, FaWindowClose } from 'react-icons/fa'
import { Spin } from '../../components/Spinner/Spin'

function ProfileEdit() {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    profilePicture: '',
  })
  const [profilePicture, setProfilePicture] = useState(null)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const data = new FormData()
    data.append('email', formData.email)
    data.append('password', formData.password)
    data.append('name', formData.name)

    if (profilePicture) data.append('profilePicture', profilePicture)

    try {
      const res = await updateUser(id, data)

      if (res?.status === 400) {
        showToast(res?.data?.message || 'Invalid input', 'error')
      } else if (res?.status === 404) {
        showToast(res?.data?.message || 'User not found', 'error')
      } else if (res?.status === 200) {
        showToast('Profile updated successfully', 'success')
        navigate('/profile')
      } else {
        showToast('An unexpected error occurred', 'error')
      }
      setLoading(false)
    } catch (error) {
      console.error('Frontend error:', error)
      const message =
        error?.response?.data?.message ||
        'A network error occurred. Please try again.'
      showToast(message, 'error')
      setLoading(false)
    }
  }

  return (
    <div className="select-none login-page w-full md:w-1/3 lg:w-2/4 mx-auto min-h-fit bg-gray-100 ">
      <div className="float-right mt-1 mr-1 hover:shadow-white hover:drop-shadow-xl">
        <NavLink to="/profile">
          <button className="">
            <FaWindowClose color="red" size={25} />
          </button>
        </NavLink>
      </div>
      <div className="w-full mx-auto px-5  border-2 border-black border-r-black bg-gradient-to-tr from-sky-300 to-slate-300  p-2 shadow-md rounded-lg">
        <div className="flex items-center justify-self-center my-1">
          <FaUserEdit color="84cc16" size={30} />
          <h2 className="text-3xl font-semibold text-center mx-2 text-lime-500">
            Edit
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-flow-col">
            <i className="pi pi-at text-black my-auto text-xl text-center "></i>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full col-span-5 text-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="grid grid-flow-col">
            <i className="pi pi-key text-black my-auto text-xl text-center "></i>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full col-span-5 text-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="grid grid-flow-col">
            <i className="pi pi-image col-span-1 text-black my-auto text-xl text-center "></i>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="bg-white col-span-4 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          {loading ? (
            <Spin color="dark" />
          ) : (
            <button className="btn btn-outline-secondary" type="submit">
              Update Profile
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default ProfileEdit
