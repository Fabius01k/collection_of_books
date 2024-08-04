import {RegistrationUserDto} from "../dto/user-dto";
import {User, UserResponse} from "../interfaces/interfaces-user";

import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import {AuthRepository} from "../repositories/auth-repository";
import {EmailManager} from "../../managers/email-manager";
import {QueryUsersRepository} from "../repositories/query-users-repository";
import {jwtService} from "../../application/jwt-service";
import {UserRolesEnum} from "../enum/user-roles-emun";


export class AuthService {
    constructor(
        protected authRepository: AuthRepository,
        protected emailManager: EmailManager,
        protected queryUsersRepository: QueryUsersRepository
    ) {
    }

    async generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    }

    async checkCredentials(userName: string, password: string) : Promise<User | null> {
        const user: User | null = await this.queryUsersRepository.findUserForCheckCredentials(userName)

        if(!user) return null

        if(user && await bcrypt.compare(password,user.passwordHash)) return user
        return null
    }

    async registrationUser(newUserBody: RegistrationUserDto): Promise<UserResponse> {
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this.generateHash(newUserBody.password, passwordSalt)

        const newUser: User = {
            id: uuidv4(),
            username: newUserBody.username,
            passwordHash: passwordHash,
            passwordSalt: passwordSalt,
            tokenCreationDate: new Date(),
            email: newUserBody.email,
            emailConfirmationCode: uuidv4(),
            emailIsConfirmed: false,
            roles: UserRolesEnum.пользователь

        }

        await this.authRepository.registrationUser(newUser)
        await this.emailManager.sendEmailConfirmationMessage(newUser)

        const response: UserResponse = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            roles: newUser.roles,
        };

        return response
    }

    async confirmationEmail(code: string): Promise<boolean> {

        const user: User | null = await this.queryUsersRepository.findUserByConfirmationCode(code)
        if (!user) return false
        if (user.emailIsConfirmed) return false
        if (user.emailConfirmationCode !== code) return false

        return await this.queryUsersRepository.updateConfirmation(user.id)
    }

    async loginUserToTheSystem(username: string, password: string) {
        const user: User | null = await this.checkCredentials(username, password);

        if (!user) {
            return null;
        }

        const accessToken = await jwtService.createAccessJWT(user.id, user.roles);

        const refreshTokenPayload = {
            deviceId: uuidv4(),
            userId: user.id
        };
        const refreshToken = await jwtService.createRefreshJWT(user.id, refreshTokenPayload);

        return { accessToken, refreshToken };
    }
    }




