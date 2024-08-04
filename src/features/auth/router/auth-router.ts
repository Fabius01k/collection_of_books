import {Router} from "express";
import {authController} from "../../../composition-root";
import {InputRegistrationDataValidator} from "../../validation/user-validation";
import {inputValidationMiddleware} from "../../middlewares/input-validation-middleware";
import {jwtTokenValidator} from "../../middlewares/jwt-authorization-middleware";
import {InputRoleDataValidation} from "../../validation/user-role-validation";
import {jwtRolesValidator} from "../../middlewares/jwt-roles-middleware";
import {confirmationCodeValidator} from "../../validation/confirmation-code-validation";


export const authRouter = Router({})

authRouter.get('/me',jwtTokenValidator,authController.getDataUser.bind(authController))


authRouter.post('/register',InputRegistrationDataValidator,inputValidationMiddleware,
    authController.registrationUser.bind(authController))

authRouter.post('/register-confirmation',confirmationCodeValidator,authController.registerConfirmation.bind(authController))

authRouter.post('/login',authController.loginUser.bind(authController))



authRouter.put('/:id/role',jwtTokenValidator,jwtRolesValidator,InputRoleDataValidation,inputValidationMiddleware, authController.changeRole.bind(authController))



