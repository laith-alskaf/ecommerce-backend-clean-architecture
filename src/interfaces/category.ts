import { Document } from "mongoose";
export interface ICategory extends Document {
  id: string;
  name: string;
  description?: string;
  createdBy: string,
  createdAt?: Date;
  updatedAt?: Date;
}