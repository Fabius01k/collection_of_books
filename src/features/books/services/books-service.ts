import {Book} from "../interfaces/interfaces-books";
import {CreateBookDto, UpdateBookDto} from "../dto/books-dto";
import {BooksRepository} from "../repositories/books-repository";
import { v4 as uuidv4 } from 'uuid';

export class BooksService {
    constructor(protected booksRepository: BooksRepository
    ) {
    }

    async createBook(newBookBody: CreateBookDto): Promise<Book> {
        const newBook: Book = {
            id: uuidv4(),
            title: newBookBody.title,
            author: newBookBody.author,
            publicationDate: newBookBody.publicationDate,
            genres: newBookBody.genres,
        };

        return await this.booksRepository.createBook(newBook)
    }

    async updateBook(updateBookBody: UpdateBookDto ): Promise<boolean> {
        return await this.booksRepository.updateBook(updateBookBody)
    }

    async deleteBook(id: string): Promise<boolean> {
        return await this.booksRepository.deleteBook(id)
    }
}