import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
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

const Navbar = () => {
  const [navbar, setNavbar] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleNav = () => {
    setNavbar(!navbar)
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

  return (
    <>
      <div className="nav-container">
        <div className="nav-head select-none">
          <NavLink className="navlink" to="/">
            <div className="logo">
              <img src={WordyLogo} alt="" />
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
                className={({ isActive }) =>
                  isActive ? 'active text-black navlink' : ' items-center justify-between navlink text-black'
                }
                to="/"
              >
                <li>
                  <FaHome
                    className="mx-1"
                    size={25}
                    color={({ isActive }) => (isActive ? 'blue' : 'black')}
                  />
                  Home
                </li>
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? 'active navlink text-black' : 'text-black navlink')}
                to="/wordy"
              >
                <li>
                  <FaBook
                    className="mx-1"
                    color={({ isActive }) => (isActive ? 'blue' : '')}
                  />
                  Wordy
                </li>
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? 'active navlink text-black' : 'text-black navlink')}
                to="/quiz"
              >
                <li>
                  <FaQuestionCircle
                    className="mx-1"
                    color={({ isActive }) => (isActive ? 'blue' : 'green')}
                  />
                  Quiz
                </li>
              </NavLink>

             
                <div class="profile-dropdown select-none">
                  
                    <li class="profile-item" onClick={toggleDropdown} color='black'>
                      <FaUser className="mx-1" color="black" /> Profile
                      </li>
                      {
                        isOpen &&
                        (
                  <div class="dropdown-content">
                    <NavLink className="navlink" to="/login">
                      <li>
                        <FaSignInAlt className="mx-1" /> Login
                      </li>
                    </NavLink>
                    <NavLink className="navlink" to="/register">
                      <li>
                        <FaUserPlus className="mx-1" /> Register
                      </li>
                    </NavLink >
                    <NavLink className="navlink" to="/logout">
                      <li>
                        <FaSignOutAlt className="mx-1" /> Logout
                      </li>
                    </NavLink>
                  </div>
                        )}
                </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
