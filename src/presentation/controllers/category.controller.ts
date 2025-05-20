import { Request, Response } from 'express';
import { ResponseHandling } from "../../application/response/handleRespose";
import { Messages, StatusCodes } from '../config/constant';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../../application/dtos/category.dto';
import {
    GetAllCategoriesUseCase,
    CreateCategoryUseCase,
    DeleteCategoryUseCase,
    GetCategoryByIdUseCase,
    UpdateCategoryUseCase,
} from '../../application/use-cases/category';

export class CategoryController {

    constructor(
        private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
        private readonly createCategoryUseCase: CreateCategoryUseCase,
        private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
        private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase,
        private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    ) { }

    async getAllCategory(_req: Request, res: Response): Promise<void> {
        try {
            const category = await this.getAllCategoriesUseCase.execute();
            ResponseHandling.handleResponse({
                res: res, statusCode: StatusCodes.OK,
                message: Messages.CATEGORY.GET_ALL_SUCCESS_EN,
                body: { categories: category }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: error.message });
        }
    }

    async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const createCategoryDTO: Partial<CreateCategoryDTO> = req.body;
            createCategoryDTO.createdBy = req.user.id;
            await this.createCategoryUseCase.execute(createCategoryDTO);
            ResponseHandling.handleResponse({
                res: res, statusCode: StatusCodes.CREATED,
                message: Messages.CATEGORY.CREATE_SUCCESS_EN,
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: error.message });
        }
    }

    async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const { categoryId } = req.params;
            await this.deleteCategoryUseCase.execute(categoryId);
            ResponseHandling.handleResponse({
                res: res, statusCode: StatusCodes.OK,
                message: Messages.CATEGORY.DELETE_SUCCESS_EN
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: error.message });
        }
    }

    async updateCategory(req: Request, res: Response): Promise<void> {
        try {
            const { categoryId } = req.params;
            const updateCategoryDTO: Partial<UpdateCategoryDTO> = req.body.category;
            updateCategoryDTO.categoryId = categoryId;
            const updatedCategory = await this.updateCategoryUseCase.execute(updateCategoryDTO);
            ResponseHandling.handleResponse({
                res: res, statusCode: StatusCodes.OK,
                message: Messages.CATEGORY.UPDATE_SUCCESS_EN,
                body: {
                    category: updatedCategory
                }
            });
        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: StatusCodes.BAD_REQUEST, message: error.message });
        }
    }

    async getSingleCategory(req: Request, res: Response): Promise<void> {
        try {
            const { categoryId } = req.params;
            const category = await this.getCategoryByIdUseCase.execute(categoryId);
            ResponseHandling.handleResponse({
                res: res, statusCode: StatusCodes.OK,
                message: Messages.CATEGORY.GET_SUCCESS_EN,
                body: {
                    category: category
                }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
        }
    }

}
