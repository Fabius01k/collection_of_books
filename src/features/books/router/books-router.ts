import {Router} from "express";
import {booksController} from "../../../composition-root";
import {InputCreateDataBookValidator} from "../../validation/books-valadation";
import {inputValidationMiddleware} from "../../middlewares/input-validation-middleware";
import {jwtRolesValidator} from "../../middlewares/jwt-roles-middleware";
import {jwtTokenValidator} from "../../middlewares/jwt-authorization-middleware";


export const booksRouter = Router({})

booksRouter.get('/', booksController.getAllBooks.bind(booksController))

booksRouter.get('/:id', booksController.getBookById.bind(booksController))


booksRouter.post('/',jwtTokenValidator,jwtRolesValidator,InputCreateDataBookValidator,inputValidationMiddleware,
    booksController.createBook.bind(booksController))


booksRouter.put('/:id',jwtTokenValidator,jwtRolesValidator, booksController.updateBook.bind(booksController))


booksRouter.delete('/:id',jwtTokenValidator,jwtRolesValidator, booksController.deleteBook.bind(booksController))

