import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Admin = () => {
const navigate=useNavigate()

const onGoWordy=()=>{
    navigate('wordy')
}

const onGoUser=()=>{
    navigate('user')
}


  return (
    <div className="text-center">
      <h1>Admin Page</h1>
      <p>This is the admin page.</p>
      <div className="grid grid-flow-col cursor-pointer">
        <div onClick={onGoUser} className="bg-slate-300 p-4 text-black">
          <h2>User Dashboard</h2>
          <p>Here you can manage Users.</p>
        </div>
        <div onClick={onGoWordy} className="bg-sky-300 p-4 text-white">
          <h2>Wordy Dashboard</h2>
          <p>Here you can manage Wordys.</p>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Admin
