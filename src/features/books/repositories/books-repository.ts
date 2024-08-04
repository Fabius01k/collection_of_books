import {Book} from "../interfaces/interfaces-books";
import prisma from "../../../infrastructure/db/db";
import {UpdateBookDto} from "../dto/books-dto";


export class BooksRepository {

    async createBook(newBook: Book): Promise<Book> {
        return await prisma.book.create({
            data: newBook,
        });
    }

    async updateBook(updateBookBody: UpdateBookDto): Promise<boolean> {
        const {id, title, author, publicationDate, genres} = updateBookBody;
        try {
            await prisma.book.update({
                where: {id},
                data: {
                    title,
                    author,
                    publicationDate,
                    genres,
                },
            });

            return true;
        } catch (error) {

            return false;
        }
    }

    async deleteBook(id: string): Promise<boolean> {
        try {
            await prisma.book.delete({
                where: { id },
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}