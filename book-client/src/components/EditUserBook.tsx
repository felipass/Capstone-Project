import React, { useContext, useState } from 'react'
import { Form, Row, Button, Stack, Col, InputGroup } from "react-bootstrap";
import { useAuth0 } from '@auth0/auth0-react';
import { BookContext } from '../context/BookContext';
import { Book, BookContextType, UpdateBookRequest } from '../types/BookRequest';

//import { createWriteStream } from 'fs';
//: React.FC

const EditUserBook = (book: Book) => {


    const { isAuthenticated } = useAuth0();

    const { updateBook } = useContext(BookContext) as BookContextType;
    //const [formData, setFormData] = useState<CreateBookRequest | {}>();

    const [bookId] = useState(book.bookId);
    const [title, setTitle] = useState(book.title);
    const [isbn, setIsbn] = useState(book.isbn);
    const [author, setAuthor] = useState(book.author);
    const [condition, setCondition] = useState(book.condition);
    const [publisher, setPublisher] = useState(book.publisher);
    const [quantity, setQuantity] = useState(book.quantity);
    const [price, setPrice] = useState(book.price);
    const [edition, setEdition] = useState(book.edition);
    const [release, setRelease] = useState(book.release);


    const updatedBook: UpdateBookRequest = {

        title: title,
        isbn: isbn,
        edition: edition,
        release: release,
        author: author,
        publisher: publisher,
        price: price,
        quantity: quantity,
        condition: condition

    }




    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(`The title is: ${title}`);

        updateBook(bookId, updatedBook);

        // console.log(` formUpdatedData: ${updatedBook.author}`);
        //   addBook(formData);


    }

    const validateQuantity = (value: string): void => {

        try {

            setQuantity(parseInt(value))

        } catch (Error) {
            setQuantity(0)
            alert(`Invalid value: ${Error}`)
        }


    }

    const validatePrice = (value: string): void => {

        // write proper validation later
        try {

            if (value !== "NaN") {

                setPrice(parseFloat(value))
            } else {
                setPrice(0)

            }


        } catch (Error) {
            setPrice(0)
            alert(`Invalid value: ${Error}`)
        }


    }

    if (!isAuthenticated) {

        return (
            <h1>OOps Please login to add/update a boook</h1>
        )
    }

    return (

        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-2">
                <Form.Label>Title *</Form.Label>
                <Form.Control type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required />
            </Form.Group>

            <Form.Group className="mb-2">
                <Form.Label>ISBN *</Form.Label>
                <Form.Control type="text"
                    id="isbn"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    required />
            </Form.Group>

            <Form.Group className="mb-2">
                <Form.Label>Author *</Form.Label>
                <Form.Control type="text"

                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required />
            </Form.Group>


            <Form.Group className="mb-2">
                <Form.Label>Publisher *</Form.Label>
                <Form.Control type="text"

                    id="publisher"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    required />
            </Form.Group>

            <Form.Group className="mb-2">
                <Form.Label>Condition</Form.Label>
                <Form.Select required

                    id="condition"
                    defaultValue={condition}
                    onChange={(e) => setCondition(e.target.value)}
                >

                    <option>New</option>
                    <option>Used</option>
                </Form.Select>
            </Form.Group>


            <Row className="mb-2">
                <Col>
                    <Form.Group>
                        <Form.Label>Edition</Form.Label>
                        <Form.Control type="text"

                            id="edition"
                            value={edition}
                            onChange={(e) => setEdition(e.target.value)}
                        />
                    </Form.Group>

                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Release Year</Form.Label>
                        <Form.Control type="text"

                            id="release"
                            value={release}
                            onChange={(e) => setRelease(e.target.value)}
                        />
                    </Form.Group>

                </Col>


            </Row>


            <Row className="mb-2">
                <Col>
                    <Form.Label>Price </Form.Label>
                    <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control placeholder="Price"

                            id="price"
                            value={price}
                            onChange={(e) => validatePrice(e.target.value)}
                        />

                    </InputGroup>

                </Col>

                <Col>
                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text"

                            id="quantity"
                            value={quantity}
                            onChange={(e) => validateQuantity(e.target.value)}
                        />
                    </Form.Group>


                </Col>


            </Row>



            <Stack direction="horizontal" gap={2}>

                <div className="me-auto"></div>
                <Button variant="success" type="submit">
                    Update Book
                </Button>
            </Stack>





        </Form>

    )

}


export default EditUserBook;