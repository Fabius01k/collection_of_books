import {User} from "../interfaces/interfaces-user";
import prisma from "../../../infrastructure/db/db";


export class AuthRepository {

    async registrationUser(newUser: User): Promise<User> {
        return await prisma.user.create(({
            data: newUser
        }))
    }

}