import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteBook } from '../../businessLogic/book' 
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const bookId = event.pathParameters.bookId
    

    const userId = getUserId(event)

     const bookDeleted = await deleteBook(userId, bookId)

     if (bookDeleted){

       return {
        statusCode: 204,
        headers: {
      'Access-Control-Allow-Origin': '*'
     
    },
    body: JSON.stringify({
        message: "Book deleted successfully."
      })
     }

     }


     return {
        statusCode: 500,
        headers: {
      'Access-Control-Allow-Origin': '*'
      
    },
    body: JSON.stringify({
        message: "Unable to delete book record."
      })
  }
    
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
