import express from 'express';
import { ProductController } from '../controllers/product.controller';
import { validatePaginationProduct, validateProduct, validateProductId, validateSearchProduct, validateUpdateProduct } from '../validators/product.validators';
import { checkAdminForDUProduct, isAdmin } from '../middleware/auth.middleware';

const ProductRouters = express.Router();
const productController = new ProductController();

ProductRouters.get("/", validatePaginationProduct, productController.getAllProducts);
ProductRouters.post("/create", validateProduct, isAdmin, productController.createProduct);
ProductRouters.post("/delete", validateProductId, checkAdminForDUProduct, productController.deleteProduct);
ProductRouters.post("/update", validateUpdateProduct, checkAdminForDUProduct, productController.updateProduct);
ProductRouters.get("/search", validateSearchProduct, productController.searchProducts);
ProductRouters.get("/byCategoryId/:categoryId", productController.getProductsByCategoryId);
ProductRouters.get("/mine", isAdmin, productController.getAllProductsMine);
ProductRouters.get("/:productId", productController.getSingleProduct);





export default ProductRouters;