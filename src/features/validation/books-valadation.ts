import {body} from "express-validator";

export const InputCreateDataBookValidator = [
    body('title')
        .isString()
        .notEmpty()
        .trim()
        .isLength({min:1,max:999})
        .withMessage((value, { req }) => {
            return `Поле title неверное, прошу указать корректные данные`;
        }),

    body('author')
        .isString()
        .notEmpty()
        .trim()
        .isLength({min:1,max:100})
        .withMessage((value, { req }) => {
            return `Поле author неверное, прошу указать корректные данные`;
        }),

    body('publicationDate')
        .isString()
        .notEmpty()
        .trim()
        .isISO8601()
        .custom((value) => {
            const date = new Date(value);
            const now = new Date();
            if (date > now) {
                throw new Error('Дата не должна находиться в будущем');
            }
            return true;
        })
        .withMessage((value, { req }) => {
            return 'Поле publicationDate неверное, прошу указать корректные данные';
        }),

    body('genres')
        .isString()
        .notEmpty()
        .trim()
        .isLength({min:1,max:100})
        .withMessage((value, { req }) => {
            return `Поле genres неверное, прошу указать корректные данные`;
        }),
]