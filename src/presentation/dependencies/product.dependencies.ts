import { MongoProductRepository } from '../../infrastructure/repositories/product.repository';
import { ProductController } from '../controllers/product.controller';
import { UuidGeneratorService } from '../../infrastructure/srevices/uuid-generator.service';

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

interface ProductDependenciesType {
    productRepository: MongoProductRepository;
    uuidGeneratorService: UuidGeneratorService
}

export const ProductDependencies = ({
    productRepository,
    uuidGeneratorService
}: ProductDependenciesType): ProductController => {

    // Use Cases
    const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
    const getProductsByCategoryIdUseCase = new GetProductsByCategoryIdUseCase(productRepository);
    const getProductsByUserIdUseCase = new GetProductsByUserIdUseCase(productRepository);
    const deleteProductUseCase = new DeleteProductUseCase(productRepository);
    const createProductUseCase = new CreateProductUseCase(productRepository, uuidGeneratorService);
    const updatedProductUseCase = new UpdatedProductUseCase(productRepository);
    const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
    const searchProductsUseCase = new SearchProductsUseCase(productRepository);

    const productController: ProductController = new ProductController(
        getProductByIdUseCase,
        getProductsByCategoryIdUseCase,
        getProductsByUserIdUseCase,
        deleteProductUseCase,
        createProductUseCase,
        updatedProductUseCase,
        getAllProductsUseCase,
        searchProductsUseCase
    );


    return productController;


}