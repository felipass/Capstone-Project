import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { updateBook } from  '../../businessLogic/book'  
import { UpdateBookRequest } from '../../requests/UpdateBookRequest'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const bookId = event.pathParameters.bookId
    const updatedBook: UpdateBookRequest = JSON.parse(event.body)
   
     const userId = getUserId(event)
     const bookUpdated = await updateBook(updatedBook,userId, bookId)

     if (bookUpdated){
        return {
       statusCode: 200,
       headers: {
      'Access-Control-Allow-Origin': '*'
     
    },
    body: JSON.stringify({
      message: "Book updated successfully."
    })
  }
     }

     return {
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': '*'
     
    },
    body: JSON.stringify({
      message: "Book update failed!."
    })
  }

  }
   // return undefined
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
