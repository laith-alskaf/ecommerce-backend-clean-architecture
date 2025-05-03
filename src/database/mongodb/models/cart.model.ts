import { Schema, model } from "mongoose";
import { ICart } from "../../../interfaces/cart";
import { v4 as uuidv4 } from "uuid";

const cartSchema = new Schema<ICart>({
    id: { type: String, default: () => uuidv4() },
    userId: { type: String, required: true },
    items: [{
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
    }],
}, { timestamps: true });

cartSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
    }
  });
export const CartModel = model<ICart>("Cart", cartSchema);
