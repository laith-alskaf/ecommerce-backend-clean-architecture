import { ProductInfoDTO } from "../../application/dtos/product.dto";

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;
  images: [type: string] | null;
  stockQuantity: number;
  rating: { rate: number, count: number } | null;
  createdBy: string
  createdAt: Date;
  updatedAt: Date;

}

export class ProductMapper {
  static toDTO(product: IProduct): ProductInfoDTO {
    return {
      _id: product._id,
      title: product.title,
      stockQuantity: product.stockQuantity,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
      images: product.images || null,
    };
  }
}