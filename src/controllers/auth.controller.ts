import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ResponseHandling } from "../utils/handleRespose";


export class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.verifiyEmail = this.verifiyEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  async signup(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      await this.authService.signup(userData);
      ResponseHandling.handleResponse({
        res: res, statusCode: 200,
        message: "The account has been created successfully",
      });
    } catch (error: any) {
      ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
    }
  }


  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      ResponseHandling.handleResponse({ res: res, statusCode: 200, body: { token: token } });
    } catch (error: any) {
      ResponseHandling.handleResponse({ res: res, statusCode: 401, message: error.message });
    }
  }

  async logout(_req: Request, res: Response) {
    ResponseHandling.handleResponse({ res: res, statusCode: 200, message: "Logged out successfully" });
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await this.authService.forgotPassword(email);
      ResponseHandling.handleResponse({ res: res, statusCode: 200, message: "Password reset Code sent to your email" });
    } catch (error: any) {
      ResponseHandling.handleResponse({ res: res, statusCode: 500 });
    }
  }

  async verifiyEmail(req: Request, res: Response) {
    try {
      const { code } = req.body;
      const user = await this.authService.verifiyEmail(code);
      ResponseHandling.handleResponse({
        res: res, message: "Email verifiy successfully", statusCode: 200,
        body: {
          userInfo: { "id": user.id, "name": user.userName, "email": user.email }
        }
      });
    } catch (error: any) {
      ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
    }
  }


  async changePassword(req: Request, res: Response) {
    try {
      const { newPassword, email } = req.body;
      await this.authService.changePassword(newPassword, email);
      ResponseHandling.handleResponse({ res: res, statusCode: 200, message: "Password chnaged successful" });
    } catch (error: any) {
      ResponseHandling.handleResponse({ res: res, statusCode: 500, message: error.message });
    }
  }


}
