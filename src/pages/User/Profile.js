import React, { useCallback, useContext, useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext'
import { Spin } from '../../components/Spinner/Spin'
import { getImage, getOtoWordy, getUser } from '../../api/api'
import { MdOutlineImageNotSupported } from 'react-icons/md'
import showToast from '../../alert/ShowToast'

export const Profile = () => {
  const [difficult, setDifficult] = useState()
  const [level, setLevel] = useState()
  const [hidden, setHidden] = useState(true)
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [profile, setProfile] = useState({})
  const [userId, setUserId] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (user?._id) {
      setUserId(user._id)
    }
  }, [user])

  const handleHidden = () => {
    setHidden(!hidden)
  }

  const handleDifficult = (e) => {
    setDifficult(e.target.value)
  }
  const handleLevel = (e) => {
    setLevel(e.target.value)
  }

  const onOtoWordy = (level, difficult) => {
    setLoadingUpdate(true)
    if (level && difficult) {
      getOtoWordy(level, difficult)
        .then((res) => {
          if (res.status === 201) {
            showToast(res.data.message, 'info')
          }
          else{
            showToast(res.data.message, 'error')
          }
        })
        .finally(() => {
          setLoadingUpdate(false)
        })
    }
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
              <div className="grid grid-cols-subgrid gap-x-3 bg-gradient-to-r ">
                {loadingUpdate ? (
                  <Spin color={'info'} />
                ) : (
                  <div>
                    <button
                      disabled={loadingUpdate}
                      onClick={handleHidden}
                      className="btn btn-outline-dark"
                    >
                      Add Wordy Automatic
                    </button>
                    <div className={`mt-2 ${hidden ? 'collapse' : ''}`}>
                      <div className="grid grid-flow-row bg-gray-400">
                        <label className="font-semibold bg-gray-700 text-white rounded-md">
                          Level:
                        </label>
                        A1
                        <input
                          type="radio"
                          name="difficult"
                          value="A1"
                          onChange={handleLevel}
                        />
                        A2
                        <input
                          type="radio"
                          name="difficult"
                          value="A2"
                          onChange={handleLevel}
                        />
                        B1
                        <input
                          type="radio"
                          name="difficult"
                          value="B1"
                          onChange={handleLevel}
                        />
                        B2
                        <input
                          type="radio"
                          name="difficult"
                          value="B2"
                          onChange={handleLevel}
                        />
                        C
                        <input
                          type="radio"
                          name="difficult"
                          value="C"
                          onChange={handleLevel}
                        />
                        Academic
                        <input
                          type="radio"
                          name="difficult"
                          value="Academic"
                          onChange={handleLevel}
                        />
                      </div>
                      <div className=" mt-2 grid grid-flow-row bg-gray-400">
                        <label className="font-semibold bg-gray-700 text-white rounded-md">
                          Difficult:
                        </label>
                        <select
                          className="bg-gray-300"
                          onChange={handleDifficult}
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Difficult">Difficult</option>
                        </select>
                      </div>
                      <button
                        onClick={() => onOtoWordy(level, difficult)}
                        disabled={!level && !difficult}
                        className="mt-2 btn btn-outline-info"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
                {profile.role === 'admin' && (
                  <button
                    onClick={() => navigate('/admin')}
                    className="btn btn-outline-light w-fit mx-auto mt-5"
                  >
                    Admin Page
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
