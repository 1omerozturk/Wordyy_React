import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import showToast from '../alert/ShowToast'
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap'
import {
  FaBars,
  FaBook,
  FaHome,
  FaQuestionCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserPlus,
} from 'react-icons/fa'
import { useState } from 'react'
import WordyLogo from './Wordyy.png'
import Logout from './User/Logout'

const Navbar = () => {
  const [navbar, setNavbar] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate=useNavigate()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const handleNav = () => {
    setNavbar(!navbar)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    showToast('Tekrar görüşmek üzere 👋', 'info')
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
    const checkAuth = () => {
      if (localStorage.getItem('token')) {
        setIsAuthenticated(true);
        const name = JSON.parse(localStorage.getItem('user'));
        setUser(name?.username);
      } else {
        setIsAuthenticated(false);
      }
    };
  
    checkAuth(); // İlk yüklemede kontrol et
    window.addEventListener('storage', checkAuth); // localStorage değişikliklerini dinle
  
    return () => {
      window.removeEventListener('storage', checkAuth); // Temizleme
    };
  }, []);

  return (
    <>
      <div className="nav-container">
        <div className="nav-head select-none">
          <NavLink className="navlink" to="/">
            <div className="grid grid-flow-col items-center justify-center">
              <img className='w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] md:w-[100px] md:h-[100px] border-2 border-sky-500 rounded-full' src={WordyLogo} alt="" />
              <div className="text-3xl text-gray-400 font-bold ml-4 decoration-none">
                Wordyy
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
              <NavLink
                className='navlink'
                to="/"
              >
                <li>
                  <FaHome
                    className="mx-1"
                    size={25}
                    color={({ isActive }) => (isActive ? 'navlink' : '')}
                  />
                  Home
                </li>
              </NavLink>
              <NavLink
              className='navlink'
                to="/wordy"
              >
                <li>
                  <FaBook
                    className="mx-1"
                    color={({ isActive }) => (isActive ? 'navlink' : '')}
                  />
                  Wordy
                </li>
              </NavLink>
              <NavLink
                className="navlink"
                to="/quiz"
              >
                <li>
                  <FaQuestionCircle
                    className="mx-1"
                    color={({ isActive }) => (isActive ? 'navlink' : '')}
                  />
                  Quiz
                </li>
              </NavLink>
              <NavLink
              className="navlink">
              <div className="profile-dropdown select-none">
                <li className="profile-item" onClick={toggleDropdown} color="black">
                  <FaUser className="mx-1" color="black" />
                  {isAuthenticated? user:'Profile' } 
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
                          <li onClick={handleLogout} className='navlink'>
                            <Logout />
                          </li>
                      </>
                    )}
                  </div>
                )}
              </div>
                </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
