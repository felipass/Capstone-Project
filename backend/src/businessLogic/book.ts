import { BookAccess } from '../dataLayer/bookAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils'
import { BookItem } from '../models/BookItem'
import { CreateBookRequest } from '../requests/CreateBookRequest'
import { UpdateBookRequest } from '../requests/UpdateBookRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import * as createError from 'http-errors'

//  Implement businessLogic


//import {getUserId } from '../lambda/utils'
const logger = createLogger('book')

const bookAccess = new BookAccess()
const attachmentUtils = new AttachmentUtils()

export async function getAllBooks(): Promise<BookItem[]> {
  return bookAccess.getAllBooks()
}

export async function createBook(createBookRequest: CreateBookRequest,userId: string): Promise<BookItem> {
//,userName: string
  const bookId = uuid.v4()
  
   logger.info('creating book for user:', { 'info':userId })

   
try {

   return await bookAccess.createBook({

     userId: userId,
     bookId: bookId,
      ...createBookRequest,
    attachmentUrl: null
    
  })


} catch(e){

  logger.error('Book creation failed', { error: e.message })

}
  

 
 

}



export async function updateBook(updateBookRequest: UpdateBookRequest, userId: String,bookId: string):Promise<Boolean> {

    

     logger.info('updating book:', { 'info':bookId })
  try{

  return  await bookAccess.updateBook({

     title:updateBookRequest.title,
     isbn: updateBookRequest.isbn,
     edition: updateBookRequest.edition,
     release: updateBookRequest.release,
    author:updateBookRequest.author,
    publisher:updateBookRequest.publisher,
    price:updateBookRequest.price,
    quantity:updateBookRequest.quantity,
    condition:updateBookRequest.condition
  },userId,bookId)

  

 } catch(e){

  logger.error('Book update failed', { error: e.message })

  } 
}

export async function getBooksForUser(userId: string): Promise<BookItem[]> {

   try{

      return bookAccess.getBooksForUser(userId)

  } catch(e){

    logger.error('Get Book for user failed', { error: e.message })
    

  } 
   
 
}



export async function createAttachmentPresignedUrl(userId: string, bookId: string,attachmentUrl: string): Promise<Boolean>{

  try {

  return await bookAccess.createAttachmentPresignedUrl(userId, bookId,attachmentUrl)

} catch(e){

    logger.error('Creating attachment failed', { error: e.message })
  
  } 
}


export  function getUploadUrl(bookId: string){

  try {

  
   return attachmentUtils.getUploadUrl(bookId)
   }
   catch(e){

      logger.error('url failed', { error: e.message })
      return   createError(400, 'Bad Request', { error: e.message })

  } 

}



export async function deleteBook(userId: string, bookId: string) : Promise<Boolean>{

  try{

     return await bookAccess.deleteBook(userId, bookId)

  } catch(e){

    logger.error('Deleting book failed', { error: e.message })
     createError(400, 'Bad Request', { error: e.message })

  } 
   
}


export async function getBooksByAuthor(author: string): Promise<BookItem[]> {

   try{

      return bookAccess.getBooksByAuthor(author)

  } catch(e){

    logger.error('Get Book by author failed', { error: e.message })
    

  } 
   
 
}

export async function getBooksByTitle(title: string): Promise<BookItem[]> {

   try{

      return bookAccess.getBooksByTitle(title)

  } catch(e){

    logger.error('Get Book by title failed', { error: e.message })
    

  } 
   
 
}







