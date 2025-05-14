// src/repositories/user.repository.ts
import { IWishlist } from '../../domain/entity/wishlist';
import { wishlistModel } from '../database/mongodb/models/wishlist';

export class WishlistRepository {

    async getWishlistByUserId(userId: string): Promise<IWishlist | null> {
        return await wishlistModel.findOne({ userId: userId });
    }

    async addProduct(userId: string, productId: string): Promise<IWishlist | null> {
        return await wishlistModel.findOneAndUpdate(
            { userId :userId },
            { $addToSet: { productIds: productId } },// addToSet لتجنّب التكرار
            { new: true, upsert: true }// upsert لإنشاء الوثيقة إن لم تكن موجودة
        );
    }

    async removeProduct(userId: string, productId: string): Promise<IWishlist | null> {
        return await wishlistModel.findOneAndUpdate(
            { userId: userId },
            { $pull: { productIds: productId } },
            { new: true }
        );
    }

    async deleteWishlistByUserId(userId: string): Promise<IWishlist | null> {
        return await wishlistModel.findOneAndDelete({ userId: userId });
    }



}
