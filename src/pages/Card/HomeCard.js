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

export default function HomeCard() {
  const [wordyData, setWordyData] = useState([])

  const loadData = () => {
    if(!localStorage.getItem('token')){
      setWordyData(words.slice(3,6))
    }else{
        getAllWords().then((data) => {
        setWordyData(data)
      })
    }
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
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
    </>
  )
}
