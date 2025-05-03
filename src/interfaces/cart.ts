import { Document } from "mongoose";
export interface ICartItem extends Document{
    productId: string;
    quantity: number;
  }
  
  export interface ICart extends Document{
    id: string;
    userId: string;
    items: ICartItem[];
    createdAt?: Date;
    updatedAt?: Date;
  }