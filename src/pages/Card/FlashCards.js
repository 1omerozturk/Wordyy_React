import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useSwipeable } from 'react-swipeable'
import './FlashCards.css'
import {
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
  FaTimesCircle,
} from 'react-icons/fa'
import {
  MdOutlineBrightnessAuto,
  MdOutlineTimer,
  MdOutlineCheck,
} from 'react-icons/md'
import { NavLink, useLocation } from 'react-router-dom'
import getRandomColor from '../../components/Color/GetRandomColor'
import { Dropdown } from './Dropdown'
import { UserContext } from '../User/UserContext'
import { getAllWords, getUser } from '../../api/api'

const Flashcards = ({ wordy, autoSlider,time }) => {
  const { user } = useContext(UserContext)
  const [userId, setUserId] = useState('')
  const [userRole, setUserRole] = useState('')
  const [data, setData] = useState([])
  const [wordyListSize, setWordyListSize] = useState()
  const [isFlipped, setIsFlipped] = useState(false)
  const [frontColor, setFrontColor] = useState('')
  const [backColor, setBackColor] = useState('')

  useEffect(() => {
    if (user?._id) {
      setUserRole(user.role)
      setUserId(user._id)
    }
  }, [user])

  useEffect(() => {
    if (userId) {
      getUser(userId).then((res) => {
        setData(res)
        setWordyListSize(res.wordyLists.length)
      })
    }
  }, [userId])

  useEffect(() => {
    setFrontColor(getRandomColor)
    setBackColor(getRandomColor)
  }, [])

  useEffect(() => {
    if (autoSlider) {
      const intervalId = setInterval(() => {
        setIsFlipped(!isFlipped)
      }, time/2)
      return () => clearInterval(intervalId)
    }
  }, [autoSlider])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleKeyPress = useCallback((e) => {
    if (e.code === 'Space') {
      setTimeout(() => {
        setIsFlipped(!isFlipped)
      }, 100)
    }
  })

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <div className="col space-y-2">
      <div
        className={`flashcard col-span-11 ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
      >
        <div
          className="front"
          style={{ backgroundColor: frontColor ? backColor : 'gray' }}
        >
          <div clasName="row text-center w-2/3 gap-y-10">
            {wordy?.image !== '' ? (
              <img
                className="mx-auto object-center w-[100px] h-[100px] md:w-[200px] md:h-[200px] border-b-2 border-t-2 rounded-xl border-b-gray-500 border-t-gray-500 border-r-0 border-l-0"
                src={wordy?.image}
                alt={wordy?.english}
              ></img>
            ) : (
              ''
            )}
            <div className="font-semibold font-serif flex items-center justify-center md:text-2xl lg:text-3xl text-lg py-1">
              {wordy?.english} -{' '}
              <span className="text-slate-300">
                ({' '}
                {wordy?.type?.map((t) => {
                  return t.split('-', 1)
                })}{' '}
                )
              </span>
            </div>
            <hr className="bg-white text-white rounded-xl py-1" />
            <div className="md:w-full w-2/3 mx-auto px-2 text-base md:text-lg lg:text-xl">
              {wordy?.englishExample}
            </div>
          </div>
        </div>
        <div
          className="back"
          style={{ backgroundColor: backColor ? backColor : 'gray' }}
        >
          <div clasName="row text-center w-2/3 gap-y-10">
            {wordy?.image !== '' ? (
              <img
                className="mx-auto object-center w-[100px] h-[100px] md:w-[200px] md:h-[200px] border-b-2 border-t-2 rounded-xl border-b-gray-500 border-t-gray-500 border-r-0 border-l-0"
                src={wordy?.image}
                alt={wordy?.english}
              ></img>
            ) : (
              ''
            )}
            <div className="font-semibold md:w-full mt-2 mx-auto block font-serif text-center md:text-2xl lg:text-3xl text-sm py-1">
              {wordy?.turkish} -{' '}
              <span className="text-slate-300">
                ({' '}
                {wordy?.type?.map((t) => {
                  return t.split('-')[1]
                })}{' '}
                )
              </span>
            </div>
            <hr className="text-white bg-white rounded-xl py-1" />
            <div className="md:w-full w-2/3 mx-auto text-base md:text-lg px-2 lg:text-xl">
              {wordy?.turkishExample}
            </div>
          </div>
        </div>
      </div>
      {userId ? (
        <div className="grid grid-flow-col sm:w-full gap-x-5 w-2/3 mx-auto">
          {userRole && userRole === 'admin' && (
            <NavLink
              style={{ textDecoration: 'none' }}
              to={`/wordy/wordyedit/${wordy?._id}`}
              className="flex w-fit mx-auto col-span-1 hover:animate-pulse"
            >
              <button className="btn btn-outline-primary">Edit</button>
            </NavLink>
          )}
          {wordyListSize === 0 ? (
            <NavLink
              style={{ textDecoration: 'none' }}
              to={`/wordylist/wordylistadd`}
              className="flex w-fit mx-auto col-span-1 hover:animate-pulse"
            >
              <button className="btn btn-outline-primary">New WordyList</button>
            </NavLink>
          ) : (
            <Dropdown data={data} wordyId={wordy._id} />
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

const FlashcardList = ({ words, index, setIndex }) => {
  const [allWords, setAllWords] = useState([])
  const [time, setTime] = useState(7000)
  const [timeSelectModal, setTimeSelectModal] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const user = useContext(UserContext)
  const [autoSlider, setAutoSlider] = useState(false)
  const location = useLocation()

  const loadData = async () => {
    await getAllWords().then((data) => {
      setAllWords(data)
    })
  }

  const timeSelect = [
    { value: 3000, label: '3 seconds' },
    { value: 5000, label: '5 seconds' },
    { value: 7000, label: '7 seconds' },
    { value: 10000, label: '10 seconds' },
  ]

  const handleTimeSelect = (value) => {
    console.log(value)
    setTime(value)
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    setCurrentIndex(index)
  }, [index])

  useEffect(() => {
    if (autoSlider) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % words.length
          setIndex(newIndex) // Update the parent component's index
          return newIndex
        })
      }, time)
      return () => clearInterval(intervalId)
    }
  }, [autoSlider, words.length, setIndex, time])

  const handleAutoSlider = () => {
    setAutoSlider(!autoSlider)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setIndex((prevIndex) => Math.min(prevIndex + 1, words.length - 1))
      setCurrentIndex(index)
    },

    onSwipedRight: () => {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
      setIndex((prevIndex) => Math.max(prevIndex - 1, 0))
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, words.length - 1))
    setIndex((prevIndex) => Math.min(prevIndex + 1, words.length - 1))
  }, [words.length])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
    setIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }, [index])

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'ArrowRight') {
        goToNext()
        event.preventDefault()
      } else if (event.code === 'ArrowLeft') {
        goToPrev()
        event.preventDefault()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [goToNext, goToPrev, index])
  return (
    <>
      <div className="h-fit flex items-center justify-center space-x-3">
        <button
          title="Auto Slide"
          className={`animate-pulse hover:animate-none btn text-slate-500 btn-outline-${
            autoSlider ? 'danger' : 'dark'
          }`}
          onClick={handleAutoSlider}
        >
          <MdOutlineBrightnessAuto
            className="float-right hover:animate-spin ml-2"
            size={25}
          />
          {`${autoSlider ? 'Stop' : 'Start'}`}
        </button>
        {/* time selection button for dropdown button */}
        <button
          title="Time Selection"
          className={`btn text-slate-500 btn-outline-dark`}
          onClick={() => setTimeSelectModal(!timeSelectModal)}
        >
          <MdOutlineTimer className="float-right hover:animate-spin" size={25} />
        </button>
        {/* time selection modal */}
        <div
          className={`fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50
          ${timeSelectModal ? 'block' : 'hidden'}`}
        >
          <div className="bg-white p-4 rounded-md shadow-md w-96">
            <div
              className="float-right cursor-pointer"
              onClick={() => setTimeSelectModal(false)}
            >
              <FaTimesCircle className="text-red-500 text-2xl" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 my-3">
              Time Selection(s)
            </h2>
            <div className="md:flex flex-col space-y-2">
              <div className="md:flex justify-between font-bold mt-3">
                {timeSelect.map((t, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                    className='size-5'
                      key={index}
                      type="checkbox"
                      checked={time==t.value}
                      onChange={() => handleTimeSelect(t.value)}
                    />
                    <span className="text-slate-500">{t.value}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* okay button */}
            <button
              className="btn mt-5 text-slate-500 btn-outline-dark w-full text-center"
              onClick={() => setTimeSelectModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div className="flex col min-h-[500px] h-3/4 min-w-fit mx-auto">
        {/* Sol Buton */}

        <button
          className="bg-slate-300 w-fit h-fit p-2 float-start rounded-full flex ml-2 my-auto"
          onClick={goToPrev}
          disabled={currentIndex === 0}
        >
          <FaArrowLeft
            title="Previous"
            className={`sm:text-2xl cursor-pointer ${
              currentIndex === 0 ? 'text-slate-400' : ''
            }`}
          />
        </button>

        {/* Orta Bölüm - Flashcards */}
        <div className="w-full mx-auto flex items-start justify-center">
          <div
            className="flex select-none justify-center items-center relative h-full w-full mx-auto overflow-hidden"
            {...handlers}
          >
            {words.map((word, index) => (
              <div
                key={index}
                className={`card-wrapper ${
                  index === currentIndex ? 'active' : ''
                }`}
              >
                {index === currentIndex && (
                  <Flashcards wordy={word} autoSlider={autoSlider} time={time} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sağ Buton */}
        <div className="flex">
          <button
            className="bg-slate-300 w-fit h-fit p-2 float-start rounded-full flex sm:ml-2 my-auto"
            onClick={goToNext}
            disabled={currentIndex === words.length - 1}
          >
            <FaArrowRight
              title="Next"
              className={`sm:text-2xl cursor-pointer ${
                currentIndex === words.length - 1 ? 'text-slate-400' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Sayaç */}
      <div className="counter mt-3 select-none text-center text-lg text-slate-500">
        {currentIndex + 1 === words.length ? (
          <div>
            {user?.user !== null ? (
              <div>
                {location.pathname === '/wordy' ? (
                  <>
                    <NavLink
                      className="text-sky-500 hover:text-gray-600"
                      to="/login"
                    >
                      Login
                    </NavLink>{' '}
                  </>
                ) : (
                  <>
                    <NavLink
                      style={{ textDecoration: 'none' }}
                      className="text-sky-500 hover:text-gray-600"
                      to="/wordy"
                    >
                      {' '}
                      <span className="font-serif text-white bg-indigo-600 rounded-lg px-1">
                        Wordy Card
                      </span>
                    </NavLink>{' '}
                  </>
                )}
                for more than Cards.
              </div>
            ) : (
              'You have finished all the cards!'
            )}
          </div>
        ) : (
          <div>
            {currentIndex + 1}/{words.length}
          </div>
        )}
      </div>
    </>
  )
}

export default FlashcardList
