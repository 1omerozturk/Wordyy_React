import React, { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import './FlashCards.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Flashcards = ({ enWord, trWord,enSentence,trSentence,image}) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [frontColor, setFrontColor] = useState('')
  const [backColor, setBackColor] = useState('')
  
  const getRandomDarkColor = () => {
    const r = Math.floor(Math.random() * 199)
    const g = Math.floor(Math.random() * 199)
    const b = Math.floor(Math.random() * 199)
    return `rgb(${r}, ${g}, ${b})`
  }
  useEffect(() => {
    setFrontColor(getRandomDarkColor)
    setBackColor(getRandomDarkColor)
  }, [])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        event.preventDefault()
        // onSpacePress()
        handleFlip()
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleFlip])


  return (
    <div
      className={`flashcard  ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      <div
        className="front"
        style={{ backgroundColor: frontColor ? backColor : 'gray' }}
      >
        <div clasName="row text-center w-2/3 gap-y-10">
        {image!==""?(
          <img className='mx-auto object-center w-[200px] h-[200px] border-b-2 border-t-2 rounded-xl border-b-gray-500 border-t-gray-500 border-r-0 border-l-0' src={image} alt={enWord}></img>
        ):""}
        <h5 className="font-mono font-semibold text-center">{enWord} - (n)</h5>
        <hr className='bg-white text-white rounded-xl py-1'/>
        <div className='w-2/3 mx-auto text-lg md:text-2xl'>{enSentence}</div>
        </div>
        
      </div>
      <div
        className="back"
        style={{ backgroundColor: backColor ? backColor : 'gray' }}
      >
         <div clasName="row text-center w-2/3 gap-y-10">
        <div className="font-semibold font-serif flex items-center justify-center md:text-2xl lg:text-3xl text-xl">{trWord}</div>
        <hr className='bg-white text-white rounded-xl py-1'/>
        <div className='w-2/3 mx-auto text-lg md:text-2xl'>
        {trSentence}
        </div>
         </div>
      </div>
    </div>
  )
}

const FlashcardList = ({
  words,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [user,setUser]=useState(null)

  const getCurrentUser=()=>{
    setUser(localStorage.getItem('token'))
  }

  useEffect(()=>{
    getCurrentUser()
  },[])

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, words.length - 1)),
    onSwipedRight: () =>
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const goToNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, words.length - 1))
  }

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'ArrowRight') {
        event.preventDefault()
        goToNext()
      } else if (event.code === 'ArrowLeft') {
        event.preventDefault()
        goToPrev()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])
  return (
    <>
    <div className="flex col min-h-[500px] h-3/4 min-w-fit mx-auto">
  {/* Sol Buton */}

  <button
    className="bg-slate-300 w-fit h-fit p-2 float-start rounded-full flex ml-2 my-auto"
    onClick={goToPrev}
    disabled={currentIndex === 0}
    >
    <FaArrowLeft
      title="Previous"
      className={`text-2xl cursor-pointer ${
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
      {
        words.map((word, index) => (
          <div
          key={index}
          className={`card-wrapper ${index === currentIndex ? 'active' : ''}`}
        >
          {index === currentIndex && (
            <Flashcards
              enWord={word.english}
              trWord={word.turkish}
              enSentence={word.englishExample}
              trSentence={word.turkishExample}
              image={word.image? word.image:''}
            />
          )}
        </div>
      ))}
    </div>
  </div>

  {/* Sağ Buton */}
  <div className='flex'>
  <button
    className="bg-slate-300 w-fit h-fit p-2 float-start rounded-full flex ml-2 my-auto"
    onClick={goToNext}
    disabled={currentIndex === words.length - 1}
    >
    <FaArrowRight
      title="Next"
      className={`text-2xl cursor-pointer ${
        currentIndex === words.length - 1 ? 'text-slate-400' : ''
        }`}
        />
  </button>
  </div>
        </div>

{/* Sayaç */}
<div className="counter select-none text-center text-lg text-slate-500">
  {currentIndex + 1 === words.length ? (
    <div>
      {user!==null?
      (
        <div>
        Please <NavLink className="text-sky-500 hover:text-gray-600" to="/login">Login</NavLink> for more than <span className='font-serif uder'>Wordy Card</span>
          </div>
        ):"You have finished all the cards!"}      
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
