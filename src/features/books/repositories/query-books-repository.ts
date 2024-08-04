import prisma from "../../../infrastructure/db/db";
import {Book} from "@prisma/client";

export class QueryBooksRepository {
    async getAllBooks(): Promise<Book[]> {
        return await prisma.book.findMany();
    }

    async getBookById(id: string): Promise<Book | null> {
        return await prisma.book.findUnique({
            where: {
                id: id,
            },
        });
    }
}