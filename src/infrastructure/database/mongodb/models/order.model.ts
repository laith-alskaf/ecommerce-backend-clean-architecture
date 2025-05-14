import { Schema, model } from "mongoose";
import { IOrder } from "../../../../domain/entity/order";
import { v4 as uuidv4 } from "uuid";

const orderSchema = new Schema<IOrder>({
    id: { type: String, default: () => uuidv4() },
    userId: { type: String, required: true },
    products: [{
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'completed', 'canceled'],
        default: "pending"
    },
}, { timestamps: true });
orderSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
    }
});
export const OrderModel = model<IOrder>("Order", orderSchema);
