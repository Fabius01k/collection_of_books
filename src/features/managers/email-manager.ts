import {emailAdapter} from "../adapters/email-adapter";
import {User} from "../auth/interfaces/interfaces-user";

export class EmailManager {
    constructor() {}

    async sendEmailConfirmationMessage(newUser: User) {

        const userConfirmationCode = newUser.emailConfirmationCode
        const email = newUser.email

        const message = `<h1>Thank for your registration</h1>
        <p>To finish registration please follow the link below:
            <a href=https://project-nu-silk.vercel.app/registration-confirmation?code=${userConfirmationCode}>complete registration</a>
        </p>`

        const subject = "Код подтверждения регистрации"

        await emailAdapter.sendEmail(email, subject, message)
    }
}