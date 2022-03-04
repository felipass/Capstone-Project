//import { createContext } from "react";
import React, { useState, useEffect, useCallback } from 'react';
import { CreateBookRequest, BookContextType, UpdateBookRequest, Book } from '../types/BookRequest';
import { getBooksByUser, createBook, patchBook, deletePostedBook, getUploadUrl } from '../api/books-api'



import { useAuth0 } from '@auth0/auth0-react';


export const BookContext = React.createContext<BookContextType | null>(null);

const BookContextProvider: React.FC<React.ReactNode> = ({ children }) => {

    const { getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken] = useState('');
    const [loading, setLoading] = useState(true);
    //const [operation, setOperation] = useState("");

    const [books, setBooks] = useState<Book[]>([]);

    const fetchUserBooks = useCallback(async () => {
        setLoading(true);
        try {


            const token = await getAccessTokenSilently(
                {
                    audience: `https://books-api-project`
                }
            )
            setAccessToken(token);

            const userBooks = await getBooksByUser(token);
            setBooks(userBooks);

            setLoading(false);

        } catch (Error) {
            setLoading(false);
            alert(`Failed to fetch Books`)

        }

    }, [loading])

    useEffect(() => {

        fetchUserBooks();
    }, []); //books

    /*
        useEffect(() => {
    
            const getAccessToken = async () => {
                try {
    
                    const token = await getAccessTokenSilently(
                        {
                            audience: `https://books-api-project`
                        }
                    )
                    setAccessToken(token);
    
    
                } catch (error) {
    
                    console.log(error)
                }
            }
    
            getAccessToken();
    
        }, [getAccessTokenSilently])
    */


    const addBook = async (user: string | undefined, book: CreateBookRequest) => {

        try {



            await createBook(accessToken, {
                userName: user,
                title: book.title,
                isbn: book.isbn,
                edition: book.edition,
                release: book.release,
                author: book.author,
                publisher: book.publisher,
                price: book.price,
                quantity: book.quantity,
                condition: book.condition
            });


            fetchUserBooks();


        } catch (error) {

            alert(`Saving Book Failed!`)

        }




    }

    const updateBook = async (id: string, book: UpdateBookRequest) => {

        try {



            await patchBook(accessToken, id, {

                title: book.title,
                isbn: book.isbn,
                edition: book.edition,
                release: book.release,
                author: book.author,
                publisher: book.publisher,
                price: book.price,
                quantity: book.quantity,
                condition: book.condition
            });


            fetchUserBooks();
        } catch (error) {

            alert(`Updating Book Failed!`)

        }



    }

    const deleteBook = async (id: string) => {

        try {

            await deletePostedBook(accessToken, id);


            fetchUserBooks();
        } catch (error) {

            alert(`Deleting Book Failed!`)

        }

    }

    const getUploadedUrl = async (id: string): Promise<string> => {
        let url = ""
        try {

            url = await getUploadUrl(accessToken, id);
            return url;

        } catch (error) {

            alert(`Deleting Book Failed!`)

        }
        return url;

    }

    return (


        <BookContext.Provider value={{ books, addBook, updateBook, deleteBook, getUploadedUrl, loading }}>
            {children}
        </BookContext.Provider>
    );

}



export default BookContextProvider;