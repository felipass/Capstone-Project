//import { createContext } from "react";
import React, { useState, useEffect, useCallback } from 'react';
import { HomeContextType, Book } from '../types/BookRequest';
import { getAllBooks, getBookByTitle } from '../api/books-api'



export const HomeContext = React.createContext<HomeContextType | null>(null);

const HomeContextProvider: React.FC<React.ReactNode> = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<Book[]>([]);
    const [searchFor, setSearchFor] = useState("");
    const [searchBy, setSearchBy] = useState("all");

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        try {



            if (searchBy === "all") {

                //setBooks([]);
                const allBooks = await getAllBooks();
                setBooks(allBooks);

            } else {
                // setBooks([]);
                const allBooks = await getBookByTitle(searchFor);
                setBooks(allBooks);

            }
            setLoading(false);

        } catch (Error) {
            setLoading(false);
            alert(`Failed to fetch Books :${Error}`)

        }

    }, [searchFor, searchBy])

    useEffect(() => {

        fetchBooks();
    }, [searchFor, fetchBooks]);




    return (


        <HomeContext.Provider value={{ loading, setSearchFor, setSearchBy, books }}>
            {children}
        </HomeContext.Provider>
    );



}

export default HomeContextProvider;