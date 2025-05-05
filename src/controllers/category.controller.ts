import { Request, Response } from 'express';
import { ResponseHandling } from "../utils/handleRespose";
import { CategoryService } from '../services/category.service';
import { ICategory } from '../interfaces/category';


export class CategoryController {
    categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
        this.getAllCategory = this.getAllCategory.bind(this);
        this.createCategory = this.createCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.getSingleCategory = this.getSingleCategory.bind(this);
    }

    async getAllCategory(_req: Request, res: Response): Promise<void> {
        try {
            const category = await this.categoryService.getAllCategory();
            ResponseHandling.handleResponse({
                res: res, statusCode: 200,
                message: "This is all category",
                body: { categories: category }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
        }
    }

    async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const category: ICategory = req.body;
            const token = req.header('Authorization')?.replace('Bearer ', '');
            const createdcategory = await this.categoryService.createCategory(category, token!);
            ResponseHandling.handleResponse({
                res: res, statusCode: 200,
                message: "Created Successfully",
                body: { category: createdcategory }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
        }
    }


    async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const { categoryId } = req.body;
            await this.categoryService.deleteCategory(categoryId);
            ResponseHandling.handleResponse({
                res: res, statusCode: 200,
                message: "Category deleted successfully"
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
        }
    }

    async updateCategory(req: Request, res: Response): Promise<void> {
        try {
            const { category, categoryId } = req.body;
            const updatedCategory = await this.categoryService.updateCategory(category, categoryId);
            ResponseHandling.handleResponse({
                res: res, statusCode: 200,
                message: "Category updated successfully",
                body: {
                    category: updatedCategory
                }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
        }
    }

    async getSingleCategory(req: Request, res: Response): Promise<void> {
        try {
            const { categoryId } = req.params;
            const category = await this.categoryService.getSingleCategory(categoryId);
            ResponseHandling.handleResponse({
                res: res, statusCode: 200,
                message: "This is the category",
                body: {
                    category: category
                }
            });

        } catch (error: any) {
            ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
        }
    }



}
