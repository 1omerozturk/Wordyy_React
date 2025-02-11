import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './User/UserContext'
import { getQuizData, getQuizDataId, getWordyListById } from '../api/api'
import { Spin } from '../components/Spinner/Spin'
import { useParams } from 'react-router-dom'

export default function Quiz() {
  const { id } = useParams()
  const [wordyList, setWrodyList] = useState({})
  const { user } = useContext(UserContext)
  const [disabled, setDisabled] = useState(false)
  const [bgColor, setBgColor] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [loading, setLoading] = useState(false)
  const [final, setFinal] = useState(false)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [start, setStart] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState([])
  const [options, setOptions] = useState([])
  const [questions, setQuestions] = useState([])
  const [time, setTime] = useState(questions?.length * 5)
  const [userId, setUserId] = useState('')

  useEffect(() => {
    if (user?._id) {
      setUserId(user._id)
    }
  }, [user])

  const getData = () => {
    setLoading(true)
    if (id && userId) {
      getQuizDataId(id).then((res) => {
        setQuestions(res?.data)
      })
      getWordyListById(userId, id).then((res) => {
        setWrodyList(res?.data)
      })
    } else {
      getQuizData().then((res) => {
        setQuestions(res?.data)
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [userId])

  // Zamanlayıcı ve sınavın tamamlanma durumu
  useEffect(() => {
    if (start && time > 0) {
      const interval = setInterval(() => setTime((prev) => prev - 1), 1000)
      return () => clearInterval(interval)
    } else if (time === 0) {
      stopQuiz()
    }
  }, [time, start, questions?.length])

  // Soruyu ve seçenekleri yükleme
  useEffect(() => {
    if (index < questions?.length) {
      setCurrentQuestion(questions[index])
      setSelectedOption(null)
      setOptions(questions[index]?.options)
    } else {
      stopQuiz()
    }
  }, [index, questions])

  const handleAnswer = (selectedOption) => {
    setDisabled(true)
    setSelectedOption(selectedOption)
    if (selectedOption.label === currentQuestion.correctAnswer) {
      setBgColor('correct')
      setScore(score + 1)
    } else {
      setBgColor('incorrect')
    }
    setTimeout(() => {
      setIndex(index + 1)
      setBgColor(false)
      setDisabled(false)
    }, 750)
  }

  const startQuiz = () => {
    setStart(true)
    setTime(questions?.length * 5)
    setIndex(0)
    setScore(0)
  }
  const stopQuiz = () => {
    setStart(false)
    setFinal(true)
  }

  return (
    <div>
      {questions.length<=0?<Spin color="danger" />:
        <div className="pt-5  mx-auto w-full h-screen bg-gradient-to-b from-slate-300 to-lime-200">
          {/* <div className="mx-auto p-2  text-5xl font-bold select-none bg-gradient-to-tr from-lime-200 rounded-md to-lime-700 w-fit">
            Wordy Quiz
          </div> */}
          {start ? (
            <div className="mx-auto bg-slate-400 rounded-md py-2 mt-3">
              {loading ? (
                <Spin color="primary" />
              ) : (
                <>
                  <div
                    className={`mx-auto mb-2 font-semibold text-center w-8 h-8 p-0.5 border-2  ${
                      time > (questions.length * 5) / 2 ? 'border-lime-500' : ''
                    } ${time < 20 ? 'border-orange-300' : ''} ${
                      time < 10 ? 'border-red-500 animate-pulse' : ''
                    } rounded-full`}
                  >
                    {time}
                  </div>
                  {start && (
                    <div className="mx-auto mb-2 w-fit border drop-shadow-md shadow-black border-black font-semibold rounded-md">
                      Score:{' '}
                      <span className="font-bold px-1 text-indigo-500">
                        {score}
                      </span>
                    </div>
                  )}

                  <div className="bg-slate-300 rounded-md text-center border-black border py-3">
                    <h2 className="font-bold">{currentQuestion?.question}</h2>
                  </div>
                  <div className="grid grid-flow-row space-y-4 p-2 md:px-10 lg:px-20">
                    {options?.map((option, i) => (
                      <button
                        disabled={disabled}
                        key={i}
                        onClick={() =>
                          handleAnswer(currentQuestion?.options[i])
                        }
                        className={`${
                          selectedOption === option
                            ? bgColor === 'correct'
                              ? 'bg-gradient-to-b from-lime-300 to-lime-600'
                              : 'bg-gradient-to-b from-red-300 to-red-600'
                            : selectedOption &&
                              option.label === currentQuestion.correctAnswer
                            ? 'bg-gradient-to-b from-lime-300 to-lime-600'
                            : 'bg-slate-400'
                        } cursor-pointer border-2 w-3/4 mx-auto border-sky-200 rounded-xl text-center p-2 font-sans font-semibold`}
                      >
                        {option.value}
                      </button>
                    ))}
                  </div>
                </>
              )}
              <div className="grid grid-flow-col text-center mx-auto max-w-fit gap-2 overflow-x-auto mt-5">
                {questions.map((_, idx) => {
                  const isCurrent = idx === index // Şu anki soru
                  const isPassed = idx < index // Geçilen sorular
                  const baseClass = 'rounded-md text-center p-1 border' // Ortak sınıflar
                  const bgClass = isCurrent
                    ? 'bg-slate-600' // Şu anki soru
                    : isPassed
                    ? 'bg-slate-400' // Geçilen sorular
                    : 'bg-slate-200' // Henüz çözülmemiş sorular

                  return (
                    <div key={idx} className={`${baseClass} ${bgClass}`}>
                      {idx + 1}
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center justify-center mt-5">
                <button onClick={stopQuiz} className="btn btn-danger">
                  Finish
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-1">
              {id && (
                <button disabled className="btn btn-dark font-bold  rounded">
                  {wordyList.name}
                  <input
                    type="radio"
                    name="wordylist"
                    value={wordyList.name}
                    checked
                    className="ml-2"
                  />
                </button>
              )}

              <button
                className="bg-sky-500 flex mx-auto hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
                onClick={startQuiz}
              >
                Start Quiz
              </button>
            </div>
          )}
          <div
            className={`my-4 outline-double bg-sky-500 w-fit mx-auto outline-3 rounded-2xl outline-indigo-500 px-1 ${
              !start && time !== 0 ? '' : 'collapse'
            }`}
          >
            {!start && final && (
              <p className={`mx-auto text-center font-semibold`}>
                Score: {score}
              </p>
            )}
          </div>
        </div>
      }
    </div>
    // <div>
    // <WordyList/>
    //   </div>
  )
}
