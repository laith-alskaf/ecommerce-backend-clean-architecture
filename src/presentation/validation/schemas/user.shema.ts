import Joi from "joi";
import { Messages } from "../../config/constant";

export const updateUserInfoShema = Joi.object({
    userName: Joi.string().min(3).max(30).messages({
        'string.min': Messages.USER.VALIDATION.USERNAME_MIN_EN,
        'string.max': Messages.USER.VALIDATION.USERNAME_MAX_EN,
        'any.required': Messages.GENERAL.INVALID_PARAMETERS_EN
    }),
    email: Joi.string().email().messages({
        'string.email': Messages.USER.VALIDATION.EMAIL_INVALID_EN,
        'any.required': Messages.GENERAL.INVALID_PARAMETERS_EN
    }),
    role: Joi.string().valid('superAdmin', 'admin', 'customer').messages({
        'any.only': Messages.USER.VALIDATION.ROLE_INVALID_EN,
        'any.required': Messages.GENERAL.INVALID_PARAMETERS_EN
    }),
});