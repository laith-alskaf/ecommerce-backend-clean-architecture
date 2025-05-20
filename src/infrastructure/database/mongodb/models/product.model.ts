import mongoose, { Schema, Model, Document } from "mongoose";
import { IProduct } from "../../../../domain/entity/product";
import { CategoryModel } from "./category.model";

type ProductDocument = IProduct & Document;

const productSchema = new Schema<ProductDocument>({
    _id: { type: String, default: () => crypto.randomUUID() },
    title: { type: String, required: true },
    description: { type: String, maxlength: 1000 },
    price: { type: Number, required: true, min: 0 },
    stockQuantity: { type: Number, default: 0, min: 0 },
    categoryId: {
        type: String,
        ref: 'Category',
        required: true,
    },
    images: [{
        type: String,
        validate: {
            validator: (url: string) => {
                return url.startsWith('http');
            },
            message: 'Image URL must start with http/https'
        }
    }],
    rating: {
        rate: {
            type: Number, default: 0, min: 0,
            max: 5
        },
        count: { type: Number, default: 0, min: 0 }
    },
    createdBy: {
        type: String,
        ref: 'Users',
        required: true,
    },
}, {
    timestamps: true,
});

productSchema.index({ title: 'text' });
productSchema.index({ categoryId: 1 });
productSchema.index({ createdAt: -1 }); 


export const ProductModel: Model<ProductDocument> = mongoose.model<ProductDocument>('Products', productSchema);