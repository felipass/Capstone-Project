//import React from 'react'
import HomeContextProvider from '../context/HomeContext';
import Home from './Home';


export default function HomeWrapper() {
    return (


        <HomeContextProvider>


            <Home />

        </HomeContextProvider>




    )
}
