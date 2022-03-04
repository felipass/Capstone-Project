import React, { useContext } from 'react'

import { HomeContext } from '../context/HomeContext';
import { HomeContextType, Book } from '../types/BookRequest';
import BookCart from './BookCart';

import SearchBook from './SearchBook';
import Loading from './Loading';

const Home: React.FC = () => {

  const { books, loading } = useContext(HomeContext) as HomeContextType;

  //setSearchFor("");

  if (loading) {

    return (
      <Loading />
    )
  }

  if (books.length === 1) {

    if (books[0].bookId === "") {

      return <h1> No Books Found</h1>
    }

  }



  return (

    <>
      <SearchBook />
      <section className="section">
        <div className="books-center">

          {
            books.map((book: Book) => (

              <BookCart key={book.bookId} {...book} />

            ))

          }


        </div>


      </section>
    </>

  )
}

export default Home;