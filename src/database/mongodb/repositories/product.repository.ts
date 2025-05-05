import { IProduct } from "../../../interfaces/product";
import { ProductModel } from "../models/product.model";

export class ProductRepository {

    async getAllProducts(page: number, limit: number, filter: {}): Promise<{ products: IProduct[], total: number } | null> {
        const products = await ProductModel.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        const total = await ProductModel.countDocuments();
        return { products, total };

    }
    async getSingleProductById(id: string): Promise<IProduct | null> {
        return await ProductModel.findOne({ id });
    }
    async createProduct(product: IProduct): Promise<IProduct | null> {
        return await ProductModel.create(product);
    }
    async updateProduct(productId: string, product: IProduct): Promise<IProduct | null> {
        return await ProductModel.findOneAndUpdate({ id: productId }, product, { new: true });
    }

    async deleteProduct(productId: string): Promise<IProduct | null> {
        return await ProductModel.findOneAndDelete({ id: productId });
    }

    async getProductsByCategoryId(categoryId: string): Promise<IProduct[] | null> {
        return await ProductModel.find({ categoryId: categoryId });
    }




}
