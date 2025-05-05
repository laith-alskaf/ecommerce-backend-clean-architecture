import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateSignup, validateLogin, validateForgotPass, validateVerifyEmail, validateChangePassword } from '../validators/user.validators';

const UserRouters = express.Router();
const authController = new AuthController();

UserRouters.post("/signup", validateSignup, authController.signup);

UserRouters.post("/login", validateLogin, authController.login);

UserRouters.post("/forgot-password", validateForgotPass, authController.forgotPassword);

UserRouters.post("/change-password", validateChangePassword, authController.changePassword);

UserRouters.post("/verifiy-email", validateVerifyEmail, authController.verifiyEmail);

UserRouters.post("/logout", authController.logout);




export default UserRouters;