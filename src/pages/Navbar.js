import React, { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import showToast from '../alert/ShowToast'
import {
  FaBars,
  FaHome,
  FaQuestionCircle,
  FaSignInAlt,
  FaUser,
  FaUserEdit,
  FaUserPlus,
} from 'react-icons/fa'
import { MdSquare } from 'react-icons/md'
import { PiCardsFill } from 'react-icons/pi'
import { useState } from 'react'
import WordyLogo from './Wordyy.png'
import Logout from './User/Logout'
import { UserContext } from './User/UserContext'
import { getImage, getUser } from '../api/api'

const Navbar = () => {
  const { user, logout } = useContext(UserContext)
  const [navbar, setNavbar] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [profile,setProfile]=useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (user?._id) {
      setUserId(user._id)
    }
  }, [user])

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId) {
        try {
          const res = await getUser(userId)
          setProfile(res)
        } catch (error) {
          console.error('Error fetching user info:', error)
        }
      }
    }
    fetchUserInfo()
  }, [userId, profile])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const handleNav = () => {
    setNavbar(!navbar)
  }

  const handleProfile = () => {
    navigate(`/profile`)
  }
  const handleLogout = () => {
    logout()
    showToast(`Tekrar görüşmek üzere👋`, 'info')
    setIsAuthenticated(false)
    navigate('/login')
  }

  useEffect(() => {
    const updateNavbarClass = () => {
      if (window.innerWidth >= 768) {
        setNavbar(true)
      } else {
        setNavbar(false)
      }
    }
    updateNavbarClass()
    window.addEventListener('resize', updateNavbarClass)

    return () => window.removeEventListener('resize', updateNavbarClass)
  }, [])

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [user])

  return (
    <div>
      <div className="nav-container">
        <div className="nav-head select-none">
          <NavLink className="navlink" to="/">
            <div className="grid grid-flow-col items-center justify-center">
              <img
                className="w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] md:w-[100px] md:h-[100px] border-2 border-sky-500 rounded-full"
                src={WordyLogo}
                alt=""
              />
              <div className="text-3xl text-gray-400 font-bold ml-4 decoration-none">
                Wordy
              </div>
            </div>
          </NavLink>
          <div className="toggle" onClick={handleNav}>
            <FaBars />
          </div>
        </div>
        <div className="nav-center">
          <div className={`${navbar ? `links show` : `links`}`}>
            <ul>
              <NavLink className="navlink" to="/">
                <li>
                  <FaHome
                    className="mx-1"
                    color={({ isActive }) => (isActive ? 'navlink' : '')}
                  />
                  Home
                </li>
              </NavLink>
              <NavLink className="navlink" to="/wordy">
                <li>
                  <MdSquare
                    className="mx-1"
                    color={({ isActive }) => (isActive ? 'navlink' : '')}
                  />
                  Wordy
                </li>
              </NavLink>
              {user?.username ? (
                <NavLink className="navlink" to="/wordylist">
                  <li>
                    <PiCardsFill
                      className="mx-1"
                      color={({ isActive }) => (isActive ? 'navlink' : '')}
                    />
                    WordyList
                  </li>
                </NavLink>
              ) : (
                ''
              )}
              <NavLink className="navlink" to="/quiz">
                <li>
                  <FaQuestionCircle
                    className="mx-1"
                    color={({ isActive }) => (isActive ? 'navlink' : '')}
                  />
                  QWuiz
                </li>
              </NavLink>
              <div className="navlink">
                <div className="profile-dropdown select-none">
                  <li
                    className="profile-item"
                    onClick={toggleDropdown}
                    color="black"
                  >
                    {isAuthenticated &&profile?.profilePicture? (
                      <img
                        className="h-8 w-8 rounded-full mr-1 "
                        src={getImage(profile?.profilePicture)}
                      />
                    ) : (
                      <FaUser className="mx-1" color="black" />
                    )}
                    {isAuthenticated ? user?.username : 'Profile'}
                  </li>
                  {isOpen && (
                    <div className="dropdown-content">
                      {!isAuthenticated ? (
                        <>
                          <NavLink className="navlink" to="/login">
                            <li>
                              <FaSignInAlt className="" /> Login
                            </li>
                          </NavLink>
                          <NavLink className="navlink" to="/register">
                            <li>
                              <FaUserPlus className="" /> Register
                            </li>
                          </NavLink>
                        </>
                      ) : (
                        <>
                          <li
                            onClick={handleProfile}
                            className="navlink cursor-pointer"
                          >
                            <FaUserEdit className="mx-1" color="black" />
                            Profile
                          </li>
                          <li
                            onClick={handleLogout}
                            className="navlink cursor-pointer"
                          >
                            <Logout />
                          </li>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
