
import { CategoryModel } from "../database/mongodb/models/category.model";
import { ICategory } from "../interfaces/category";
import { IProduct } from "../interfaces/product";
export class CategoryRepository {


    async getAllCategory(): Promise<ICategory[] | null> {
        return await CategoryModel.find({});
    }

    async createCategory(category: ICategory): Promise<ICategory> {
        return await CategoryModel.create(category);
    }

    async deleteCategory(categoryId: string): Promise<ICategory | null> {
        return await CategoryModel.findOneAndDelete({ id: categoryId });
    }

    async updateCategory(category: ICategory, categoryId: string): Promise<ICategory | null> {
        return await CategoryModel.findOneAndUpdate({ id: categoryId }, category, { new: true });
    }

    async getSingleProductById(categoryId: string): Promise<ICategory | null> {
        return await CategoryModel.findOne({ id: categoryId });
    }
}
