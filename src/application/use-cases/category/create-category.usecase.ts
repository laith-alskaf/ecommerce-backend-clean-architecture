import { CategoryRepository } from "../../../domain/repository/category.repository";
import {CreateCategoryDTO } from "../../dtos/category.dto";
import { TokenService } from "../../../domain/services/token.service";

export class CreateCategoryUseCase {
    private jwtSecret: string;
    constructor(
        private readonly categoryRepository: CategoryRepository,
        private readonly jwtTokenService: TokenService,
    ) { this.jwtSecret = process.env.JWT_SECRET || 'bW@$3@r%6eR%6!%6mZ%6eR@x'; }
    execute = async (token: string, category: Partial<CreateCategoryDTO>): Promise<void> => {

        const decoded: any = this.jwtTokenService.verify(token, this.jwtSecret);
        category.createdBy = decoded.id;
        await this.categoryRepository.create(category);

    }
}