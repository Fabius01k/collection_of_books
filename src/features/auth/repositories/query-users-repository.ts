import {User} from "../interfaces/interfaces-user";
import prisma from "../../../infrastructure/db/db";

export class QueryUsersRepository {

    async findUserByEmail(email: string): Promise<boolean> {
        const users = await prisma.user.findMany({
            where: {
                email: email,
            },
        });
        return users.length > 0;
    }

    async findUserByConfirmationCode(code: string): Promise<User | null> {
        const users = await prisma.user.findMany({
            where: {
                emailConfirmationCode: code,
            },
        });
        return users.length > 0 ? users[0] : null;
        }

    async findUserById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {
                id: id,
            },
        })

    }

    async findUserForCheckCredentials(username: string): Promise<User | null> {
        const users = await prisma.user.findMany({
            where: {
                username: username
            }
        });
        return users.length > 0 ? users[0] : null;
    }


    async updateConfirmation(id: string): Promise<boolean> {
        try {
            await prisma.user.update({
                where: {id},
                data: {
                    emailIsConfirmed: true,

                },
            });

            return true;
        } catch (error) {

            return false;
        }
    }

    async changeRole(id: string, role: number): Promise<boolean> {
        try {
            await prisma.user.update({
                where: {id},
                data: {
                    roles: {
                        set: role
                    }
                },
            });

            return true;
        } catch (error) {

            return false;
        }
    }

}