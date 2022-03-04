//import React from 'react'
import BookContextProvider from '../context/BookContext';
import UserBookList from './UserBookList';


export default function UserListWrapper() {
    return (


        <BookContextProvider>


            <UserBookList />

        </BookContextProvider>




    )
}
