import React, { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import './FlashCards.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const Flashcards = ({ enWord, trWord }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [frontColor, setFrontColor] = useState('')
  const [backColor, setBackColor] = useState('')

  const getRandomDarkColor = () => {
    const r = Math.floor(Math.random() * 180)
    const g = Math.floor(Math.random() * 180)
    const b = Math.floor(Math.random() * 180)
    return `rgb(${r}, ${g}, ${b})`
  }
  useEffect(()=>{
    setFrontColor(getRandomDarkColor)
    setBackColor(getRandomDarkColor)
  },[])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }
  return (
    <div
      className={`flashcard select-none w-full  ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      <div className="front" style={{ backgroundColor: frontColor?backColor:'gray' }}>
        <h1 className="underline font-mono font-semibold">{enWord}</h1>
      </div>
      <div className="back" style={{ backgroundColor: backColor?backColor:'gray' }}>
        <h1 className="font-semibold font-serif">{trWord}</h1>
      </div>
    </div>
  )
}

const FlashcardList = ({ words }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

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

  return (
    <div className="w-full max-w-full">
      <div className="flashcard-container" {...handlers}>
        {words.map((word, index) => (
          <div
            key={index}
            className={`card-wrapper ${index === currentIndex ? 'active' : ''}`}
          >
            {index === currentIndex && (
              <Flashcards enWord={word.enWord} trWord={word.trWord} />
            )}
          </div>
        ))}
      </div>
      <div className="button-container">
        <FaArrowLeft
          className="disabled:text-slate-400 text-2xl"
          onClick={goToPrev}
          disabled={currentIndex === 0}
        >
          Previous
        </FaArrowLeft>
        <FaArrowRight
          className="disabled:text-slate-400 text-2xl"
          onClick={goToNext}
          disabled={currentIndex === words.length - 1}
        >
          Next
        </FaArrowRight>
      </div>
      <div className="counter select-none">
        {currentIndex + 1}/{words.length}
      </div>
    </div>
  )
}

export default FlashcardList
