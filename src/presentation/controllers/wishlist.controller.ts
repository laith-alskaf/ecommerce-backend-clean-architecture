import { Request, Response } from "express";
import { ResponseHandling } from "../../application/response/handleRespose";
import { Messages, StatusCodes } from "../config/constant";
import {
    RemoveAllProductfromWishlistUseCase,
    RemoveProductFromWishlistUseCase,
    GetWishlistUseCase,
    AddProductToWishlistUseCase,
} from "../../application/use-cases/wishlist";
export class WishlistController {

    constructor(
        private readonly addProductToWishlistUseCase: AddProductToWishlistUseCase,
        private readonly getWishlistUseCase: GetWishlistUseCase,
        private readonly removeAllProductfromWishlistUseCase: RemoveAllProductfromWishlistUseCase,
        private readonly removeProductFromWishlistUseCase: RemoveProductFromWishlistUseCase,
    ) { }

    async getWishlist(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user.id;
            const wishlist = await this.getWishlistUseCase.execute(userId);
            ResponseHandling.send({
                res, statusCode: StatusCodes.OK, message: Messages.WISHLIST.GET_SUCCESS_EN, body: wishlist
            });
        } catch (error: any) {
            ResponseHandling.send({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: error.message });
        }

    }

    async addProdutcToWishlist(req: Request, res: Response): Promise<void> {
        try {
            const { productId } = req.params;
            console.log(productId);
            const userId = req.user.id;
            await this.addProductToWishlistUseCase.execute(userId, productId);
            ResponseHandling.send({
                res, statusCode: StatusCodes.OK, message: Messages.WISHLIST.ADD_SUCCESS_EN,
            });
        } catch (error: any) {
            ResponseHandling.send({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: error.message });
        }

    }

    async removeProdutcFromWishlist(req: Request, res: Response): Promise<void> {
        try {
            const { productId } = req.params;
            const userId = req.user?.id;
            await this.removeProductFromWishlistUseCase.execute(userId, productId);
            ResponseHandling.send({
                res, statusCode: StatusCodes.OK, message: Messages.WISHLIST.REMOVE_SUCCESS_EN,
            });
        } catch (error: any) {
            ResponseHandling.send({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: error.message });

        }

    }


    async removeAllProdutcFromWishlist(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?.id;
            await this.removeAllProductfromWishlistUseCase.execute(userId!);
            ResponseHandling.send({
                res, statusCode: StatusCodes.OK, message: Messages.WISHLIST.CLEAR_SUCCESS_EN,
            });
        } catch (error: any) {
            ResponseHandling.send({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: error.message });
        }

    }
}
