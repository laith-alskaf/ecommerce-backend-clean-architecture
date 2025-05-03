import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';


const categorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
});

const categoryIdSchema = Joi.object({
    categoryId: Joi.string().required(),
});

const updateCategorySchema = Joi.object({
    categoryId: Joi.string().required(),
    category: categorySchema.required()
});

export const validateCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { error } = categorySchema.validate(req.body);
        if (error) {
            console.log("Please, fill the required fields", error);
            return res.status(401).json({ success: false, message: "All fields are required" });
        }

        next();
    } catch (error: any) {
        console.log("Error in validateCreateCategory", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const validateCategorytId = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { error } = categoryIdSchema.validate(req.body);
        if (error) {
            console.log("Please, fill the required fields", error);
            return res.status(401).json({ success: false, message: "All fields are required" });
        }
        next();
    } catch (error) {
        console.log("Error in validateCreateCategory", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

export const validateUpdateCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { error } = updateCategorySchema.validate(req.body);
        if (error) {
            console.log("Please, fill the required fields", error);
            return res.status(401).json({ success: false, message: "All fields are required" });
        }
        next();
    } catch (error) {
        console.log("Error in validateCreateCategory", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}







