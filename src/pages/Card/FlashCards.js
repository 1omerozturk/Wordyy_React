import React, { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import './FlashCards.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { FooterDivider } from 'flowbite-react'

const Flashcards = ({ enWord, trWord,enSentence,trSentence, onSpacePress }) => {
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
        onSpacePress()
        handleFlip()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleFlip])

  return (
    <div
      className={`flashcard ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      <div
        className="front"
        style={{ backgroundColor: frontColor ? backColor : 'gray' }}
      >
        <div class="row text-center w-2/3 gap-y-10">
        <h1 className="font-mono font-semibold">{enWord} - (n)</h1>
        <hr className='bg-white text-white rounded-xl py-1'/>
        <h5>{enSentence}</h5>
        </div>
        
      </div>
      <div
        className="back"
        style={{ backgroundColor: backColor ? backColor : 'gray' }}
      >
         <div class="row text-center w-2/3 gap-y-10">
        <h1 className="font-semibold font-serif">{trWord}</h1>
        <hr className='bg-white text-white rounded-xl py-1'/>
        <h5>
        {trSentence}
        </h5>
         </div>
      </div>
    </div>
  )
}

const FlashcardList = ({
  words,
  onSpacePress,
  onNextPress,
  onPreviousPress,
}) => {
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

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'ArrowRight') {
        event.preventDefault()
        onNextPress()
        goToNext()
      } else if (event.code === 'ArrowLeft') {
        event.preventDefault()
        onPreviousPress()
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
      {words.map((word, index) => (
        <div
          key={index}
          className={`card-wrapper ${index === currentIndex ? 'active' : ''}`}
        >
          {index === currentIndex && (
            <Flashcards
              enWord={word.enWord}
              trWord={word.trWord}
              enSentence={word.enSentence}
              trSentence={word.trSentence}
              onSpacePress={onSpacePress}
              onNextPress={onNextPress}
              onPreviousPress={onPreviousPress}
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
    <div>You have finished all the cards!</div>
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
