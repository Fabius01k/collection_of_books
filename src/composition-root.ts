import {QueryBooksRepository} from "./features/books/repositories/query-books-repository";
import {BooksController} from "./features/books/controllers/books-controller";
import {BooksService} from "./features/books/services/books-service";
import {BooksRepository} from "./features/books/repositories/books-repository";
import {AuthController} from "./features/auth/controller/auth-controller";
import {AuthService} from "./features/auth/service/auth-service";
import {AuthRepository} from "./features/auth/repositories/auth-repository";
import {EmailManager} from "./features/managers/email-manager";
import {QueryUsersRepository} from "./features/auth/repositories/query-users-repository";

export const queryBooksRepository = new QueryBooksRepository()
export const booksRepository = new BooksRepository()
export const authRepository = new AuthRepository()
export const queryUsersRepository = new QueryUsersRepository()

export const emailManager = new EmailManager()

export const booksService = new BooksService(booksRepository)
export const authService = new AuthService(authRepository,emailManager,queryUsersRepository)

export const booksController = new BooksController(queryBooksRepository,booksService)
export const authController = new AuthController(authService,queryUsersRepository)