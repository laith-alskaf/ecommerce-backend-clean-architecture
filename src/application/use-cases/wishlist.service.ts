import { WishlistRepository } from '../infrastructure/repositories/wishlist.repository';
import { IWishlist } from '../domain/interfaces/wishlist';
import jwt from 'jsonwebtoken';

export class WishlistService {
    private wishlistRepository: WishlistRepository;

    constructor() {
        this.wishlistRepository = new WishlistRepository();
    }


    async addToWishlist(userId: string, productId: string): Promise<IWishlist | null> {
        return await this.wishlistRepository.addProduct(userId, productId);
    }

    async removeFromWishlist(userId: string, productId: string) {
        const wishlist = await this.wishlistRepository.removeProduct(userId, productId);
        if (!wishlist) throw new Error("Not found this product in wishlist");
        return wishlist;
    }

    async getWishlist(userId: string) {
        const wishlist = await this.wishlistRepository.getWishlistByUserId(userId);
        if (!wishlist) throw new Error("Not found any products in wishlist");
        return wishlist
    }

    async deleteWishlist(userId: string) {
        const deleted = await this.wishlistRepository.deleteWishlistByUserId(userId);
        if (!deleted) throw new Error("Wishlist not found");
    }
}
