import mongoose, { Model, Schema, model } from "mongoose"; // Erase if already required
import { IWishlist } from "../../../../domain/entity/wishlist";

type WishlistDocument = IWishlist & Document;
const wishlistSchema = new Schema<WishlistDocument>({
    userId: {
        type: String,
        ref: 'Users',
        required: true,
        unique: true,
        index: true,
    },
    productsId: [{ type: String, ref: 'Products', required: true, }],
}, {
    timestamps: true,
});
export const WishlistModel: Model<WishlistDocument> = mongoose.model<WishlistDocument>('Wishlist', wishlistSchema);
