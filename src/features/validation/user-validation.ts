import {body} from "express-validator";
import {queryUsersRepository} from "../../composition-root";


export const InputRegistrationDataValidator = [
    body('email')
        .isString()
        .notEmpty()
        .trim()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .custom(async v => {const user: boolean = await queryUsersRepository.findUserByEmail(v)

            if (user) {throw new Error(`Email ${v} уже используется`)
            } else {
                return true
            }
        }),

    body('password')
        .isString()
        .notEmpty()
        .trim()
        .isLength({min:6,max:20})
        .withMessage('Поле password неверное, прошу указать корректные данные'),

    body('username')
        .isString()
        .notEmpty()
        .trim()
        .isLength({min:1,max:100})
        .withMessage('Поле username неверное, прошу указать корректные данные'),


]