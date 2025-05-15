import { Request, Response } from "express";
import { WishlistService } from "../../services/wishlist.service";
import { ResponseHandling } from "../../application/response/handleRespose";

export class WishlistController {
    wishlistService: WishlistService;

    constructor() {
        this.wishlistService = new WishlistService();
        this.addProdutcToWishlist = this.addProdutcToWishlist.bind(this);
        this.removeProdutcFromWishlist = this.removeProdutcFromWishlist.bind(this);
        this.getWishlist = this.getWishlist.bind(this);
        this.deleteWishlist = this.deleteWishlist.bind(this);
    }

    async getWishlist(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?.id;
            const wishlist = await this.wishlistService.getWishlist(userId);
            ResponseHandling.handleResponse({
                res, statusCode: 200, message: "User wishlist", body: wishlist
            });
        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
        }

    }

    async addProdutcToWishlist(req: Request, res: Response): Promise<void> {
        try {
            const { productId } = req.body;
            const userId = req.user?.id;
            const updatedWishlist = await this.wishlistService.addToWishlist(userId, productId);
            ResponseHandling.handleResponse({
                res, statusCode: 200, message: "Product added to wishlist", body: updatedWishlist
            });
        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
        }

    }

    async removeProdutcFromWishlist(req: Request, res: Response): Promise<void> {
        try {
            const { productId } = req.body;
            const userId = req.user?.id;
            const updatedWishlist = await this.wishlistService.removeFromWishlist(userId, productId);
            ResponseHandling.handleResponse({
                res, statusCode: 200, message: "Product removed from wishlist", body: updatedWishlist
            });
        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });

        }

    }


    async deleteWishlist(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?.id;
            await this.wishlistService.deleteWishlist(userId!);
            ResponseHandling.handleResponse({
                res, statusCode: 200, message: "Wishlist deleted successfully"
            });
        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
        }

    }
}
