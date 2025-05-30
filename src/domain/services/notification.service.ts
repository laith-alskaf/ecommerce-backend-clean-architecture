import '../../application/dtos/product.dto'
import { ProductInfoDTO } from '../../application/dtos/product.dto';
export interface NotificationService {
    send( product: ProductInfoDTO ): Promise<void>;
}
