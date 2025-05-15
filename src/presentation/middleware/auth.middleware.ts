import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Messages, StatusCodes } from '../config/constant';
import { UserModel } from '../../infrastructure/database/mongodb/models/user.model';
import { ProductModel } from '../../infrastructure/database/mongodb/models/product.model';
import { CategoryModel } from '../../infrastructure/database/mongodb/models/category.model';

/**
 * توسيع واجهة الطلب لإضافة معلومات المستخدم
 */
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

/**
 * واجهة للبيانات المشفرة في التوكن
 */
interface DecodedToken {
    id: string;
    role?: string;
    [key: string]: any;
}

/**
 * الحصول على مفتاح JWT من متغيرات البيئة
 */
const getJwtSecret = (): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.warn('JWT_SECRET is not set in environment variables. Using default secret (not recommended for production).');
        return 'default_jwt_secret_for_development_only';
    }
    return secret;
};

/**
 * استخراج وفك تشفير التوكن من الطلب
 */
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

/**
 * معالج الأخطاء العام للمصادقة
 */
const handleAuthError = (error: any, res: Response): Response => {
    return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: error.message || Messages.AUTH.AUTHENTICATION_REQUIRED_EN,
    });
};

/**
 * وسيط للتحقق من أن المستخدم مسجل الدخول
 */
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const decoded = extractAndVerifyToken(req);

        // التحقق من وجود المستخدم في قاعدة البيانات
        const user = await UserModel.findOne({ id: decoded.id });
        if (!user) {
            throw new Error(Messages.USER.USER_NOT_FOUND_EN);
        }

        // إضافة معلومات المستخدم إلى الطلب
        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();
    } catch (error: any) {
        handleAuthError(error, res);
    }
};

/**
 * وسيط للتحقق من أن المستخدم مسؤول أو مسؤول رئيسي
 */
export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const decoded = extractAndVerifyToken(req);

        // التحقق من صلاحيات المستخدم
        if (decoded.role !== 'admin' && decoded.role !== 'superAdmin') {
            throw new Error(Messages.USER.UNAUTHORIZED_ACTION_EN);
        }

        // إضافة معلومات المستخدم إلى الطلب
        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();
    } catch (error: any) {
        handleAuthError(error, res);
    }
};

/**
 * وسيط للتحقق من صلاحيات تعديل وحذف المنتجات
 */
export const checkAdminForDUProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const decoded = extractAndVerifyToken(req);

        // الحصول على معرف المنتج من الطلب (إما من الجسم أو من المعلمات)
        const productId = req.body.productId || req.params.productId;

        if (!productId) {
            throw new Error(Messages.PRODUCT.VALIDATION.GENERAL_VALIDATION.PRODUCT_ID_REQUIRED_EN);
        }

        // التحقق من وجود المنتج
        const product = await ProductModel.findOne({ _id: productId });
        if (!product) {
            throw new Error(Messages.PRODUCT.NOT_FOUND_EN);
        }

        // التحقق من صلاحيات المستخدم
        const isSuperAdmin = decoded.role === 'superAdmin';
        const isProductOwner = decoded.role === 'admin' && product.createdBy === decoded.id;

        if (!isSuperAdmin && !isProductOwner) {
            throw new Error(Messages.USER.UNAUTHORIZED_ACTION_EN);
        }

        // إضافة معلومات المستخدم إلى الطلب
        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();
    } catch (error: any) {
        handleAuthError(error, res);
    }
};

/**
 * وسيط للتحقق من صلاحيات تعديل وحذف الفئات
 */
export const checkAdminForDUCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const decoded = extractAndVerifyToken(req);

        // الحصول على معرف الفئة من الطلب (إما من الجسم أو من المعلمات)
        const categoryId = req.body.categoryId || req.params.categoryId;

        if (!categoryId) {
            throw new Error("معرف الفئة مطلوب");
        }

        // التحقق من وجود الفئة
        const category = await CategoryModel.findOne({ id: categoryId });
        if (!category) {
            throw new Error("الفئة غير موجودة");
        }

        // التحقق من صلاحيات المستخدم
        const isSuperAdmin = decoded.role === 'superAdmin';
        const isCategoryOwner = decoded.role === 'admin' && category.createdBy === decoded.id;

        if (!isSuperAdmin && !isCategoryOwner) {
            throw new Error("غير مصرح: يمكنك فقط تعديل وحذف الفئات الخاصة بك");
        }

        // إضافة معلومات المستخدم إلى الطلب
        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();
    } catch (error: any) {
        handleAuthError(error, res);
    }
};