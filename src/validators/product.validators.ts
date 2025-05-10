import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { CategoryModel } from '../database/mongodb/models/category.model';
import { UserModel } from '../database/mongodb/models/user.model';


const productSchema = Joi.object({
    title: Joi.string().required(),
    stockQuantity: Joi.number(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    categoryId: Joi.string().required().external(async (value) => {
        const category = await CategoryModel.findOne({ id: value });
        if (!category) {
            throw new Error('Category not found');
        }
        return value;
    }),
    images: Joi.array().items(Joi.string().dataUri()),
    rating: Joi.object({
        rate: Joi.number().min(0).max(5),
        count: Joi.number().min(0)
    })
});

const productIdSchema = Joi.object({
    productId: Joi.string().required(),
});

const paginationSchema = Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).default(10)
});

const updateProductSchema = Joi.object({
    productId: Joi.string().required(),
    product: productSchema.required()
});

const searchProductSchema = Joi.object({
    title: Joi.string().required(),
    categoryId: Joi.string().external(async (value) => {
        if(value){
            const category = await CategoryModel.findOne({ id: value });
            if (!category) {
                throw new Error('Category not found');
            }
            return value;
        }
      
    }),
    createdId: Joi.string().external(async (value) => {
        if(value){
            const userId = await UserModel.findOne({ id: value });
            if (!userId) {
                throw new Error('User not found');
            }
            return value;
        }
      
    }),
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).default(10)
});

export const validateProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { error } = await productSchema.validateAsync(req.body, {
            abortEarly: false,
            stripUnknown: true
        });
        if (error) {
            console.log("Please, fill the required fields", error);
            return res.status(401).json({ success: false, message: "All fields are required" });
        }
        next();
    } catch (error: any) {
        console.log("Error in validateCreateProduct", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const validateProductId = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { error } = productIdSchema.validate(req.body);
        if (error) {
            console.log("Please, fill the required fields", error);
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        next();
    } catch (error: any) {
        console.log("Error in validateCreateProduct", error);
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const validateUpdateProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { error } = await updateProductSchema.validateAsync(req.body);
        if (error) {
            console.log("Please, fill the required fields", error);
            return res.status(401).json({ success: false, message: "All fields are required" });
        }
        next();
    } catch (error) {
        console.log("Error in validateCreateProduct", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}


export const validatePaginationProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { error } = paginationSchema.validate(req.query);
        if (error) {
            return res.status(401).json({ success: false, message: error.message });
        }
        next();
    } catch (error) {
        console.log("Error in validateCreateProduct", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

export const validateSearchProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { error } = await searchProductSchema.validateAsync(req.query);
        if (error) {
            return res.status(401).json({ success: false, message: error.message });
        }
        next();
    } catch (error) {
        console.log("Error in validateCreateProduct", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}






