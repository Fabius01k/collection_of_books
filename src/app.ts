import cookieParser from "cookie-parser";
import express from 'express';
import {booksRouter} from "./features/books/router/books-router";
import {AuthController} from "./features/auth/controller/auth-controller";
import {authRouter} from "./features/auth/router/auth-router";

const app = express();
app.use(cookieParser())
app.use(express.json());

app.use('/books', booksRouter);
app.use('/users', authRouter);

export default app;