import {body} from "express-validator";

export const InputRoleDataValidation = [
    body('role')
        .notEmpty()
        .trim()
        .isInt({ min: 1, max: 2 })
        .withMessage('Поле role должно быть либо 1 (администратор), либо 2 (пользователь)'),
]