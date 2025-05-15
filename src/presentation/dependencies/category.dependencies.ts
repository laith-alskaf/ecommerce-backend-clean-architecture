import { MongoCategoryRepository } from '../../infrastructure/repositories/category.repository';
import { CategoryController } from '../controllers/category.controller';
import { JwtTokenService } from '../../infrastructure/srevices/jwt-token.service';

import {
    GetAllCategoriesUseCase,
    CreateCategoryUseCase,
    DeleteCategoryUseCase,
    GetCategoryByIdUseCase,
    UpdateCategoryUseCase,
} from '../../application/use-cases/category';



interface CategoryDependenciesType {
    tokenService: JwtTokenService;
    categoryRepository: MongoCategoryRepository;
}

export const CategoryDependencies = ({
    tokenService,
    categoryRepository
}: CategoryDependenciesType): CategoryController => {

    // Use Cases
    const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);
    const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
    const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);
    const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository, tokenService);
    const getCategoryByIdUseCase = new GetCategoryByIdUseCase(categoryRepository);

    const categoryController: CategoryController = new CategoryController(
        getAllCategoriesUseCase,
        createCategoryUseCase,
        deleteCategoryUseCase,
        getCategoryByIdUseCase,
        updateCategoryUseCase,
    );


    return categoryController;


}