import 'source-map-support/register'

import {  APIGatewayProxyResult } from 'aws-lambda' //APIGatewayProxyEvent,
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getAllBooks } from  '../../businessLogic/book'
//import { getUserId } from '../utils';


export const handler = middy(
  async (): Promise<APIGatewayProxyResult> => {

    //event: APIGatewayProxyEvent
    // const userId = getUserId(event)

    // console.log(`user Id is--> : ${userId}`)
     const books =  await getAllBooks()
   
    if (books.length !== 0) {

     return {
       statusCode: 200,
        headers: {
      'Access-Control-Allow-Origin': '*'
      },
       body: JSON.stringify({
      items: books
     })
    }

    }

    if (books.length == 0) {

     // && userId.length > 0
      const noBook=
      [
           {
  bookId:"",
  userName: "",
  title: "",
  isbn: "",
  edition:"",
  release:"",
  author:"",
  publisher:"",
  price: 0,
  quantity:0,
  condition:"",
  attachmentUrl: ""
          }

      ]
      
    

      return {
       statusCode: 200,
        headers: {
      'Access-Control-Allow-Origin': '*'
      },
       body: JSON.stringify({
      items: noBook 
     })
    }

    }




      return {
    statusCode: 404,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: ''
  }

  })
  
handler.use(
  cors({
    credentials: false
  })
)
