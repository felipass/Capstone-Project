import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import {createAttachmentPresignedUrl,getUploadUrl} from  '../../businessLogic/book' 

 import { getUserId } from '../utils'

//import { S3 } from 'aws-sdk'


const bucketName = process.env.ATTACHMENT_S3_BUCKET 

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const bookId = event.pathParameters.bookId
    //  Return a presigned URL to upload a file for a book  with the provided id
   
    const url =  getUploadUrl(bookId)

   

    const userId = getUserId(event)

    
     const attachmentUrl= `https://${bucketName}.s3.amazonaws.com/${bookId}`
    
     
      const urlUpdated =  await createAttachmentPresignedUrl(userId, bookId,attachmentUrl)

    
    

       if(urlUpdated){
        // console.log(`The value of createAttachmentPresignedUrl is ${urlUpdated}`)
        
         return {
          statusCode: 200,
           headers: {
           'Access-Control-Allow-Origin': '*'
      
          },
          body: JSON.stringify({
            
              uploadUrl:url
        })
         }

       }

      return {
          statusCode: 500,
           headers: {
           'Access-Control-Allow-Origin': '*'
      
          },
          body: JSON.stringify({
                message: `Error creating attachement for ${attachmentUrl}`
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
