import Joi from 'joi';
import { Messages } from '../../config/constant';
import { CategoryModel } from '../../../infrastructure/database/mongodb/models/category.model';

export const productSchema = Joi.object({
    title: Joi.string()
        .required()
        .messages({
            'string.empty': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.TITLE_REQUIRED_EN,
            'any.required': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.TITLE_REQUIRED_EN
        }),
    description: Joi.string()
        .required()
        .messages({
            'string.empty': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.DESCRIPTION_REQUIRED_EN,
            'any.required': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.DESCRIPTION_REQUIRED_EN
        }),
    price: Joi.number()
        .required()
        .messages({
            'number.base': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.PRICE_INVALID_EN,
            'any.required': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.PRICE_REQUIRED_EN
        }),
    stockQuantity: Joi.number().default(0),
    images: Joi.array().items(Joi.string().uri()),
    categoryId: Joi.string()
        .required()
        .external(async (value) => {
            const category = await CategoryModel.find({ _d: value });
            if (!category) {
                throw new Error(Messages.CATEGORY.NOT_FOUND_EN);
            }
            return value;
        })
        .messages({
            'any.required': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.CATEGORY_REQUIRED_EN
        })
});

export const productIdSchema = Joi.object({
    productId: Joi.string()
        .required()
        .messages({
            'string.empty': Messages.PRODUCT.VALIDATION.GENERAL_VALIDATION.PRODUCT_ID_REQUIRED_EN,
            'any.required': Messages.PRODUCT.VALIDATION.GENERAL_VALIDATION.PRODUCT_ID_REQUIRED_EN
        })
});

export const paginationSchema = Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).default(10)
});

export const searchProductSchema = paginationSchema.keys({
    title: Joi.string().allow(''),
    categoryId: Joi.string().allow('').external(async (value) => {
        const category = await CategoryModel.findById(value);
        if (!category) {
            throw new Error(Messages.CATEGORY.NOT_FOUND_EN);
        }
        return value;
    })
});
export const updateProductSchema = productIdSchema.keys({
    product: productSchema.required().messages({
        'object.base': Messages.PRODUCT.VALIDATION.GENERAL_VALIDATION.PRODUCT_DATA_REQUIRED_EN,
        'any.required': Messages.PRODUCT.VALIDATION.GENERAL_VALIDATION.PRODUCT_DATA_REQUIRED_EN,
    })
});

export const categoryIdSchema = Joi.object({
    categoryId: Joi.string()
        .required()
        .messages({
            'string.empty': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.CATEGORY_REQUIRED_EN,
            'any.required': Messages.PRODUCT.VALIDATION.PRODUCT_VALIDATION.CATEGORY_REQUIRED_EN
        })
});
