import { IProduct } from '../interfaces/product';
import { ProductRepository } from '../repositories/product.repository';
import jwt from 'jsonwebtoken';
export class ProductService {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async createProduct(product: IProduct, token: string): Promise<IProduct> {
        const decoded: any = jwt.verify(token!, process.env.JWT_SECRET!);
        product.createdBy = decoded.id;
        const createdProduct = await this.productRepository.createProduct(product);
        if (!createdProduct) throw new Error("Please, try again after 1m");
        createdProduct!.save();
        return createdProduct;
    }
    async updateProduct(productId: string, product: IProduct): Promise<IProduct> {
        const updatedProduct = await this.productRepository.updateProduct(productId, product);
        if (!updatedProduct) throw new Error("Please, try again after 1m");
        updatedProduct.save();
        return updatedProduct;
    }

    async deleteProduct(productId: string): Promise<IProduct> {
        const deletedProduct = await this.productRepository.deleteProduct(productId);
        if (!deletedProduct) throw new Error("Please, check your product id");
        return deletedProduct;
    }

    async getAllProducts(): Promise<IProduct[]> {
        const products = await this.productRepository.getAllProducts();
        if (!products) throw new Error("Not found any product");
        return products;
    }

    async getSingleProduct(id: string): Promise<IProduct> {
        const product = await this.productRepository.getSingleProductById(id);
        if (!product) throw new Error("Product not found");
        return product;
    }
    async getProductsByCategoryId(id: string): Promise<IProduct[]> {
        const products = await this.productRepository.getProductsByCategoryId(id);
        if (!products) throw new Error("Product not found");
        return products;
    }

}
