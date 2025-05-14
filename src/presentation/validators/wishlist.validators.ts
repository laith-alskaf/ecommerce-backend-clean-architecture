import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';


const removeAndAddSchema = Joi.object({
    productId: Joi.string().required(),
});

export const validateAddAndRemoveProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { error } = removeAndAddSchema.validate(req.body);
        if (error) {
            return res.status(401).json({ success: false, message: error.message });
        }

        next();
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}








