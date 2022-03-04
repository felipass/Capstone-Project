import React, { useContext, useState } from 'react'
import { Form, Row, Button, Stack, Col, InputGroup } from "react-bootstrap";
import { useAuth0 } from '@auth0/auth0-react';
import { BookContext } from '../context/BookContext';
import { CreateBookRequest, BookContextType } from '../types/BookRequest';
//import Loading from './Loading';

const AddBook: React.FC = () => {


  const { isAuthenticated, user } = useAuth0();


  const { addBook } = useContext(BookContext) as BookContextType;
  const [formData, setFormData] = useState<CreateBookRequest | {}>();



  const handleForm = (e: React.ChangeEvent<HTMLInputElement> | any): void => {

    setFormData(
      {
        ...formData,
        [e.currentTarget.id]: e.currentTarget.value
      }
    )


  }
  const handleSubmit = (e: React.FormEvent, formData: CreateBookRequest | any) => {
    e.preventDefault();

    let loggedUser;

    // console.log(`Access token from handleSubmit ${accessToken}`)
    if (!user) {
      loggedUser = ''

    } else {
      loggedUser = user.given_name
    }



    addBook(loggedUser, formData);

  }

  if (!isAuthenticated) {

    return (
      <h1>OOps Please login to add/update a boook</h1>
    )
  }

  return (

    <Form onSubmit={(e) => handleSubmit(e, formData)}>
      <Form.Group className="mb-2">

        <Form.Control type="text" placeholder="Title *"
          id="title"
          onChange={handleForm}
          required />
      </Form.Group>

      <Form.Group className="mb-2">

        <Form.Control type="text" placeholder="ISBN *"

          id="isbn"
          onChange={handleForm}

          required />
      </Form.Group>

      <Form.Group className="mb-2">

        <Form.Control type="text" placeholder="Author *"

          id="author"
          onChange={handleForm}

          required />
      </Form.Group>


      <Form.Group className="mb-2">

        <Form.Control type="text" placeholder="Publisher *"

          id="publisher"
          onChange={handleForm}

          required />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Condition</Form.Label>
        <Form.Select required

          id="condition"
          onChange={handleForm}
          defaultValue="Choose one"
        >
          <option>Choose one</option>
          <option>New</option>
          <option>Used</option>
        </Form.Select>
      </Form.Group>


      <Row className="mb-2">
        <Col>
          <Form.Group>

            <Form.Control type="text" placeholder="Edition"

              id="edition"
              onChange={handleForm}

            />
          </Form.Group>

        </Col>
        <Col>
          <Form.Group>

            <Form.Control type="text" placeholder="Release Year"

              id="release"
              onChange={handleForm}
            />
          </Form.Group>

        </Col>


      </Row>


      <Row className="mb-2">
        <Col>

          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control placeholder="Price"

              id="price"
              onChange={handleForm}
            />

          </InputGroup>

        </Col>

        <Col>
          <Form.Group>

            <Form.Control type="text" placeholder="Quantity"

              id="quantity"
              onChange={handleForm}
            />
          </Form.Group>


        </Col>


      </Row>

      <Stack direction="horizontal" gap={3} className="mt-2">

        <div className="me-auto"></div>
        <Button variant="success" type="submit">Save</Button>
        <div className="vr" />
        <Button variant="outline-danger" type="reset"> Reset</Button>
      </Stack>

    </Form>

  )

}


export default AddBook;