import { apiEndpoint } from '../config'
import Axios from 'axios'

import { CreateBookRequest, Book, UpdateBookRequest } from '../types/BookRequest';

export async function getAllBooks(): Promise<Book[]> {
  console.log('Fetching All Books')

  const response = await Axios.get(`${apiEndpoint}/allbooks`)

  console.log('Books:', response.data)
  return response.data.items
}




export async function getBooksByUser(idToken: string): Promise<Book[]> {
  console.log('Fetching  Books by  user')
  console.log(`Access Token for getBooksByUser: ${idToken}`);


  const response = await Axios.get(`${apiEndpoint}/books/users`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })

  console.log('Books:', response.data)
  return response.data.items
}



export async function getBookByTitle(title: string): Promise<Book[]> {
  console.log('Fetching  Books by title')
  console.log(`${apiEndpoint}/book/${title}`)

  const response = await Axios.get(`${apiEndpoint}/book/${title}`)

  console.log('Books By Title :', response.data)
  return response.data.items
}

export async function getBookByAuthor(author: string): Promise<Book[]> {
  console.log('Fetching  Books by Author')

  const response = await Axios.get(`${apiEndpoint}/books/authors/${author}`)

  console.log('Books By Author :', response.data)
  return response.data.items
}

export async function createBook(
  idToken: string,
  newBook: CreateBookRequest
): Promise<Book> {

  const response = await Axios.post(`${apiEndpoint}/books`, JSON.stringify(newBook), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  console.log(response.data.item)
  return response.data.item
}



export async function patchBook(idToken: string, bookId: string,
  updatedBook: UpdateBookRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/books/${bookId}`, JSON.stringify(updatedBook), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}


export async function deletePostedBook(
  idToken: string,
  bookId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/books/${bookId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}


export async function getUploadUrl(
  idToken: string,
  bookId: string
): Promise<string> {



  const response = await Axios.post(`${apiEndpoint}/books/${bookId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })

  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}



