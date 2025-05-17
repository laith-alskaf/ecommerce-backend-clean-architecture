import { createValidationMiddleware } from '../middleware/validation.middleware';
import { categoryIdSchema, categorySchema, updateCategorySchema } from './schemas/category.shema';


export const validateCategory = createValidationMiddleware({
  schema: categorySchema,
  dataSource: 'body',
  useAsync: false
});


export const validateCategoryId = createValidationMiddleware({
  schema: categoryIdSchema,
  dataSource: 'body',
  useAsync: false
});
export const validateUpdateCategory = createValidationMiddleware({
  schema: updateCategorySchema,
  dataSource: 'body',
  useAsync: false
});
