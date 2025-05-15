import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { StatusCodes } from '../config/constant';

/**
 * مخططات التحقق من صحة بيانات الفئات
 */
const schemas = {
  category: Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'اسم الفئة مطلوب',
      'any.required': 'اسم الفئة مطلوب'
    }),
    description: Joi.string().required().messages({
      'string.empty': 'وصف الفئة مطلوب',
      'any.required': 'وصف الفئة مطلوب'
    }),
  }),

  categoryId: Joi.object({
    categoryId: Joi.string().required().messages({
      'string.empty': 'معرف الفئة مطلوب',
      'any.required': 'معرف الفئة مطلوب'
    }),
  }),

  updateCategory: Joi.object({
    categoryId: Joi.string().required().messages({
      'string.empty': 'معرف الفئة مطلوب',
      'any.required': 'معرف الفئة مطلوب'
    }),
    category: Joi.object({
      name: Joi.string().required().messages({
        'string.empty': 'اسم الفئة مطلوب',
        'any.required': 'اسم الفئة مطلوب'
      }),
      description: Joi.string().required().messages({
        'string.empty': 'وصف الفئة مطلوب',
        'any.required': 'وصف الفئة مطلوب'
      }),
    }).required().messages({
      'any.required': 'بيانات الفئة مطلوبة'
    })
  })
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
 * التحقق من صحة بيانات إنشاء فئة جديدة
 */
export const validateCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { error } = schemas.category.validate(req.body);
    if (error) {
      return handleValidationError(error, res, "validateCategory");
    }
    next();
  } catch (error: any) {
    return handleServerError(error, res, "validateCategory");
  }
};

/**
 * التحقق من صحة معرف الفئة
 */
export const validateCategoryId = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // تحقق مما إذا كان معرف الفئة في الـ params أو في الـ body
    const dataToValidate = req.params.categoryId 
      ? { categoryId: req.params.categoryId } 
      : req.body;
      
    const { error } = schemas.categoryId.validate(dataToValidate);
    if (error) {
      return handleValidationError(error, res, "validateCategoryId");
    }
    next();
  } catch (error) {
    return handleServerError(error, res, "validateCategoryId");
  }
};

/**
 * التحقق من صحة بيانات تحديث الفئة
 */
export const validateUpdateCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // تحقق مما إذا كان معرف الفئة في الـ params
    let dataToValidate = req.body;
    
    if (req.params.categoryId) {
      dataToValidate = {
        categoryId: req.params.categoryId,
        category: req.body
      };
    }
    
    const { error } = schemas.updateCategory.validate(dataToValidate);
    if (error) {
      return handleValidationError(error, res, "validateUpdateCategory");
    }
    next();
  } catch (error) {
    return handleServerError(error, res, "validateUpdateCategory");
  }
};