import express from 'express';
import { WishlistController } from '../controllers/wishlist.controller';
import { validateAddAndRemoveProduct } from '../validation/wishlist.validators';

const WishlistRouters = express.Router();
const wishlistController = new WishlistController();

WishlistRouters.get("/", wishlistController.getWishlist);
WishlistRouters.post("/add-product", validateAddAndRemoveProduct, wishlistController.addProdutcToWishlist);
WishlistRouters.post("/remove-product", validateAddAndRemoveProduct, wishlistController.removeProdutcFromWishlist);
WishlistRouters.post("/delete", wishlistController.deleteWishlist);




export default WishlistRouters;