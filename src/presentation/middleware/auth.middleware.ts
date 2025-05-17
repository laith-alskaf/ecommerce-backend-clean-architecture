import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Messages, StatusCodes } from '../config/constant';
import { UserModel } from '../../infrastructure/database/mongodb/models/user.model';
import { ProductModel } from '../../infrastructure/database/mongodb/models/product.model';
import { CategoryModel } from '../../infrastructure/database/mongodb/models/category.model';


declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
                role?: string;
            };
        }
    }
}


interface DecodedToken {
    id: string;
    role?: string;
    [key: string]: any;
}


const getJwtSecret = (): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.warn('JWT_SECRET is not set in environment variables. Using default secret (not recommended for production).');
        return 'default_jwt_secret_for_development_only';
    }
    return secret;
};


const extractAndVerifyToken = (req: Request): DecodedToken => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        throw new Error(Messages.AUTH.AUTHENTICATION_REQUIRED);
    }

    try {
        const decoded = jwt.verify(token, getJwtSecret()) as DecodedToken;
        return decoded;
    } catch (error) {
        throw new Error(Messages.AUTH.INVALID_TOKEN_EN);
    }
};


const handleAuthError = (error: any, res: Response): Response => {
    return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: error.message || Messages.AUTH.AUTHENTICATION_REQUIRED_EN,
    });
};


export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const decoded = extractAndVerifyToken(req);

        const user = await UserModel.findById(decoded.id);
        if (!user) {
            throw new Error(Messages.USER.USER_NOT_FOUND_EN);
        }

        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();
    } catch (error: any) {
        handleAuthError(error, res);
    }
};


export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const decoded = extractAndVerifyToken(req);

        if (decoded.role !== 'admin' && decoded.role !== 'superAdmin') {
            throw new Error(Messages.USER.UNAUTHORIZED_ACTION_EN);
        }

        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();
    } catch (error: any) {
        handleAuthError(error, res);
    }
};


export const checkAdminForDUProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const decoded = extractAndVerifyToken(req);

        const productId = req.body.productId;

        if (!productId) {
            throw new Error(Messages.PRODUCT.VALIDATION.GENERAL_VALIDATION.PRODUCT_ID_REQUIRED_EN);
        }

        const product = await ProductModel.findById(productId);
        if (!product) {
            throw new Error(Messages.PRODUCT.NOT_FOUND_EN);
        }
        const isSuperAdmin = decoded.role === 'superAdmin';
        const isProductOwner = decoded.role === 'admin' && product.createdBy === decoded.id;

        if (!isSuperAdmin && !isProductOwner) {
            throw new Error(Messages.USER.UNAUTHORIZED_ACTION_EN);
        }


        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();
    } catch (error: any) {
        handleAuthError(error, res);
    }
};


export const checkAdminForDUCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const decoded = extractAndVerifyToken(req);

        const categoryId = req.body.categoryId || req.params.categoryId;

        if (!categoryId) {
            throw new Error(Messages.CATEGORY.VALIDATION.CATEGORY_ID_REQUIRED_EN);
        }


        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            throw new Error(Messages.CATEGORY.NOT_FOUND_EN);
        }

        const isSuperAdmin = decoded.role === 'superAdmin';
        const isCategoryOwner = decoded.role === 'admin' && category.createdBy === decoded.id;

        if (!isSuperAdmin && !isCategoryOwner) {
            throw new Error(Messages.USER.UNAUTHORIZED_ACTION_EN);
        }

        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();
    } catch (error: any) {
        handleAuthError(error, res);
    }
};

// export const auth = {
//     required: async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const token = req.header('Authorization')?.split('Bearer ')[1];
//             if (!token) throw new Error(Messages.AUTH.TOKEN_MISSING_EN);

//             const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string; role?: string };
//             const user = await UserModel.findById(decoded.id) || null;

//             if (!user) throw new Error(Messages.USER.USER_NOT_FOUND_EN);
//             req.user = { id: user.id, role: user.role };
//             next();
//         } catch (error: any) {
//             res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: error.message });
//         }
//     },

//     admin: (req: Request, res: Response, next: NextFunction) => {
//         if (!['admin', 'superAdmin'].includes(req.user.role || '')) {
//             return res.status(StatusCodes.FORBIDDEN).json({ success: false, message: Messages.AUTH.UNAUTHORIZED_ACCESS_EN });
//         }
//         next();
//     },

//     resourceOwner: (model: 'IProduct' | 'ICategory') => async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             // const resourceId = req.params[`${model.toLowerCase()}Id`] || req.body.id;
//             // const resource = await { IProduct: ProductModel, ICategory: CategoryModel }[model].findById(resourceId);

//             // if (!resource) throw new Error(Messages[model.toUpperCase() as keyof typeof Messages].NOT_FOUND);
//             if (req.user.role !== 'superAdmin' && resource.createdBy.toString() !== req.user.id) {
//                 throw new Error(Messages.AUTH.UNAUTHORIZED_ACCESS);
//             }

//             next();
//         } catch (error) {
//             res.status(StatusCodes.FORBIDDEN).json({ success: false, message: error.message });
//         }
//     }
// };