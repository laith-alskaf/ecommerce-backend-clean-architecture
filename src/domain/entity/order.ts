export interface IOrder {
  id: string;
  userId: string; 
  products: IOrderItem[]; 
  totalAmount: number;
  status: 'pending' | 'completed' | 'canceled';
  shippingAddress: string; 
  createdAt: Date; 
  updatedAt: Date; 
}

export interface IOrderItem{
    productId: string; 
    quantity: number; 
    price: number; 
  }