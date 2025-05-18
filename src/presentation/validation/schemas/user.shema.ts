import Joi from "joi"
import { Messages } from "../../config/constant";


export const emailSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': Messages.USER.VALIDATION.EMAIL_INVALID_EN,
        'any.required': Messages.USER.VALIDATION.EMAIL_REQUIRED_EN,
    }),
});

export const loginSchema = emailSchema.keys({
    password: Joi.string().min(6).required().messages({
        'string.min': Messages.USER.VALIDATION.PASSWORD_MIN_EN,
        'any.required': Messages.USER.VALIDATION.PASSWORD_REQUIRED_EN
    })
});

export const signupSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required().messages({
        'string.min': Messages.USER.VALIDATION.USERNAME_MIN_EN,
        'string.max': Messages.USER.VALIDATION.USERNAME_MAX_EN,
        'any.required': Messages.USER.VALIDATION.USERNAME_REQUIRED_EN,
    }),
    role: Joi.string().valid('superAdmin', 'admin', 'customer').required().messages({
        'any.only': Messages.USER.VALIDATION.ROLE_INVALID_EN,
        'any.required': Messages.USER.VALIDATION.ROLE_REQUIRED_EN,
    }),
}).concat(loginSchema);

export const codeSchema = Joi.object({
    code: Joi.string().min(6).required().messages({
        'string.min': Messages.USER.VALIDATION.CODE_MIN_EN,
        'any.required': Messages.USER.VALIDATION.CODE_REQUIRED_EN,
    }),
});

export const changePasswordSchema = emailSchema.keys({
    newPassword: Joi.string().min(6).required().messages({
        'string.min': Messages.USER.VALIDATION.NEW_PASSWORD_MIN_EN,
        'any.required': Messages.USER.VALIDATION.NEW_PASSWORD_REQUIRED_EN,
    })
});
