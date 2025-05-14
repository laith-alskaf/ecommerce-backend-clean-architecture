import express from 'express';
import { CategoryController } from '../controllers/category.controller';
import { validateCategory, validateCategorytId, validateUpdateCategory } from '../validators/category.validators';
import { checkAdminForDUCategory, isAdmin } from '../middleware/auth.middleware';

const CategoryRouters = express.Router();
const categoryController = new CategoryController();

CategoryRouters.get("/", categoryController.getAllCategory);
CategoryRouters.post("/create", validateCategory, isAdmin, categoryController.createCategory);
CategoryRouters.post("/delete", validateCategorytId, checkAdminForDUCategory, categoryController.deleteCategory);
CategoryRouters.post("/update", validateUpdateCategory, checkAdminForDUCategory, categoryController.updateCategory);
CategoryRouters.get("/:categoryId", categoryController.getSingleCategory);



export default CategoryRouters;