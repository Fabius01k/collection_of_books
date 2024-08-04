import * as jwt from 'jsonwebtoken'
import {settings} from "./settings";



export const jwtService = {
    async createAccessJWT(userId: string, roles: number) {
        const token = jwt.sign({ userId, roles }, settings.JWT_SECRET, { expiresIn: '30d' });
        return token;
    },

    async createRefreshJWT(userId: string, refreshTokenPayload: any) {
        const token = jwt.sign({ userId, ...refreshTokenPayload }, settings.JWT_SECRET, { expiresIn: '30m' });
        return token;
    },


    getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET);
            return result.userId;
        } catch (error) {
            return null;
        }
    },


    getUserRolesByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET);
            return result.roles;
        } catch (error) {
            return null;
        }
    }
};