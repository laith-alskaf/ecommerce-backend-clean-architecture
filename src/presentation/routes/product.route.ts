import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validateGetProductByCategoryId, validatePaginationProduct, validateProduct, validateProductId, validateSearchProduct, validateUpdateProduct } from '../validation/product.validators';
import { checkResourceOwnership } from '../middleware/resource-ownership.middleware';
import { ProductModel } from '../../infrastructure/database/mongodb/models/product.model';


const productRoutes = (productController: ProductController): Router => {
    const idKey = 'productId';
    const router = Router()
    // router.post("/create", upload.single("image"), validateProduct, productController.createProduct.bind(productController));
    router.get("/", validatePaginationProduct, productController.getAllProducts.bind(productController));

    router.post("/create", validateProduct, productController.createProduct.bind(productController));

    router.get("/search", validateSearchProduct, productController.searchProducts.bind(productController));

    router.get("/mine", productController.getProductsByUserId.bind(productController));

    router.delete("/delete", validateProductId, checkResourceOwnership(ProductModel, idKey), productController.deleteProduct.bind(productController));

    router.get("/byCategoryId/:categoryId", validateGetProductByCategoryId, productController.getProductsByCategoryId.bind(productController));

    router.put("/update", validateUpdateProduct, checkResourceOwnership(ProductModel, idKey), productController.updateProduct.bind(productController));

    router.get("/:productId", productController.getSingleProduct.bind(productController));

    return router;

}
export default productRoutes;

