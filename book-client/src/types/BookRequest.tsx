export interface CreateBookRequest {

  userName?: string
  title: string
  isbn: string
  edition: string
  release: string
  author: string
  publisher: string
  price: number
  quantity: number
  condition: string
}

export interface UpdateBookRequest {


  title: string
  isbn: string
  edition: string
  release: string
  author: string
  publisher: string
  price: number
  quantity: number
  condition: string
}


export interface Book {

  bookId: string,
  userName: string,
  title: string,
  isbn: string,
  edition: string,
  release: string,
  author: string,
  publisher: string,
  price: number,
  quantity: number,
  condition: string,
  attachmentUrl?: string
}

export type BookContextType = {
  books: Book[];
  addBook: (user: string | undefined, book: CreateBookRequest) => void;
  updateBook: (id: string, updated: UpdateBookRequest) => void;
  deleteBook: (id: string) => void;
  getUploadedUrl: (id: string) => Promise<string>;
  loading: boolean;
  // setOperation: (s: string) => void;
};

export type HomeContextType = {
  books: Book[];
  loading: boolean;
  setSearchFor: (s: string) => void;
  setSearchBy: (s: string) => void;
};