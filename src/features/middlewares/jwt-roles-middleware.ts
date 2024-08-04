import { Request, Response, NextFunction } from 'express';
import {jwtService} from "../application/jwt-service";
import {UserRolesEnum} from "../auth/enum/user-roles-emun";

export const jwtRolesValidator = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.sendStatus(401);
    }

    const token = authHeader.split(' ')[1];
    const roles = jwtService.getUserRolesByToken(token);
    console.log(token,"token in jwt")
    console.log(roles,"roles in jwt")

    if (roles & UserRolesEnum["администратор"]) {
        return next();
    } else {
        return res.sendStatus(403);
    }
}