import React from 'react'
import FlashcardList from './Card/FlashCards'
export default function Wordy() {
  const words = [
    { enWord: 'Apple', trWord: 'Elma' },
    { enWord: 'Banana', trWord: 'Muz' },
    { enWord: 'Orange', trWord: 'Portakal' },
  ]
  return (
    <div className="mt-24 w-full mx-auto h-full">
      <div className='mx-auto p-2  text-5xl font-bold bg-gradient-to-tr from-gray-200 rounded-md to-gray-700 w-fit'>Wordy</div>
      <FlashcardList words={words} />
    </div>
  )
}
