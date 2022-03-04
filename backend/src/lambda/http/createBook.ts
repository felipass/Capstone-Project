import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateBookRequest } from '../../requests/CreateBookRequest'
import { getUserId } from '../utils'
import { createBook } from '../../businessLogic/book' 
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newBook: CreateBookRequest = JSON.parse(event.body)
   
    

   const userId = getUserId(event)
   const newItem = await createBook(newBook, userId)

   const retValue={

     isbn:newItem.isbn,
     title: newItem.title,
     author:newItem.author,
     publisher:newItem.publisher,
     price:newItem.price,
     quantity:newItem.quantity,
     edition:newItem.edition,
     condition:newItem.condition,
     release:newItem.release,
     attachmentUrl:newItem.attachmentUrl
   }

    if (newItem.userId.length !== 0) {

      return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
      
    },
    body: JSON.stringify({
    
     item:retValue
    })
    }

    }

   return {
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': '*'
      
    },
    body: JSON.stringify({
    
      message: "Book creation failed!."
    })
  }


  })

handler.use(
  cors({
    credentials: true
  })
)
