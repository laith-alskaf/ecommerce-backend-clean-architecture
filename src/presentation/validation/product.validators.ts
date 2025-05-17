import { createValidationMiddleware } from "../middleware/validation.middleware";
import {
  categoryIdSchema,
  paginationSchema,
  productIdSchema,
  productSchema,
  searchProductSchema,
  updateProductSchema
} from "./schemas/product.schema";


export const validateProduct = createValidationMiddleware({
  schema: productSchema,
  dataSource: 'body',
  useAsync: true
});

export const validateProductId = createValidationMiddleware({
  schema: productIdSchema,
  dataSource: 'body'
});


export const validateUpdateProduct = createValidationMiddleware({
  schema: updateProductSchema,
  dataSource: 'composite',
  useAsync: true
});

export const validatePaginationProduct = createValidationMiddleware({
  schema: paginationSchema,
  dataSource: 'query',
  useAsync: true
});

export const validateSearchProduct = createValidationMiddleware({
  schema: searchProductSchema,
  dataSource: 'query',
  useAsync: true
});

export const validateGetProductByCategoryId = createValidationMiddleware({
  schema: categoryIdSchema,
  dataSource: 'query',
  useAsync: true
});







