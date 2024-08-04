import {Book} from "../interfaces/interfaces-books";
import {QueryBooksRepository} from "../repositories/query-books-repository";
import {Request, Response} from "express";
import {CreateBookDto, UpdateBookDto} from "../dto/books-dto";
import {BooksService} from "../services/books-service";


export class BooksController {
    constructor(
        protected queryBooksRepository: QueryBooksRepository,
        protected booksService: BooksService
    ) {
    }

    async getAllBooks(req: Request, res: Response) {
        const books: Book[] = await this.queryBooksRepository.getAllBooks()
        res.status(200).send(books)

    }

    async getBookById(req: Request, res: Response) {
        const { id } = req.params;
        const book: Book | null = await this.queryBooksRepository.getBookById(id)

        if (book) {
            res.status(200).send(book)
        } else {
            res.sendStatus(404)
        }
    }

    async createBook(req: Request, res: Response) {
        const { title, author, publicationDate,genres  } = req.body;
        const newBookBody = new CreateBookDto(title, author, publicationDate, genres);


        const newBook: Book = await this.booksService.createBook(newBookBody)
        res.status(201).send(newBook)
    }

    async updateBook(req: Request, res: Response) {
        const { title, author, publicationDate,genres  } = req.body;
        const { id } = req.params;
        const updateBookBody = new UpdateBookDto(id, title, author, publicationDate, genres);

        const bookUpdated: boolean = await this.booksService.updateBook(updateBookBody)

        if (bookUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }

    async deleteBook(req: Request, res: Response) {
        const { id } = req.params;
        const deletedBook: boolean = await this.booksService.deleteBook(id)

        if (deletedBook) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }


}