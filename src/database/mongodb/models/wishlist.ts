import { Schema, model } from "mongoose"; // Erase if already required
import { IWishlist } from "../../../interfaces/wishlist";


const wishlistSchema = new Schema<IWishlist>({
    userId: {
        type: String, required: true, unique: true, index: true,
    },
    productIds: [{ type: String, ref: 'Product', required: true, }],
}, {
    timestamps: true,
    toJSON: {
        transform: (_, ret) => {
            delete ret._id;
            delete ret.__v;
        }
    }
});


export const wishlistModel = model<IWishlist>('Wishlist', wishlistSchema);