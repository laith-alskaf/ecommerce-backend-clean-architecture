import { Router } from 'express';
import { CategoryController } from '../../controllers/category.controller';


const publicCategoryRouters = (categoryController: CategoryController): Router => {
    const router = Router();

    router.get("/",
        categoryController.getAllCategory.bind(categoryController),
    );

    router.get("/:categoryId",
        categoryController.getSingleCategory.bind(categoryController)
    );

    return router;

}

export default publicCategoryRouters;