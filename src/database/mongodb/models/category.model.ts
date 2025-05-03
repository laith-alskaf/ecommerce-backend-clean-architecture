import { Schema, model } from "mongoose";
import { ICategory } from "../../../interfaces/category";
import { v4 as uuidv4 } from "uuid";

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



export const CategoryModel = model<ICategory>("Category", categorySchema);
