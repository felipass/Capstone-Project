import React, { useState, useContext, useEffect } from 'react'
import UserBook from './UserBook'
import { BookContextType, Book } from '../types/BookRequest';
//import { useAuth0 } from '@auth0/auth0-react';
import { Button, Modal, Alert } from "react-bootstrap";
import { BookContext } from '../context/BookContext';
import AddBook from './AddBook';
import Pagination from './Pagination';

import Loading from './Loading';

const UserBookList: React.FC = () => {
    //  const { isAuthenticated } = useAuth0();

    const [displayAddBookModal, setDisplayAddBookModal] = useState(false);

    const [showAlert, setShowAlert] = useState(false);

    const { books, loading } = useContext(BookContext) as BookContextType;
    const handleShowModal = () => setDisplayAddBookModal(true);
    const handleCloseBookModal = () => setDisplayAddBookModal(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(4)



    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000)
    }

    useEffect(() => {

        handleCloseBookModal();

        return () => {
            handleShowAlert();
        }

    }, [books])

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const totalPagesNum = Math.ceil(books.length / booksPerPage);

    /*
       if (!isAuthenticated) {
   
           return (
               <h1>OOps Please login to add/update a boook</h1>
           )
       }
   */
    if (loading) {

        return (
            <Loading />
        )

    }


    return (
        <>
            <div className="container-xl">
                <div className="table-response">
                    <div className="table-wrapper">
                        <div className="table-title mt-3">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>My <b>Books</b></h2>
                                </div>
                                <div className="col-sm-6">
                                    <Button onClick={handleShowModal} className="btn btn-success " data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>New Book</span></Button>
                                </div>
                            </div>
                        </div>


                        <Alert show={showAlert} variant="success" className="mt-2">
                            Book List Updated Succefully!
                        </Alert>



                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Book Image</th>
                                    <th>ISDN</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Publisher</th>
                                    <th>Edition</th>
                                    <th>Release</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Condition</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>


                                {

                                    // books.length == 1 && books[0].bookId !== "" ?
                                    currentBooks.map((book: Book) => (

                                        <tr key={book.bookId}>
                                            <UserBook {...book} />

                                        </tr>

                                    ))
                                    // :
                                    // <NotFound />
                                }


                            </tbody>
                        </table>

                        <Pagination pages={totalPagesNum}
                            setCurrentPage={setCurrentPage}
                            currentBooks={currentBooks}
                            bookList={books} />

                        <Modal show={displayAddBookModal} onHide={handleCloseBookModal} >
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Add Book
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AddBook />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseBookModal}>
                                    Close Button
                                </Button>
                            </Modal.Footer>
                        </Modal>



                    </div>
                </div>
            </div>
        </>


    )
}

export default UserBookList;