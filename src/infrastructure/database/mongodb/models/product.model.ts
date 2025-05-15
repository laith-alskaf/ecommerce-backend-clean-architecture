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
        validate: {
            validator: async (categoryId: string) => {
                const category = await CategoryModel.findById(categoryId);
                return !!category;
            },
            message: 'Category does not exist'
        }
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
    createdBy: { type: String, required: true },
}, {
    timestamps: true,

    // toJSON: {
    //     transform: (_, ret) => {
    //         delete ret._id;
    //         delete ret.__v;
    //     }
    // }
});

productSchema.index({ title: 'text' });

productSchema.index({ title: 'text', categoryId: 1 });

productSchema.index({ createdAt: -1 });

productSchema.index({ categoryId: 1 });


export const ProductModel: Model<ProductDocument> = mongoose.model<ProductDocument>('Products', productSchema);