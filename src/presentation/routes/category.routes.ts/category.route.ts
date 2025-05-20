import { Router } from 'express';
import { CategoryController } from '../../controllers/category.controller';
import {
    validateCategory,
    validateCategoryId,
    validateUpdateCategory
} from '../../validation/category.validators';



const categoryRouters = (categoryController: CategoryController): Router => {
    const router = Router();

    router.post("/",
        validateCategory,
        categoryController.createCategory.bind(categoryController)
    );

    router.delete("/:categoryId",
        validateCategoryId,
        categoryController.deleteCategory.bind(categoryController)
    );
    router.put("/:categoryId",
        validateUpdateCategory,
        categoryController.updateCategory.bind(categoryController)
    );

    return router;

}

export default categoryRouters;