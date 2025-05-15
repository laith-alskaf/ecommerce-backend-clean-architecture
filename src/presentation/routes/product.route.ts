import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validatePaginationProduct, validateProduct, validateProductId, validateSearchProduct, validateUpdateProduct } from '../validators/product.validators';
import { checkAdminForDUProduct, isAdmin } from '../middleware/auth.middleware';


const productRoutes = (productController: ProductController): Router => {

    const router = Router()
    // router.post("/create", isAdmin, upload.single("image"), validateProduct, productController.createProduct.bind(productController));
    router.get("/", validatePaginationProduct, productController.getAllProducts.bind(productController));
    router.post("/create", isAdmin, validateProduct, productController.createProduct.bind(productController));
    router.post("/delete", checkAdminForDUProduct, validateProductId, productController.deleteProduct.bind(productController));
    router.post("/update", validateUpdateProduct, checkAdminForDUProduct, productController.updateProduct.bind(productController));
    router.get("/search", validateSearchProduct, productController.searchProducts.bind(productController));
    router.get("/byCategoryId/:categoryId", productController.getProductsByCategoryId.bind(productController));
    router.get("/mine", isAdmin, productController.getProductsByUserId.bind(productController));
    router.get("/:productId", productController.getSingleProduct.bind(productController));



    return router;

}
export default productRoutes;

