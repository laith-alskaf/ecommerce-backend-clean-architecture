// import jwt from 'jsonwebtoken';
// import { ICategory } from '../../domain/entity/category';
// import { MongoCategoryRepository } from '../../infrastructure/repositories/category.repository';
// export class CategoryService {
//     private categoryRepository: MongoCategoryRepository;

//     constructor() {
//         this.categoryRepository = new MongoCategoryRepository();
//     }

//     // async getAllCategory(): Promise<ICategory[] | null> {
//     //     const categories = await this.categoryRepository.getAllCategory();
//     //     if (!categories) throw new Error("There are no categoies");
//     //     return categories;
//     // }

//     // async createCategory(category: ICategory, token: string): Promise<ICategory> {
//     //     const decoded: any = jwt.verify(token!, process.env.JWT_SECRET!);
//     //     category.createdBy = decoded.id;
//     //     const createdCategory = await this.categoryRepository.createCategory(category);
//     //     if (!createdCategory) throw new Error("Please, try again after 1m");
//     //     return createdCategory;
//     // }

//     // async deleteCategory(categoryId: string): Promise<ICategory> {
//     //     const deletedCategory = await this.categoryRepository.deleteCategory(categoryId);
//     //     if (deletedCategory.deletedCount < 1) throw new Error("Category not found or already deleted");
//     //     return deletedCategory;
//     // }


//     // async updateCategory(category: ICategory, categoryId: string): Promise<ICategory> {
//     //     const updatedCategory = await this.categoryRepository.updateCategory(category, categoryId);
//     //     if (!updatedCategory) throw new Error("Category not found");
//     //     updatedCategory.updatedAt = new Date();
//     //     updatedCategory.save();
//     //     return updatedCategory;
//     // }

//     // async getSingleCategory(categoryId: string): Promise<ICategory> {
//     //     const category = await this.categoryRepository.getSingleProductById(categoryId);
//     //     if (!category) throw new Error("Category not found");
//     //     return category;
//     // }
// }
