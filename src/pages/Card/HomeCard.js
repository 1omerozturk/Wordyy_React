import React from 'react'
import { Card, CardGroup,CardImg,CardBody,CardTitle,CardSubtitle,CardText,Button,UncontrolledCarousel } from 'reactstrap'
import { words } from '../Wordy'
import FlashcardList from './FlashCards'
export default function HomeCard() {

    const currentWord=words.slice(0,3)
   return (
    <>
    <CardGroup>
        {
<Card>
    
    <CardBody>
      <CardText>
      <FlashcardList words={currentWord}/>
      </CardText>
      <Button>
        Button
      </Button>
    </CardBody>
  </Card>
}  

</CardGroup>

<div className='w-[500px] mx-auto bg-white'>
<UncontrolledCarousel
  items={[
    {
      altText: 'Slide 1',
      caption: 'Slide 1',
      key: 1,
      src: 'https://picsum.photos/id/123/1200/600'
    },
    {
      altText: 'Slide 2',
      caption: 'Slide 2',
      key: 2,
      src: 'https://picsum.photos/id/456/1200/600'
    },
    {
      altText: 'Slide 3',
      caption: 'Slide 3',
      key: 3,
      src: 'https://picsum.photos/id/678/1200/600'
    }
  ]}
 />
</div>
 </>
  )
}
