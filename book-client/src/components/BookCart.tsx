
import { Book } from '../types/BookRequest';
import { Card, Button } from "react-bootstrap";
import defaultImage from '../assets/no_image.jpg'

const BookCart = (book: Book) => {

  const addToCart = () => {
    alert(`Item added to cart`);
  }

  return (
    <Card style={{ width: '15rem' }} border='success'>
      <Card.Img variant="top" alt={book.title} src={book.attachmentUrl !== null ? book.attachmentUrl : defaultImage} style={{ width: '100%', height: '15vw', objectFit: 'contain', marginTop: '0.5rem' }} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"> Author: {book.author}</Card.Subtitle>
        <Card.Text>
          Posted by: {book.userName}<br />
          ${book.price}
        </Card.Text>
        <div className=" text-center">
          <Button variant="success" onClick={addToCart}>Add to Cart</Button>
        </div>

      </Card.Body>
    </Card>


  )
}

export default BookCart;
