import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { ResponseHandling } from "../utils/handleRespose";
import { IProduct } from '../interfaces/product';


export class ProductController {
    productService: ProductService;

    constructor() {
        this.productService = new ProductService();
        this.getAllProducts = this.getAllProducts.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.getSingleProduct = this.getSingleProduct.bind(this);
        this.getProductsByCategoryId = this.getProductsByCategoryId.bind(this);
        this.searchProducts = this.searchProducts.bind(this);
        this.getAllProductsMine = this.getAllProductsMine.bind(this);
    }

    async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 5;
            const { products, total } = await this.productService.getAllProducts(page, limit);
            ResponseHandling.handleResponse({
                res: res, statusCode: 200,
                message: "Fetched products with pagination",
                body: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalItems: total,
                    products: products,
                }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
        }
    }

    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const product: IProduct = req.body;
            const token = req.header('Authorization')?.replace('Bearer ', '');
            const createdProduct = await this.productService.createProduct(product, token!);
            ResponseHandling.handleResponse({
                res: res, statusCode: 200,
                message: "This is the product after updating ",
                body: { product: createdProduct }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
        }
    }

    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const { productId } = req.body;
            console.log(productId);
            if (!productId) throw new Error("The prodcut not updated");
            await this.productService.deleteProduct(productId);
            ResponseHandling.handleResponse({
                res: res, statusCode: 200,
                message: "Product deleted successfully"
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
        }
    }

    async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const { product, productId } = req.body;
            console.log(product);
            if (!product) throw new Error("The prodcut not updated");
            const updatedProduct = await this.productService.updateProduct(productId, product);
            ResponseHandling.handleResponse({
                res: res, statusCode: 200,
                message: "Product deleted successfully",
                body: {
                    product: updatedProduct
                }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
        }
    }

    async getSingleProduct(req: Request, res: Response): Promise<void> {
        try {
            const { productId } = req.params;
            if (!productId) throw new Error("Product not found");
            const prodcut = await this.productService.getSingleProduct(productId);
            ResponseHandling.handleResponse({
                res: res, statusCode: 200,
                message: "This is the product",
                body: {
                    product: prodcut
                }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
        }
    }

    async getProductsByCategoryId(req: Request, res: Response): Promise<void> {
        try {
            const { categoryId } = req.params;
            if (!categoryId) throw new Error("Product not found");
            const prodcuts = await this.productService.getProductsByCategoryId(categoryId);
            ResponseHandling.handleResponse({
                res: res, statusCode: 200,
                message: "This is the product",
                body: {
                    product: prodcuts
                }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
        }
    }


    async searchProducts(req: Request, res: Response): Promise<void> {
        try {
            const { title = '', categoryId = '', page = 1, limit = 10, createdId = '' } = req.query;
            const pageNumber = parseInt(page as string);
            const limitNumber = parseInt(limit as string);
            const productTitle = title as string;
            const category_Id = categoryId as string;
            const created_Id = createdId as string;
            const prodcuts = await this.productService.searchProducts(pageNumber, limitNumber, productTitle, category_Id, created_Id);
            ResponseHandling.handleResponse({
                res: res, statusCode: 200,
                message: "This is the product",
                body: {
                    product: prodcuts
                }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
        }
    }

    async getAllProductsMine(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user.id;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 5;
            const { products, total } = await this.productService.productsMine(page, limit, userId);
            ResponseHandling.handleResponse({
                res: res, statusCode: 200,
                message: "Fetched products with pagination",
                body: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalItems: total,
                    products: products,
                }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
        }
    }


}
