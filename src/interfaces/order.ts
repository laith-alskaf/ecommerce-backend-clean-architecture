import { Document } from "mongoose";
export interface IOrder  extends Document {
  id: string;
  userId: string; 
  products: IOrderItem[]; 
  totalAmount: number;
  status: 'pending' | 'completed' | 'canceled';
  shippingAddress: string; 
  createdAt: Date; 
  updatedAt: Date; 
}

export interface IOrderItem extends Document{
    productId: string; 
    quantity: number; 
    price: number; 
  }