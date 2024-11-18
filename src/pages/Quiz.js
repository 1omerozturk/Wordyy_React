import React, { useEffect, useState } from 'react'

export default function Quiz()
{

const [index, setIndex] = useState(0);
const [score, setScore] = useState(0);
const [time, setTime] = useState(0);
const [start, setStart] = useState(false);
const [currentQuestion, setCurrentQuestion] = useState({});
const [options, setOptions] = useState([]);

const questions = [
  {
    question: 'What is the capital of France?',
    options: { a: 'Paris', b: 'London', c: 'Berlin', d: 'Madrid' },
    correct: 'a',
  },
  {
    question: 'What is the capital of Germany?',
    options: { a: 'Berlin', b: 'Munich', c: 'Hamburg', d: 'Frankfurt' },
    correct: 'a',
  },
  {
    question: 'What is the capital of Italy?',
    options: { a: 'Rome', b: 'Milan', c: 'Turin', d: 'Venice' },
    correct: 'a',
  },
];

// Zamanlayıcı ve sınavın tamamlanma durumu
useEffect(() => {
  if (start && time < questions.length * 5) {
    const interval = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  } else if (time >= questions.length * 5) {
    setStart(false);
  }
}, [time, start, questions.length]);

// Soruyu ve seçenekleri yükleme
useEffect(() => {
  if (index < questions.length) {
    setCurrentQuestion(questions[index]);
    setOptions(Object.values(questions[index].options));
  }
}, [index, questions]);

const handleAnswer = (selectedOption) => {
  if (selectedOption === currentQuestion.correct) setScore(score + 1);
  setIndex(index + 1);
};

const startQuiz = () => {
  setStart(true);
  setTime(0);
  setIndex(0);
  setScore(0);
};

return (
  <div className="mt-5 md:w-3/4 -sm:w-[500px] mx-auto h-full">
  <div className='mx-auto p-2  text-5xl font-bold select-none bg-gradient-to-tr from-lime-200 rounded-md to-lime-700 w-fit'>Wordy Quiz</div>
    {start ? (
      <div className="grid w-1/2 mx-auto bg-slate-400 rounded-md py-2 mt-3">
        <p className="mx-auto font-semibold text-center w-7 h-7 border-2 border-red-500 rounded-full">{time}</p>
        <div className="bg-slate-300 rounded-md text-center border-black border py-3">
          <h2 className="font-bold">{currentQuestion.question}</h2>
        </div>
        <div className="grid grid-flow-row gap-4 p-2">
          {options.map((option, i) => (
            <label key={i} onClick={() => handleAnswer(Object.keys(currentQuestion.options)[i])}
            className="cursor-pointer border-2 hover:bg-indigo-400 w-3/4 mx-auto border-sky-200 rounded-xl text-center px-2 py-1">
              {option}
            </label>
          ))}
        </div>
        <div className="flex flex-flow gap-2 justify-center mt-5">
          {questions.map((_, idx) => (
            <div key={idx} className={`bg-slate-400 rounded-md text-center ${idx<index?'bg-slate-200':''} p-1 border ${idx === index ? 'bg-slate-500'  : ''}`}>
              {idx + 1}
            </div>
          ))}
        </div>
        <p className="mx-auto font-semibold mt-3">Score: {score}</p>
      </div>
    ) : (
      <button className="bg-sky-500 flex mx-auto hover:bg-sky-700 text-white font-bold py-2 px-4 rounded mt-5" onClick={startQuiz}>
        Start Quiz
      </button>
    )}
    </div>
);
}
