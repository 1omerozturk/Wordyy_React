import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const Admin = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onGoWordy = () => {
    navigate('wordy')
  }

  const onGoUser = () => {
    navigate('user')
  }

  const bgAdminClass = 'bg-gradient-to-b from-indigo-500 to-indigo-200'
  const bgActiveClass = 'bg-gradient-to-b from-slate-500 to-slate-200'
  const bgWordyClass = 'bg-gradient-to-b from-lime-500 to-indigo-200'
  const bgUserClass = 'bg-gradient-to-b from-teal-500 to-indigo-200'

  return (
    <div className="grid">
      <div
        onClick={() => location.pathname !== '/admin' && navigate('/admin')}
        className={`text-center cursor-pointer ${
          location.pathname === '/admin' ? bgActiveClass : bgAdminClass
        }`}
      >
        <h1>Admin Page</h1>
        <p>This is the admin page.</p>
      </div>
      <div className="grid grid-flow-col cursor-pointer">
        <div
          onClick={onGoUser}
          className={`p-4 ${
            location.pathname === '/admin/user' ? bgActiveClass : bgUserClass
          }`}
        >
          <h2>User Dashboard</h2>
          <p>Here you can manage Users.</p>
        </div>
        <div
          onClick={onGoWordy}
          className={`p-4 ${
            location.pathname === '/admin/wordy' ? bgActiveClass : bgWordyClass
          }`}
        >
          <h2>Wordy Dashboard</h2>
          <p>Here you can manage Wordys.</p>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Admin
