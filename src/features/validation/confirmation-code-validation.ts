import {body} from "express-validator";
import {queryUsersRepository} from "../../composition-root";
import {User} from "../auth/interfaces/interfaces-user";

export const confirmationCodeValidator = [
    body('code')
        .isString()
        .notEmpty()
        .custom(async v => {const user: User | null = await queryUsersRepository.findUserByConfirmationCode(v)

            if(!user) {
                throw new Error('User nof found');
            }

            if (user && user.emailIsConfirmed) {throw new Error(`User already confirmed`)
            } else {
                return true
            }
        }),



]