import express from 'express';
import { validateCategory } from '../validation/category.validators';
import { isAuthenticated } from '../middleware/auth.middleware';
import { WishlistController } from '../controllers/wishtlist.controller';
import { validateAddAndRemoveProduct } from '../validation/wishlist.validators';

const WishlistRouters = express.Router();
const wishlistController = new WishlistController();

WishlistRouters.get("/", isAuthenticated, wishlistController.getWishlist);
WishlistRouters.post("/add-product", isAuthenticated, validateAddAndRemoveProduct, wishlistController.addProdutcToWishlist);
WishlistRouters.post("/remove-product", isAuthenticated, validateAddAndRemoveProduct, wishlistController.removeProdutcFromWishlist);
WishlistRouters.post("/delete",isAuthenticated, wishlistController.deleteWishlist);




export default WishlistRouters;