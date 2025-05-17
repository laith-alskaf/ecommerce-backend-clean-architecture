// src/validators/user.validator.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { UserModel } from '../../infrastructure/database/mongodb/models/user.model';
import { StatusCodes } from '../config/constant';

/**
 * مخططات التحقق من صحة البيانات
 */
const schemas = {
  signup: Joi.object({
    userName: Joi.string().min(3).max(30).required().messages({
      'string.min': 'اسم المستخدم يجب أن يكون على الأقل 3 أحرف',
      'string.max': 'اسم المستخدم يجب أن لا يتجاوز 30 حرف',
      'any.required': 'اسم المستخدم مطلوب'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'يرجى إدخال بريد إلكتروني صحيح',
      'any.required': 'البريد الإلكتروني مطلوب'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'كلمة المرور يجب أن تكون على الأقل 6 أحرف',
      'any.required': 'كلمة المرور مطلوبة'
    }),
    role: Joi.string().valid('superAdmin', 'admin', 'customer').required().messages({
      'any.required': 'الدور مطلوب'
    }),
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'يرجى إدخال بريد إلكتروني صحيح',
      'any.required': 'البريد الإلكتروني مطلوب'
    }),
    password: Joi.string().required().messages({
      'any.required': 'كلمة المرور مطلوبة'
    })
  }),

  forgotPassword: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'يرجى إدخال بريد إلكتروني صحيح',
      'any.required': 'البريد الإلكتروني مطلوب'
    }),
  }),

  verifyEmail: Joi.object({
    code: Joi.string().required().messages({
      'any.required': 'رمز التحقق مطلوب'
    }),
  }),

  changePassword: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'يرجى إدخال بريد إلكتروني صحيح',
      'any.required': 'البريد الإلكتروني مطلوب'
    }),
    newPassword: Joi.string().min(6).required().messages({
      'string.min': 'كلمة المرور الجديدة يجب أن تكون على الأقل 6 أحرف',
      'any.required': 'كلمة المرور الجديدة مطلوبة'
    })
  }),
};

/**
 * معالج الأخطاء العام للتحقق من صحة البيانات
 */
const handleValidationError = (error: any, res: Response, errorLocation: string): Response => {
  console.log(`Error in ${errorLocation}:`, error);
  return res.status(StatusCodes.BAD_REQUEST).json({ 
    success: false, 
    message: error.details ? error.details[0].message : "خطأ في التحقق من البيانات" 
  });
};

/**
 * معالج الأخطاء العام للخطأ في الخادم
 */
const handleServerError = (error: any, res: Response, errorLocation: string): Response => {
  console.log(`Error in ${errorLocation}:`, error);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
    success: false, 
    message: "خطأ في الخادم" 
  });
};

/**
 * التحقق من صحة بيانات التسجيل
 */
export const validateSignup = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { error } = schemas.signup.validate(req.body);
    if (error) {
      return handleValidationError(error, res, "validateSignup");
    }

    // التحقق من وجود مسؤول رئيسي واحد فقط
    if (req.body.role === "superAdmin") {
      const existingSuperAdmin = await UserModel.findOne({ role: "superAdmin" });
      if (existingSuperAdmin) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "المسؤول الرئيسي موجود بالفعل. يُسمح بمسؤول رئيسي واحد فقط."
        });
      }
    }
    next();
  } catch (error) {
    return handleServerError(error, res, "validateSignup");
  }
};

/**
 * التحقق من صحة بيانات تسجيل الدخول
 */
export const validateLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { error } = schemas.login.validate(req.body);
    if (error) {
      return handleValidationError(error, res, "validateLogin");
    }
    next();
  } catch (error) {
    return handleServerError(error, res, "validateLogin");
  }
};

/**
 * التحقق من صحة بيانات نسيان كلمة المرور
 */
export const validateForgotPass = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { error } = schemas.forgotPassword.validate(req.body);
    if (error) {
      return handleValidationError(error, res, "validateForgotPass");
    }
    next();
  } catch (error) {
    return handleServerError(error, res, "validateForgotPass");
  }
};

/**
 * التحقق من صحة بيانات التحقق من البريد الإلكتروني
 */
export const validateVerifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { error } = schemas.verifyEmail.validate(req.body);
    if (error) {
      return handleValidationError(error, res, "validateVerifyEmail");
    }
    next();
  } catch (error) {
    return handleServerError(error, res, "validateVerifyEmail");
  }
};

/**
 * التحقق من صحة بيانات تغيير كلمة المرور
 */
export const validateChangePassword = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { error } = schemas.changePassword.validate(req.body);
    if (error) {
      return handleValidationError(error, res, "validateChangePassword");
    }
    next();
  } catch (error) {
    return handleServerError(error, res, "validateChangePassword");
  }
};