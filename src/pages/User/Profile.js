import React, { useCallback, useContext, useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext'
import { Spin } from '../../components/Spinner/Spin'
import { getImage, getOtoWordy, getUser } from '../../api/api'
import { MdOutlineImageNotSupported } from 'react-icons/md'

export const Profile = () => {
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [profile, setProfile] = useState({})
  const [userId, setUserId] = useState('')
  const navigate=useNavigate()

  useEffect(() => {
    if (user?._id) {
      setUserId(user._id)
    }
  }, [user])

  const onOtoWordy = () => {
    setLoadingUpdate(true)
    getOtoWordy(userId)
      .then((res) => {
      })
      .finally(() => {
        setLoadingUpdate(false)
      })
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId) {
        try {
          const res = await getUser(userId)
          setProfile(res)
        } catch (error) {
          console.error('Error fetching user info:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchUserInfo()
  }, [userId, profile])

  return (
    <div className="text-center h-screen bg-gradient-to-br from-gray-300 to-sky-200 ">
      <Outlet />
      {loading ? (
        <div className="h-20 mx-auto w-1/2 flex items-center justify-center">
          <Spin color={'dark'} />
        </div>
      ) : (
        <>
          <div className="w-fit mx-auto pt-5">
            {profile?.profilePicture ? (
              <img
                className="h-40 w-40 rounded-full object-cover outline-double border-2 border-gray-300"
                alt={getImage(profile?.profilePicture)}
                src={getImage(profile?.profilePicture)}
              />
            ) : (
              <div className="h-40 w-40 rounded-full object-cover outline-dashed border-2 border-gray-300">
                <MdOutlineImageNotSupported
                  color="gray"
                  className="h-full w-full"
                />
              </div>
            )}
            <h3>{profile.username}</h3>
            <h5>{profile.email}</h5>
          </div>
          <NavLink
            style={{ textDecoration: 'none' }}
            to={`profileedit/${userId}`}
          >
            <button className="btn btn-secondary">Edit Profile</button>
          </NavLink>
          {user && user?.role === 'admin' && (
            <div className="mt-3">
              <div className='btn-group gap-x-3 mx-2 bg-gradient-to-r '>

              {loadingUpdate ? (
                <Spin color={'info'} />
              ) : (
                <button
                disabled={loadingUpdate}
                onClick={onOtoWordy}
                className="btn btn-outline-dark"
                >
                  Add Wordy Oto
                </button>
              )}
              {profile.role==='admin'&&(
                <button onClick={()=>navigate('/admin')} className='btn btn-outline-light'>Admin Page</button>
              )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
