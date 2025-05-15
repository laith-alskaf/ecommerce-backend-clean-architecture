import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { validateCategory, validateCategoryId, validateUpdateCategory } from '../validation/category.validators';
import { checkAdminForDUCategory, isAdmin } from '../middleware/auth.middleware';


const categoryRouters = (categoryController: CategoryController): Router => {
    const router = Router();

    router.get("/",
        categoryController.getAllCategory
    );

    router.post("/create",
        validateCategory,
        isAdmin,
        categoryController.createCategory.bind(categoryController)
    );

    router.post("/delete",
        validateCategoryId,
        checkAdminForDUCategory,
        categoryController.deleteCategory.bind(categoryController)
    );
    router.post("/update",
        validateUpdateCategory,
        checkAdminForDUCategory,
        categoryController.updateCategory.bind(categoryController)
    );
    router.get("/:categoryId",
        categoryController.getSingleCategory.bind(categoryController)
    );

    return router;

}

export default categoryRouters;