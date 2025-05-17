import { Request, Response } from 'express';
import { ResponseHandling } from "../../application/response/handleRespose";
import { CreateProductDTO, DeleteProductDTO, GetProductsByUserIdDTO, PeginationProductDTO, SearchProductDTO, UpdateProductDTO } from '../../application/dtos/product.dto';
import { Messages, StatusCodes } from '../config/constant';
import {
    GetProductByIdUseCase,
    GetProductsByCategoryIdUseCase,
    GetProductsByUserIdUseCase,
    DeleteProductUseCase,
    CreateProductUseCase,
    UpdatedProductUseCase,
    GetAllProductsUseCase,
    SearchProductsUseCase,
} from "../../application/use-cases/product";


export class ProductController {

    constructor(
        private readonly getProductByIdUseCase: GetProductByIdUseCase,
        private readonly getProductsByCategoryIdUseCase: GetProductsByCategoryIdUseCase,
        private readonly getProductsByUserIdUseCase: GetProductsByUserIdUseCase,
        private readonly deleteProductUseCase: DeleteProductUseCase,
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly updatedProductUseCase: UpdatedProductUseCase,
        private readonly getAllProductsUseCase: GetAllProductsUseCase,
        private readonly searchProductsUseCase: SearchProductsUseCase
    ) { }

    async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const peginationProductDTO: PeginationProductDTO = {
                page: parseInt(req.query.page as string) || 1,
                limit: parseInt(req.query.limit as string) || 5
            };
            const { productData, total } = await this.getAllProductsUseCase.execute(peginationProductDTO, {});
            ResponseHandling.handleResponse({
                res: res, statusCode: StatusCodes.OK,
                message: Messages.PRODUCT.GET_ALL_SUCCESS_EN,
                body: {
                    currentPage: peginationProductDTO.page,
                    totalPages: Math.ceil(total / peginationProductDTO.limit),
                    totalItems: total,
                    products: productData,
                }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: error.message });
        }
    }

    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const createProductDTO: Partial<CreateProductDTO> = req.body;
            createProductDTO.createdBy = req.user.id,
                await this.createProductUseCase.execute(createProductDTO);
            ResponseHandling.handleResponse({
                res: res, statusCode: StatusCodes.CREATED,
                message: Messages.PRODUCT.CREATE_SUCCESS_EN,
            });
        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: error.message });
        }
    }

    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const { productId } = req.body;
            console.log(productId);
            const deleteProductDTO: DeleteProductDTO = { productId: productId };
            await this.deleteProductUseCase.execute(deleteProductDTO);
            ResponseHandling.handleResponse({
                res: res, statusCode: StatusCodes.OK,
                message: Messages.PRODUCT.DELETE_SUCCESS_EN
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: Messages.PRODUCT.NOT_FOUND_OPERATION_EN });
        }
    }

    async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const { productId } = req.params;
            const { product } = req.body;
            const updateProductDTO: UpdateProductDTO = {
                productId,
                product,
                updatedAt: new Date(),
            }
            const updatedProduct = await this.updatedProductUseCase.execute(updateProductDTO);
            ResponseHandling.handleResponse({
                res: res, statusCode: StatusCodes.OK,
                message: Messages.PRODUCT.UPDATE_SUCCESS_EN,
                body: {
                    product: updatedProduct
                }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: Messages.PRODUCT.NOT_FOUND_OPERATION_EN });
        }
    }

    async getSingleProduct(req: Request, res: Response): Promise<void> {
        try {
            const { productId } = req.params;
            const prodcut = await this.getProductByIdUseCase.execute(productId);
            ResponseHandling.handleResponse({
                res: res, statusCode: StatusCodes.OK,
                message: Messages.PRODUCT.GET_SUCCESS_EN,
                body: {
                    product: prodcut
                }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: error.message });
        }
    }

    async getProductsByCategoryId(req: Request, res: Response): Promise<void> {
        try {
            const { categoryId } = req.params;
            const prodcuts = await this.getProductsByCategoryIdUseCase.execute(categoryId);
            ResponseHandling.handleResponse({
                res: res, statusCode: StatusCodes.OK,
                message: Messages.PRODUCT.GET_ALL_SUCCESS_EN,
                body: {
                    products: prodcuts
                }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: Messages.PRODUCT.NOT_FOUND_PRODUCTS_EN });
        }
    }


    async searchProducts(req: Request, res: Response): Promise<void> {
        try {
            const { title = '', categoryId = '', page = 1, limit = 10, createdId } = req.query;
            const searchProductDTO: SearchProductDTO = {
                title: title as string,
                categoryId: categoryId as string,
                createdId: createdId as string,
                peginationProduct: {
                    page: parseInt(page as string),
                    limit: parseInt(limit as string),
                }
            }
            const prodcuts = await this.searchProductsUseCase.execute(searchProductDTO);
            ResponseHandling.handleResponse({
                res: res, statusCode: StatusCodes.OK,
                message: Messages.PRODUCT.GET_ALL_SUCCESS_EN,
                body: {
                    product: prodcuts
                }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: Messages.PRODUCT.NO_RESULTS_EN });
        }
    }

    async getProductsByUserId(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user.id;
            const { page = 1, limit = 10 } = req.query;
            const getProductsByUserIdDTO: GetProductsByUserIdDTO = {
                filter: { createdBy: userId },
                peginationProduct: {
                    page: parseInt(page as string),
                    limit: parseInt(limit as string),
                }

            }
            const { productData, total } = await this.getProductsByUserIdUseCase.execute(getProductsByUserIdDTO);
            ResponseHandling.handleResponse({
                res: res, statusCode: StatusCodes.OK,
                message: Messages.PRODUCT.GET_ALL_SUCCESS_EN,
                body: {
                    currentPage: getProductsByUserIdDTO.peginationProduct.page,
                    totalPages: Math.ceil(total / getProductsByUserIdDTO.peginationProduct.limit),
                    totalItems: total,
                    products: productData,
                }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: Messages.PRODUCT.NOT_FOUND_PRODUCTS_EN });
        }
    }


}
