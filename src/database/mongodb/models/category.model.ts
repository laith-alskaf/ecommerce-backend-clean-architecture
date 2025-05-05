import { Schema, model } from "mongoose";
import { ICategory } from "../../../interfaces/category";
import { v4 as uuidv4 } from "uuid";
import { ProductModel } from "./product.model";

const categorySchema = new Schema<ICategory>({
  id: { type: String, default: () => uuidv4(), unique: true, index: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, maxlength: 500 },
  createdBy: { type: String, required: true },
}, {
  timestamps: true, toJSON: {
    transform: (_, ret) => {
      delete ret._id;
      delete ret.__v;
    }
  }
});

// ✅ 1. لما يتم حذف category كوثيقة مباشرة
categorySchema.pre('deleteOne', { document: true, query: false }, async function () {
  const categoryId = this.get('id'); // لأنك تستخدم `id` كـ UUID
  await ProductModel.deleteMany({ categoryId });
});

// ✅ 2. لما يتم حذف category عن طريق استعلام (query)
categorySchema.pre('deleteOne', { document: false, query: true }, async function () {
  const filter = this.getFilter();
  const category = await CategoryModel.findOne(filter);
  if (category) {
    await ProductModel.deleteMany({ categoryId: category.id });
  }
});

export const CategoryModel = model<ICategory>("Category", categorySchema);
