import { CardBody,CardTitle,CardSubtitle,Card,CardLink,CardText } from 'reactstrap'
import FlashcardList from './Card/FlashCards'
export default function WordyCard() {
  const words = [
    { enWord: 'Apple', trWord: 'Elma' },
    { enWord: 'Banana', trWord: 'Muz' },
    { enWord: 'Orange', trWord: 'Portakal' },
  ]
    return(
      <Card className='w-1/2 mx-auto'>
      <CardBody>
        <CardTitle tag="h5">
          WordyList
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          WordyList Length
        </CardSubtitle>
      </CardBody>
      <FlashcardList words={words}/>
      <CardBody>
        <CardText>
          Some quick example text to build on the card title and make up the bulk of the card‘s content.
        </CardText>
        <CardLink href="#">
          Card Link
        </CardLink>
        <CardLink href="#">
          Another Link
        </CardLink>
      </CardBody>
    </Card>
    )
}
