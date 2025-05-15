import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { Messages, StatusCodes } from '../config/constant';
import { CategoryModel } from '../../infrastructure/database/mongodb/models/category.model';
import { UserModel } from '../../infrastructure/database/mongodb/models/user.model';

/**
 * مخططات التحقق من صحة بيانات المنتجات
 */
const schemas = {
  product: Joi.object({
    title: Joi.string().required().messages({
      'string.empty': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.TITLE_REQUIRED_EN,
      'any.required': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.TITLE_REQUIRED_EN
    }),
    stockQuantity: Joi.number().default(0).messages({
      'number.base': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.STOCK_INVALID_EN
    }),
    description: Joi.string().required().messages({
      'string.empty': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.DESCRIPTION_REQUIRED_EN,
      'any.required': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.DESCRIPTION_REQUIRED_EN
    }),
    price: Joi.number().required().messages({
      'number.base': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.PRICE_INVALID_EN,
      'any.required': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.PRICE_REQUIRED_EN,
    }),
    categoryId: Joi.string().required().external(async (value) => {
      const category = await CategoryModel.findOne({ id: value });
      if (!category) {
        throw new Error('Not category found.');
      }
      return value;
    }).messages({
      'string.empty': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.CATEGORY_REQUIRED_EN,
      'any.required': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.CATEGORY_REQUIRED_EN
    }),
    images: Joi.array().items(Joi.string().uri().messages({
      'string.uri': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.IMAGE_URI_INVALID_EN
    }))
    // يمكن إعادة تفعيل هذا الجزء إذا كان مطلوباً
    // rating: Joi.object({
    //   rate: Joi.number().min(0).max(5).messages({
    //     'number.min': 'التقييم يجب أن يكون أكبر من أو يساوي 0',
    //     'number.max': 'التقييم يجب أن يكون أقل من أو يساوي 5'
    //   }),
    //   count: Joi.number().min(0).messages({
    //     'number.min': 'عدد التقييمات يجب أن يكون أكبر من أو يساوي 0'
    //   })
    // })
  }),

  productId: Joi.object({
    productId: Joi.string().required().messages({
      'string.empty': Messages.PRODUCT.VALIDATION.GENERAL_VALIDATION.ID_INVALID_EN,
      'any.required': Messages.PRODUCT.VALIDATION.GENERAL_VALIDATION.PRODUCT_ID_REQUIRED_EN
    }),
  }),

  pagination: Joi.object({
    page: Joi.number().min(1).default(1).messages({
      'number.base': Messages.PRODUCT.VALIDATION.PAGINATION_VALIDATION.PAGE_INVALID_EN,
      'number.min': Messages.PRODUCT.VALIDATION.PAGINATION_VALIDATION.PAGE_MIN_EN
    }),
    limit: Joi.number().min(1).default(10).messages({
      'number.base': Messages.PRODUCT.VALIDATION.PAGINATION_VALIDATION.LIMIT_INVALID_EN,
      'number.min': Messages.PRODUCT.VALIDATION.PAGINATION_VALIDATION.LIMIT_MIN_EN
    })
  }),

  updateProduct: Joi.object({
    productId: Joi.string().required().messages({
      'string.empty': Messages.PRODUCT.VALIDATION.GENERAL_VALIDATION.ID_INVALID_EN,
      'any.required': Messages.PRODUCT.VALIDATION.GENERAL_VALIDATION.PRODUCT_ID_REQUIRED_EN
    }),
    product: Joi.object().required().messages({
      'any.required': Messages.PRODUCT.VALIDATION.GENERAL_VALIDATION.PRODUCT_DATA_REQUIRED_EN
    })
  }),

  searchProduct: Joi.object({
    title: Joi.string().allow('').messages({
      'string.base': Messages.PRODUCT.VALIDATION.SEARCH_VALIDATION.TITLE_INVALID_EN
    }),
    categoryId: Joi.string().allow('').external(async (value) => {
      if (value) {
        const category = await CategoryModel.findOne({ id: value });
        if (!category) {
          throw new Error('Not category found.');
        }
      }
      return value;
    }).messages({
      'string.base': Messages.PRODUCT.VALIDATION.SEARCH_VALIDATION.CATEGORY_ID_INVALID_EN
    }),
    createdId: Joi.string().allow('').external(async (value) => {
      if (value) {
        const userId = await UserModel.findOne({ id: value });
        if (!userId) {
          throw new Error('Not user found.');
        }
      }
      return value;
    }).messages({
      'string.base': Messages.PRODUCT.VALIDATION.SEARCH_VALIDATION.CREATOR_ID_INVALID_EN
    }),
    page: Joi.number().min(1).default(1).messages({
      'number.base': Messages.PRODUCT.VALIDATION.PAGINATION_VALIDATION.PAGE_INVALID_EN,
      'number.min': Messages.PRODUCT.VALIDATION.PAGINATION_VALIDATION.PAGE_MIN_EN,
    }),
    limit: Joi.number().min(1).default(10).messages({
      'number.base': Messages.PRODUCT.VALIDATION.PAGINATION_VALIDATION.LIMIT_INVALID,
      'number.min': Messages.PRODUCT.VALIDATION.PAGINATION_VALIDATION.LIMIT_MIN_EN,
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
    message: error.details ? error.details[0].message : error.message || "خطأ في التحقق من البيانات"
  });
};

/**
 * معالج الأخطاء العام للخطأ في الخادم
 */
const handleServerError = (error: any, res: Response, errorLocation: string): Response => {
  console.log(`Error in ${errorLocation}:`, error);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message || "خطأ في الخادم"
  });
};

/**
 * التحقق من صحة بيانات إنشاء منتج جديد
 */
export const validateProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {

    // const imageName = req.file?.filename;
    // if (imageName) {
    //   req.body.images = [`${process.env.BASE_URL}/uploads/products/${imageName}`];
    // }
    await schemas.product.validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    next();
  } catch (error: any) {
    return handleValidationError(error, res, "validateProduct");
  }
};

/**
 * التحقق من صحة معرف المنتج
 */
export const validateProductId = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // تحقق مما إذا كان معرف المنتج في الـ params أو في الـ body
    const dataToValidate = req.params.productId
      ? { productId: req.params.productId }
      : req.body;

    const { error } = schemas.productId.validate(dataToValidate);
    if (error) {
      return handleValidationError(error, res, "validateProductId");
    }
    next();
  } catch (error: any) {
    return handleServerError(error, res, "validateProductId");
  }
};

/**
 * التحقق من صحة بيانات تحديث المنتج
 */
export const validateUpdateProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // تحقق مما إذا كان معرف المنتج في الـ params
    let dataToValidate = req.body;

    if (req.params.productId) {
      dataToValidate = {
        productId: req.params.productId,
        product: req.body
      };
    }

    await schemas.updateProduct.validateAsync(dataToValidate);
    next();
  } catch (error: any) {
    return handleValidationError(error, res, "validateUpdateProduct");
  }
};

/**
 * التحقق من صحة بيانات الصفحات
 */
export const validatePaginationProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { error } = schemas.pagination.validate(req.query);
    if (error) {
      return handleValidationError(error, res, "validatePaginationProduct");
    }
    next();
  } catch (error: any) {
    return handleServerError(error, res, "validatePaginationProduct");
  }
};

/**
 * التحقق من صحة بيانات البحث عن المنتجات
 */
export const validateSearchProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    await schemas.searchProduct.validateAsync(req.query);
    next();
  } catch (error: any) {
    return handleValidationError(error, res, "validateSearchProduct");
  }
};