export interface IProduct{
  id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;
  images: string;
  stockQuantity: number;
  rating: { rate: number, count: number };
  createdBy:string
  createdAt: Date;
  updatedAt: Date;
}