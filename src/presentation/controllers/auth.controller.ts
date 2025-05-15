import { Request, Response } from 'express';
import { ResponseHandling } from "../utils/handleRespose";
import { ChangePasswordDTO, ForgotPasswordDTO, LoginDTO, RegisterDTO, VerifyEmailDTO } from '../../application/dtos/user.dto';
import { Messages, StatusCodes } from '../config/constant';

import {
  LoginUseCase,
  RegisterUseCase,
  VerifiyEmailUseCase as VerifyEmailUseCase, // تصحيح الاسم هنا أيضاً
  ChangePasswordUseCase,
  ForgotPasswordUseCase,
} from "../../application/use-cases/auth";

/**
 * المتحكم المسؤول عن عمليات المصادقة والتسجيل
 */
export class AuthController {

  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly verifyEmailUseCase: VerifyEmailUseCase, // تصحيح الاسم
    private readonly changePasswordUseCase: ChangePasswordUseCase,
  ) { }

  /**
   * تسجيل مستخدم جديد
   */
  async register(req: Request, res: Response): Promise<void> {
    try {
      const registerData: RegisterDTO = req.body;
      await this.registerUseCase.execute(registerData);
      ResponseHandling.handleResponse({
        res,
        statusCode: StatusCodes.CREATED,
        message: Messages.AUTH.REGISTER_SUCCESS,
      });
    } catch (error: any) {
      ResponseHandling.handleResponse({
        res,
        statusCode: StatusCodes.BAD_REQUEST,
        message: error.message
      });
    }
  }

  /**
   * تسجيل دخول المستخدم
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const loginData: LoginDTO = req.body;
      const { token, user } = await this.loginUseCase.execute(loginData);
      ResponseHandling.handleResponse({
        res,
        statusCode: StatusCodes.OK,
        message: Messages.AUTH.LOGIN_SUCCESS,
        body: {
          token,
          userInfo: {
            id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role
          }
        }
      });
    } catch (error: any) {
      ResponseHandling.handleResponse({
        res,
        statusCode: StatusCodes.BAD_REQUEST,
        message: error.message
      });
    }
  }

  /**
   * تسجيل خروج المستخدم
   */
  async logout(_req: Request, res: Response): Promise<void> {
    ResponseHandling.handleResponse({
      res,
      statusCode: StatusCodes.OK,
      message: Messages.AUTH.LOGOUT_SUCCESS || "Logged out successfully"
    });
  }

  /**
   * إعادة تعيين كلمة المرور عند النسيان
   */
  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const forgotPasswordDTO: ForgotPasswordDTO = req.body;
      await this.forgotPasswordUseCase.execute(forgotPasswordDTO);
      ResponseHandling.handleResponse({
        res,
        statusCode: StatusCodes.OK,
        message: Messages.AUTH.FORGOT_PASSWORD_SUCCESS
      });
    } catch (error: any) {
      ResponseHandling.handleResponse({
        res,
        statusCode: StatusCodes.BAD_REQUEST,
        message: error.message
      });
    }
  }

  /**
   * التحقق من البريد الإلكتروني
   */
  async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const verifyEmailDTO: VerifyEmailDTO = req.body;
      await this.verifyEmailUseCase.execute(verifyEmailDTO);
      ResponseHandling.handleResponse({
        res,
        statusCode: StatusCodes.OK,
        message: Messages.AUTH.VERIFY_SUCCESS_EN
      });
    } catch (error: any) {
      ResponseHandling.handleResponse({
        res,
        statusCode: StatusCodes.BAD_REQUEST,
        message: error.message
      });
    }
  }

  /**
   * تغيير كلمة المرور
   */
  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const changePasswordDTO: ChangePasswordDTO = req.body;
      await this.changePasswordUseCase.execute(changePasswordDTO);
      ResponseHandling.handleResponse({
        res,
        statusCode: StatusCodes.OK,
        message: Messages.AUTH.RESET_PASSWORD_SUCCESS
      });
    } catch (error: any) {
      ResponseHandling.handleResponse({
        res,
        statusCode: StatusCodes.BAD_REQUEST,
        message: error.message
      });
    }
  }
}