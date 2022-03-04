import * as AWS from 'aws-sdk'
//import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { BookItem } from '../models/BookItem'
import { BookUpdate } from '../models/BookUpdate';

//const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('BookAccess')



export class BookAccess {

  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(), //createDynamoDBClient(),
  
    private readonly bookTable = process.env.BOOKS_TABLE,
    private readonly authorIndex = process.env.BOOKS_AUTHOR_INDEX,
   // private readonly titleIndex = process.env.BOOKS_TITLE_BEGIN_WITH_INDEX
     private readonly titleIndex = process.env.BOOKS_TITLE_INDEX

    ) {
  }


   async getAllBooks(): Promise<BookItem[]> {

    
     logger.info('Get all Book Items', { 'info':'All Books' })

     try{

       const result = await this.docClient.scan({
      TableName: this.bookTable
    }).promise()

    const items = result.Items
    return items as BookItem[]

    } catch(e){

   logger.error('Get All Books failed', { error: e.message })

  }
   

  }

   async createBook(book: BookItem): Promise<BookItem> {

     try{

    await this.docClient.put({
      TableName: this.bookTable,
      Item: book
    }).promise()



    return book

     } catch(e){

       logger.error('Book creation failed', { error: e.message })

     }

  }


  async updateBook(bookUpdate:BookUpdate,  userId: String,bookId: String):Promise<Boolean>{
   
    let bookUpdated=false
    try{
   

  await this.docClient.update({
        TableName: this.bookTable,
        Key: {
          userId,
          bookId
        },
        UpdateExpression: 'set #title = :title ,#isbn = :isbn, #edition = :edition, #release = :release, #author = :author, #publisher = :publisher, #price = :price, #quantity = :quantity, #condition = :condition',
        ExpressionAttributeNames: {
          "#title": "title",
          "#isbn" : "isbn",
          "#edition" : "edition",
          "#release": "release",
          "#author": "author",
          "#publisher": "publisher",
          "#price": "price",
          "#quantity": "quantity",
          "#condition": "condition"

        },
        ExpressionAttributeValues: {
          ":title": bookUpdate.title,
          ":isbn": bookUpdate.isbn,
          ":edition": bookUpdate.edition,
          ":release": bookUpdate.release,
          ":author": bookUpdate.author,
          ":publisher": bookUpdate.publisher,
          ":price": bookUpdate.price,
          ":quantity": bookUpdate.quantity,
          ":condition": bookUpdate.condition

        }
      }).promise()


     bookUpdated=true

     
      return bookUpdated 

      } catch(e){
          bookUpdated=false

       logger.error('Book update failed', { error: e.message })

     }finally{
        return bookUpdated
     }


   //  return null

  }


  async  getBooksForUser(userId: string): Promise<BookItem[]> {
      
  try{


 //google-oauth2|111903704938680791629

  const result = await this.docClient.query({
    TableName: this.bookTable,
   // IndexName : this.todoIndex,
    KeyConditionExpression: '#userId = :uid',
    ExpressionAttributeNames: {
                    '#userId': 'userId'
                },
    ExpressionAttributeValues: {
      ':uid': userId
      
    }
     }).promise()

     
/*
      const result = await this.docClient.scan({
      TableName: this.bookTable
    }).promise()
 */
  
   const items = result.Items
   return items as BookItem[]

    } catch(e){

       logger.error(`Getting Books for user: ${userId} failed`, { error: e.message })

   }

}


async createAttachmentPresignedUrl(userId: string,bookId: string,url: string): Promise<Boolean> {


 let itemUpdated: boolean =false

   try {

    await this.docClient.update({
        TableName: this.bookTable,
        Key: {
          userId,
          bookId
        },
        UpdateExpression: 'set #a = :attachmentUrl',
        ExpressionAttributeNames: {
          "#a": "attachmentUrl"
         

        },
        ExpressionAttributeValues: {
          ":attachmentUrl": url
         
        }
      }).promise()



    itemUpdated=true
      
    return itemUpdated  

    
    } catch(e){
       itemUpdated=false
       logger.error(`Attachment for book: ${bookId} failed`, { error: e.message })

   }finally{
      return itemUpdated
   }
  
  }

  async deleteBook(userId: string, bookId: string): Promise<Boolean> {

     let bookDeleted=false
    try{
       

       await this.docClient.delete({

        TableName: this.bookTable,
        Key:{
          
          "userId" : userId ,
          "bookId":bookId
        }

       }).promise()

        bookDeleted=true


     } catch(e){

       bookDeleted=false
       logger.error(`Delete book: ${bookId} failed`, { error: e.message })

   }finally{

      return bookDeleted

   }

   
    
  }


  async  getBooksByAuthor(auther: string): Promise<BookItem[]> {
      
  try{


  const result = await this.docClient.query({
    TableName: this.bookTable,
    IndexName : this.authorIndex,
    KeyConditionExpression: 'author begins_with :auth',
    
    ExpressionAttributeValues: {
      ':auth': auther
      
    }
     }).promise()



   const items = result.Items
   return items as BookItem[]

    } catch(e){

       logger.error(`Getting Books by author: ${auther} failed`, { error: e.message })

   }

}


async  getBooksByTitle(title: string): Promise<BookItem[]> {
      
  try{


  const result = await this.docClient.query({
    TableName: this.bookTable,
    IndexName : this.titleIndex,
  // KeyConditionExpression: 'begins_with (title, :title)',
    KeyConditionExpression: 'title = :title',
    ExpressionAttributeValues: {
      ':title': title
      
    }
     }).promise()



   const items = result.Items
   return items as BookItem[]

    } catch(e){

       logger.error(`Getting Books titles : ${title} failed`, { error: e.message })

   }

}




}