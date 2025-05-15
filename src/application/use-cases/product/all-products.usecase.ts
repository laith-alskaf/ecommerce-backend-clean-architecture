import { ProductRepository } from "../../../domain/repository/product.repository";
import { Messages } from "../../../presentation/config/constant";
import { PeginationProductDTO, ProductInfoDTO } from "../../dtos/product.dto";

export class GetAllProductsUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
    ) { }
    execute = async (peginationProductDTO: PeginationProductDTO, filter: {}): Promise<{ productData: ProductInfoDTO[], total: number }> => {
        const result = await this.productRepository.allProduct(
            peginationProductDTO.page,
            peginationProductDTO.limit,
            filter
        );
        if (!result) throw new Error(Messages.PRODUCT.NOT_FOUND_PRODUCTS);

        const { products, total } = result;

        const productData: ProductInfoDTO[] = [];
        products.forEach((product) => {
            productData.push({
                title: product?.title!,
                stockQuantity: product?.stockQuantity!,
                description: product?.description!,
                price: product?.price!,
                categoryId: product?.categoryId!,
                images: product?.images || null,
            });

        });

        return { productData, total };

    }
}