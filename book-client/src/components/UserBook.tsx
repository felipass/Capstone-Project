import React, { useContext, useState, useEffect } from 'react'
import { BookContextType, Book } from '../types/BookRequest';
import { BookContext } from '../context/BookContext';
import { Button, Modal, OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import EditUserBook from './EditUserBook';
import { uploadFile } from '../api/books-api'
import defaultImage from '../assets/no_image.jpg'

const UserBook = (book: Book) => {

    const { deleteBook } = useContext(BookContext) as BookContextType;
    const { getUploadedUrl } = useContext(BookContext) as BookContextType;

    const [displayAddBookModal, setDisplayAddBookModal] = useState(false);
    const [displayUploadModal, setDisplayUploadModal] = useState(false);

    const handleShowImageUpload = () => setDisplayUploadModal(true);

    const handleShowModal = () => setDisplayAddBookModal(true);

    const handleCloseBookModal = () => setDisplayAddBookModal(false);
    const handleCloseUploadModal = () => setDisplayUploadModal(false);

    const [file, setFile] = useState<any>();

    useEffect(() => {

        handleCloseBookModal()

    }, [book])

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        try {

            const uploadUrl = await getUploadedUrl(book.bookId)

            //this.setUploadState(UploadState.UploadingFile)
            await uploadFile(uploadUrl, file)
            handleCloseUploadModal();

        } catch (Error) {
            alert('File upload failed')
        }

    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {

            const files = event.target.files
            if (!files) return
            setFile(files[0])

        } catch (Error) {
            alert('No file')
        }


    }

    return (
        <>
            <td>

                <img className='imageAvatar' src={book.attachmentUrl !== null || book.attachmentUrl === "" ? book.attachmentUrl : defaultImage} alt={book.title}></img>
            </td>
            <td>{book.isbn}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publisher}</td>
            <td>{book.edition}</td>
            <td>{book.release}</td>
            <td>{book.price}</td>
            <td>{book.quantity}</td>
            <td>{book.condition}</td>
            <td>

                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Attach book image
                        </Tooltip>
                    }>

                    <button onClick={handleShowImageUpload} className="btn text-success btn-act" data-toggle="modal"><i className="material-icons">&#xe2bc;</i></button>

                </OverlayTrigger>


                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Edit
                        </Tooltip>
                    }>

                    <button onClick={handleShowModal} className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>

                </OverlayTrigger>

                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                    }>


                    <button type="submit" onClick={() => deleteBook(book.bookId)} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>

                </OverlayTrigger>


            </td>

            <Modal show={displayAddBookModal} onHide={handleCloseBookModal} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Book
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditUserBook {...book} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseBookModal}>
                        Close Button
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={displayUploadModal} onHide={handleCloseUploadModal} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Upload Image
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2">
                            <label>File</label>
                            <input
                                type="file"
                                accept="image/*"
                                placeholder="Image to upload"
                                onChange={handleFileChange}
                            />
                        </Form.Group>

                        <Button variant="success" type="submit">
                            Upload
                        </Button>

                    </Form>

                </Modal.Body>

            </Modal>



        </>




    )
}

export default UserBook;
