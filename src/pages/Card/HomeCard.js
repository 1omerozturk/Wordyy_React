import React, { useEffect, useState } from 'react'
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

export default function HomeCard() {
  const [wordyData, setWordyData] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData = () => {
    if (!localStorage.getItem('token')) {
      setWordyData(words.slice(3, 6))
    } else {
      getAllWords().then((data) => {
        setWordyData(data)
      })
    }
    setInterval(()=>{
      setLoading(false)
    },500)
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      {loading? (
        <div className='h-0 my-10 mx-auto w-1/2 flex items-center justify-center'>
        <Spin />
        </div>
      ) : (
        <CardGroup>
          {
            <Card>
              <CardBody>
                <CardText>
                  <FlashcardList words={wordyData} />
                </CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
          }
        </CardGroup>
      )}
    </>
  )
}
