import { Document } from "mongoose";

export interface IWishlist extends Document {
    userId: string;
    productIds: string[];
  }
  
