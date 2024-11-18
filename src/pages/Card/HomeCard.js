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
    getAllWords().then((data) => {
      if(localStorage.getItem('token')===null){
        setWordyData(wordyData.slice(0,2))
      }else{
        setWordyData(data)
      }
    })
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

      <div className="sm:w-full md:w-1/2 lg:w-2/3 mx-auto bg-white">
        <UncontrolledCarousel
          items={[
            {
              altText: 'Slide 1',
              caption: 'Slide 1',
              key: 1,
              src: 'https://picsum.photos/id/123/1200/600',
            },
            {
              altText: 'Slide 2',
              caption: 'Slide 2',
              key: 2,
              src: 'https://picsum.photos/id/456/1200/600',
            },
            {
              altText: 'Slide 3',
              caption: 'Slide 3',
              key: 3,
              src: 'https://picsum.photos/id/678/1200/600',
            },
          ]}
        />
      </div>
    </>
  )
}
