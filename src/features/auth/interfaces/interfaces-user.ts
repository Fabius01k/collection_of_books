export type User = {
    id: string;
    username: string;
    passwordHash: string;
    passwordSalt: string;
    tokenCreationDate: Date;
    email: string;
    emailConfirmationCode: string;
    emailIsConfirmed: boolean;
    roles: number;
};

export interface UserResponse {
    id: string;
    username: string;
    email: string;
    roles: number;
}