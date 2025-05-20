import { Request, Response, NextFunction } from 'express';
import { WishlistModel } from '../../infrastructure/database/mongodb/models/wishlist.model';
import { Messages, StatusCodes } from '../config/constant';
import { ResponseHandling } from '../../application/response/handleRespose';



export const wishlistProductIdMiddleware = (isAdd: boolean) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { productId } = req.params;
            const userId = req.user.id;
            const wishlist = await WishlistModel.findOne({ userId }).select('productsId');

            if (!wishlist) {
                throw new Error(Messages.WISHLIST.VALIDATION.WISHLIST_NOT_FOUND_EN);
            }
            if (isAdd && wishlist.productsId.includes(productId)) {
                throw new Error(Messages.WISHLIST.VALIDATION.PRODUCT_IN_WISHLIST_EN);
            }
            else if (!isAdd && !wishlist.productsId.includes(productId)) {
                throw new Error(Messages.WISHLIST.VALIDATION.PRODUCT_NOT_IN_WISHLIST_EN);
            }

            next();

        } catch (error: any) {
            return ResponseHandling.send({ res, statusCode: StatusCodes.BAD_REQUEST, message: error.message });
        }
    }

};