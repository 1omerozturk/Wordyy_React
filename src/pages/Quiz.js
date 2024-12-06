import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './User/UserContext'
import { getQuizData } from '../api/api'
import { Spin } from '../components/Spinner/Spin'

export default function Quiz() {
  const { user } = useContext(UserContext)
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
    getQuizData()
      .then((res) => {
        setQuestions(res.data)
        console.log(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  // const questions = [
  //   {
  //     question: 'What is the capital of France?',
  //     options: { a: 'Paris', b: 'London', c: 'Berlin', d: 'Madrid' },
  //     correct: 'a',
  //   },
  //   {
  //     question: 'What is the capital of Germany?',
  //     options: { a: 'Berlin', b: 'Munich', c: 'Hamburg', d: 'Frankfurt' },
  //     correct: 'a',
  //   },
  //   {
  //     question: 'What is the capital of Italy?',
  //     options: { a: 'Rome', b: 'Milan', c: 'Turin', d: 'Venice' },
  //     correct: 'a',
  //   },
  // ];

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
      setOptions(questions[index]?.options)
    } else {
      stopQuiz()
    }
  }, [index, questions])

  const handleAnswer = (selectedOption) => {
    console.log(questions.length)
    if (selectedOption.label === currentQuestion.correctAnswer)
      setScore(score + 1)
    setIndex(index + 1)
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
      {!questions && <Spin color="danger" />}
      {questions && (
        <div className="pt-5 -sm:w-[500px] mx-auto w-full h-screen bg-gradient-to-b from-slate-300 to-lime-200">
          <div className="mx-auto p-2  text-5xl font-bold select-none bg-gradient-to-tr from-lime-200 rounded-md to-lime-700 w-fit">
            Wordy Quiz
          </div>
          {start ? (
            <div className="grid md:w-1/2 lg:w-2/3 sm:w-full mx-auto bg-slate-400 rounded-md py-2 mt-3">
              {loading ? (
                <Spin color="primary" />
              ) : (
                <>
                  <p className="mx-auto font-semibold text-center w-7 h-7 border-2 border-red-500 rounded-full">
                    {time}
                  </p>
                  <div className="bg-slate-300 rounded-md text-center border-black border py-3">
                    <h2 className="font-bold">{currentQuestion?.question}</h2>
                  </div>
                  <div className="grid grid-flow-row gap-4 p-2">
                    {options?.map((option, i) => (
                      <label
                        key={i}
                        onClick={() =>
                          handleAnswer(currentQuestion?.options[i])
                        }
                        className="cursor-pointer border-2 w-3/4 mx-auto border-sky-200 rounded-xl text-center px-2 py-1"
                      >
                        {option.value}
                      </label>
                    ))}
                  </div>
                </>
              )}
              <div className="flex flex-flow gap-2 justify-center mt-5">
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
            </div>
          ) : (
            <button
              className="bg-sky-500 flex mx-auto hover:bg-sky-700 text-white font-bold py-2 px-4 rounded mt-5"
              onClick={startQuiz}
            >
              Start Quiz
            </button>
          )}
          <div
            className={`my-4 outline-double bg-sky-500 w-fit mx-auto outline-3 rounded-2xl outline-indigo-500 px-1 ${
              !start && time !== 0 ? '' : 'collapse'
            }`}
          >
            {final && (
              <p className={`mx-auto text-center font-semibold`}>
                Score: {score}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
    // <div>
    // <WordyList/>
    //   </div>
  )
}
