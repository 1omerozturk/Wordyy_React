import React, { useContext, useEffect, useState } from 'react'
import {
  Card,
  CardGroup,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  UncontrolledCarousel,
} from 'reactstrap'
import { words } from '../Wordy/Wordy'
import FlashcardList from './FlashCards'
import { getAllWords } from '../../api/api'
import { Spin } from '../../components/Spinner/Spin'
import { UserContext } from '../User/UserContext'

export default function HomeCard() {
  const { user } = useContext(UserContext)
  const [wordyData, setWordyData] = useState([])
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  useEffect(() => {
    if (user) {
      setToken(user)
    }
  }, [user])

  const loadData = () => {
    if (!user) {
      setWordyData(words.slice(3, 6))
      setLoading(false)
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
        <FlashcardList words={wordyData} />
      )}
    </div>
  )
}
