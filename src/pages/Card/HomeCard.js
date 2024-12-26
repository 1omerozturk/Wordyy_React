import React, { useContext, useEffect, useState } from 'react'
import FlashcardList from './FlashCards'
import { getAllWords } from '../../api/api'
import { Spin } from '../../components/Spinner/Spin'
import { UserContext } from '../User/UserContext'

export default function HomeCard() {
  const { user } = useContext(UserContext)
  const [index, setIndex] = useState(0)
  const [wordyData, setWordyData] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData = () => {
    if (!user) {
      getAllWords().then((data) => {
        setWordyData(data.slice(0, 10))
        setLoading(false)
      })
    } else {
      getAllWords().then((data) => {
        setWordyData(data)
        setLoading(false)
      })
    }
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
        <FlashcardList words={wordyData} index={0} setIndex={setIndex} />
      )}
    </div>
  )
}
