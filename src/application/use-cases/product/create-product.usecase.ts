import { ProductRepository } from "../../../domain/repository/product.repository";
import { IdGeneratorService } from "../../../domain/services/id-generator.service";
import { CreateProductDTO } from "../../dtos/product.dto";

export class CreateProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly uuidGeneratorService: IdGeneratorService,
    ) { }
    execute = async (productDTO: Partial<CreateProductDTO>): Promise<void> => {
        const product = {
            ...productDTO,
            _id: this.uuidGeneratorService.generate(),
        }
        await this.productRepository.create(product);

    }
}