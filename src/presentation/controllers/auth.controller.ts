import { Request, Response } from 'express';
import { ResponseHandling } from "../utils/handleRespose";
import { RegisterUseCase } from '../../application/use-cases/auth';
import { ChangePasswordDTO, ForgotPasswordDTO, LoginDTO, RegisterDTO } from '../../application/dtos/user.dto';
import { Messages, StatusCodes } from '../config/constant';
import { LoginUseCase } from '../../application/use-cases/auth/login.usecase';
import { VerifiyEmailUseCase } from '../../application/use-cases/auth/verify-email.usecase';
import { ForgotPasswordUseCase } from '../../application/use-cases/auth/forgot-password.usecase';
import { ChangePasswordUseCase } from '../../application/use-cases/auth/change-password.usecase';


export class AuthController {

  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly verifiyEmailUseCase: VerifiyEmailUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
  ) { }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const registerData: RegisterDTO = req.body;
      await this.registerUseCase.execute(registerData);
      ResponseHandling.handleResponse({
        res: res, statusCode: StatusCodes.CREATED,
        message: Messages.REGISTER_SUCCESS,
      });
    } catch (error: any) {
      ResponseHandling.handleResponse({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: error.message });
    }
  }


  async login(req: Request, res: Response): Promise<void> {
    try {
      const loginData: LoginDTO = req.body;
      const { token, user } = await this.loginUseCase.execute(loginData);
      ResponseHandling.handleResponse({
        res: res, statusCode: StatusCodes.OK, message: Messages.LOGIN_SUCCESS, body: {
          token: token,
          userInfo: {
            "id": user._id,
            "userName": user.userName,
            "email": user.email,
            "role": user.role
          }
        }
      });
    } catch (error: any) {
      ResponseHandling.handleResponse({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: error.message });
    }
  }

  async logout(_req: Request, res: Response) {
    ResponseHandling.handleResponse({ res: res, statusCode: 200, message: "Logged out successfully" });
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const forgotPasswordDTO: ForgotPasswordDTO = req.body;
      await this.forgotPasswordUseCase.execute(forgotPasswordDTO);
      ResponseHandling.handleResponse({ res: res, statusCode: 200, message: Messages.FORGOT_PASSWORD_SUCCESS });
    } catch (error: any) {
      ResponseHandling.handleResponse({ res: res, statusCode: 500 });
    }
  }

  async verifiyEmail(req: Request, res: Response) {
    try {
      const verifyEmailDTO = req.body;
      await this.verifiyEmailUseCase.execute(verifyEmailDTO);
      ResponseHandling.handleResponse({
        res: res, message: Messages.VERIFY_SUCCESS, statusCode: StatusCodes.OK
      });
    } catch (error: any) {
      ResponseHandling.handleResponse({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: error.message });
    }
  }


  async changePassword(req: Request, res: Response) {
    try {
      const changePasswordDTO: ChangePasswordDTO = req.body;
      await this.changePasswordUseCase.execute(changePasswordDTO);
      ResponseHandling.handleResponse({ res: res, statusCode: 200, message: Messages.RESET_PASSWORD_SUCCESS });
    } catch (error: any) {
      ResponseHandling.handleResponse({ res: res, statusCode: 500, message: error.message });
    }
  }


}
