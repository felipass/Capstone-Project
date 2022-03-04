export interface BookItem {
  userId: string
  bookId: string
  userName: string
  title: string
  isbn: string
  edition:string
  release:string
  author:string
  publisher:string
  price: number
  quantity:number
  condition:string
  attachmentUrl?: string
}
