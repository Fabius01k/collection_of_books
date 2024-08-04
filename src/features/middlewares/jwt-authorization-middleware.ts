import {jwtService} from "../application/jwt-service";
import {Request, Response, NextFunction} from "express";

export const jwtTokenValidator = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) return res.sendStatus(401);

    const token = req.headers.authorization.split(' ')[1]

    if (!token && typeof token !== 'string') return res.sendStatus(401)

    const userId = await jwtService.getUserIdByToken(token);
    if (!userId) return res.sendStatus(401);

    next()
}