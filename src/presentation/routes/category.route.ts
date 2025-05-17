import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
// import { checkAdminForDUCategory, isAdmin } from '../middleware/auth.middleware';
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
        // isAdmin,
        categoryController.createCategory.bind(categoryController)
    );

    router.delete("/delete",
        validateCategoryId,
        // checkAdminForDUCategory,
        categoryController.deleteCategory.bind(categoryController)
    );
    router.post("/update",
        validateUpdateCategory,
        // checkAdminForDUCategory,
        categoryController.updateCategory.bind(categoryController)
    );
    router.get("/:categoryId",
        categoryController.getSingleCategory.bind(categoryController)
    );

    return router;

}

export default categoryRouters;