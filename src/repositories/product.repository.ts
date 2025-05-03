
import { ProductModel } from "../database/mongodb/models/product.model";
import { IProduct } from "../interfaces/product";
export class ProductRepository {


    async getAllProducts(): Promise<IProduct[] | null> {
        return await ProductModel.find({});
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
