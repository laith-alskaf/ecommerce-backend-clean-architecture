import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import {
    validateCategory,
    validateCategoryId,
    validateUpdateCategory
} from '../validation/category.validators';


const categoryRouters = (categoryController: CategoryController): Router => {
    const router = Router();

    router.get("/",
        categoryController.getAllCategory.bind(categoryController),
    );

    router.post("/create",
        validateCategory,
        categoryController.createCategory.bind(categoryController)
    );

    router.delete("/delete",
        validateCategoryId,
        categoryController.deleteCategory.bind(categoryController)
    );
    router.put("/update",
        validateUpdateCategory,
        categoryController.updateCategory.bind(categoryController)
    );
    router.get("/:categoryId",
        categoryController.getSingleCategory.bind(categoryController)
    );

    return router;

}

export default categoryRouters;