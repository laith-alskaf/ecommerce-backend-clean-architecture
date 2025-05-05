import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../database/mongodb/models/user.model';
import { ProductModel } from '../database/mongodb/models/product.model';
import { CategoryModel } from '../database/mongodb/models/category.model';

declare global {
    namespace Express {
        interface Request {
            user: { id: string };
        }
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error("Authentication required");
        }
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'y#^o%ur!-@se^&cr!~%^et-ke$&y'); // Replace with your actual secret
        const user = await UserModel.findOne({ id: decoded.id });
        req.user = { id: decoded.id };
        if (!user) {
            throw new Error("User not found");
        }

        next();
    } catch (error: any) {
        res.status(401).json({ message: error.message ?? 'Invalid token' });
    }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error("Authentication required");
        }
        const decoded: any = jwt.verify(token!, process.env.JWT_SECRET || 'y#^o%ur!-@se^&cr!~%^et-ke$&y'); // Replace with your actual secret

        if (decoded.role !== 'admin' && decoded.role !== 'superAdmin') {
            throw new Error("Unauthorized: SuperAmain and admin can do it that");
        }
        req.user = { id: decoded.userId };
        next();
    } catch (error: any) {
        res.status(401).json({ message: error.message ?? 'Invalid token' });
    }
}

export const checkAdminForDUProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        const { productId } = req.body;
        if (!token) {
            throw new Error("Authentication required");
        }
        const decoded: any = jwt.verify(token!, process.env.JWT_SECRET || 'y#^o%ur!-@se^&cr!~%^et-ke$&y');
        const product = await ProductModel.findOne({ id: productId });
        if (!product) {
            throw new Error("Product not found");
        }
        if (
            (decoded.role === 'admin' && product.createdBy !== decoded.id) ||
            (decoded.role !== 'admin' && decoded.role !== 'superAdmin')) {
            throw new Error("Unauthorized: You can only delete and update your own products");
        }
        req.user = { id: decoded.userId };
        next();
    } catch (error: any) {
        res.status(401).json({ message: error.message ?? 'Invalid token' });
    }
}

export const checkAdminForDUCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        const { categoryId } = req.body;
        if (!token) {
            throw new Error("Authentication required");
        }
        const decoded: any = jwt.verify(token!, process.env.JWT_SECRET || 'y#^o%ur!-@se^&cr!~%^et-ke$&y');
        const category = await CategoryModel.findOne({ id: categoryId });
        if (!category) {
            throw new Error("category not found");
        }
        if (
            (decoded.role === 'admin' && category.createdBy !== decoded.id) ||
            (decoded.role !== 'admin' && decoded.role !== 'superAdmin')) {
            throw new Error("Unauthorized: You can only delete and update your own categories");
        }
        req.user = { id: decoded.userId };
        next();
    } catch (error: any) {
        return res.status(401).json({ message: error.message ?? 'Invalid token' });
    }
}

