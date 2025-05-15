import { CategoryRepository } from "../../../domain/repository/category.repository";
import { DeleteCategoryDTO } from "../../dtos/category.dto";

export class DeleteCategoryUseCase {
    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) { }
    execute = async (deleteCategoryDTO: DeleteCategoryDTO): Promise<void> => {
        await this.categoryRepository.delete(deleteCategoryDTO.categoryId);
    }
}