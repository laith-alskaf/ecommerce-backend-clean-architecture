// src/validators/user.validator.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { UserModel } from '../../infrastructure/database/mongodb/models/user.model';


const signupSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
const ForgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const verifyEmailSchema = Joi.object({
  code: Joi.string().required(),
});
const changePasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().required()
});


export const validateSignup = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const body = req.body;

    const { error } = signupSchema.validate(req.body);
    if (error) {
      console.log("Error in validateSignup", error);
      return res.status(401).json({ success: false, message: "All fields are required" });
    }
    if (body.role === "superAdmin") {
      const existingSuperAdmin = await UserModel.findOne({ role: "superAdmin" });
      if (existingSuperAdmin) {
        console.log("Error in existingSuperAdmin", error);
        return res.status(403).json({
          success: false,
          message: "Super Admin already exists. Only one Super Admin is allowed."
        });
      }
    }
    next();
  } catch (error) {
    console.log("Error in validateSignup", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}


export const validateLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log("Error in validateLogin", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }

}

export const validateForgotPass = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {

    const { error } = ForgotPasswordSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log("Error in validateForgotPass", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }

}

export const validateVerifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { error } = verifyEmailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log("Error in validateVerifyEmail", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }

}

export const validateChangePassword = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { error } = changePasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log("Error in validateVerifyEmail", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }

}

