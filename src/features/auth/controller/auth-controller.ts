import {User, UserResponse} from "../interfaces/interfaces-user";
import {AuthService} from "../service/auth-service";
import {Request, Response} from "express";
import {RegistrationUserDto} from "../dto/user-dto";
import {jwtService} from "../../application/jwt-service";
import {QueryUsersRepository} from "../repositories/query-users-repository";


export class AuthController {
    constructor(
        protected authService: AuthService,
        protected queryUsersRepository: QueryUsersRepository
    ) {
    }

    async registrationUser(req: Request, res: Response) {
        const {username, password, email} = req.body;
        const newUserBody = new RegistrationUserDto(username, password, email)

        const newUser: UserResponse = await this.authService.registrationUser(newUserBody)

        res.status(201).send(newUser)
    }

    async registerConfirmation(req: Request, res: Response) {
        const result: boolean = await this.authService.confirmationEmail(req.body.code)

        if (result) {
            res.status(204).send()
        } else {
            res.sendStatus(400)
        }
    }

    async loginUser(req: Request, res: Response) {
        const {username, password} = req.body;
        const tokens = await this.authService.loginUserToTheSystem(username, password);

        if (tokens) {
            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 20 * 1000,
            });

            console.log(tokens?.refreshToken)

            return res.status(200).send({accessToken: tokens.accessToken});
        } else {
            return res.sendStatus(401);
        }
    }

    async changeRole(req: Request, res: Response) {
        const { role } = req.body;
        const { id } = req.params;
        const roleNumber = parseInt(role, 10);

        const userUpdated: boolean = await this.queryUsersRepository.changeRole(id, roleNumber)

        if (userUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    }

    async getDataUser(req: Request, res: Response) {
        const token = req.headers.authorization!.split(' ')[1]
        const userId = await jwtService.getUserIdByToken(token)
        const user: User | null = await this.queryUsersRepository.findUserById(userId)

        if (!user) return res.sendStatus(401);

        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles,
        })
    }
}