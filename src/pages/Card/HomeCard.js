import React, { useContext, useEffect, useState } from 'react'
import FlashcardList from './FlashCards'
import { getAllWords } from '../../api/api'
import { Spin } from '../../components/Spinner/Spin'

export default function HomeCard() {
  const [index, setIndex] = useState(0)
  const [wordyData, setWordyData] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData = () => {
    getAllWords().then((data) => {
      setWordyData(data.slice(0, 10))
      setLoading(false)
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      {loading ? (
        <div className="h-0 my-10 mx-auto w-1/2 flex items-center justify-center">
          <Spin color={'primary'} />
        </div>
      ) : (
        <FlashcardList words={wordyData} index={index} setIndex={setIndex} />
      )}
    </div>
  )
}
