import { CONFIG } from '../config/env';

// Srevices
import { JwtTokenService } from '../../infrastructure/srevices/jwt-token.service';
import { BcryptPasswordHasher } from '../../infrastructure/srevices/bcrypt-password-hasher';
import { NodemailerGmailService } from '../../infrastructure/srevices/nodemailer-gmail.service';
import { OTPGeneratorService } from '../../infrastructure/srevices/otp-generator';
import { UuidGeneratorService } from '../../infrastructure/srevices/uuid-generator.service';

// Repositories
import { MongoUserRepository } from '../../infrastructure/repositories/mongo-user.repository';
import { MongoProductRepository } from '../../infrastructure/repositories/product.repository';
import { MongoCategoryRepository } from '../../infrastructure/repositories/category.repository';

// Controllers Dependencies
import { AuthDependencies } from './auth.dependencies';
import { ProductDependencies } from './product.dependencies';
import { CategoryDependencies } from './category.dependencies';
import { WishlistDependencies } from './wishlist.dependencies';
import { MongoWishlistRepository } from '../../infrastructure/repositories/wishlist.repository';


export const setupDependencies = () => {

    // Repositories
    const userRepository = new MongoUserRepository();
    const prodcutRepository = new MongoProductRepository();
    const categoryRepository = new MongoCategoryRepository();
    const wishlistRepository = new MongoWishlistRepository();


    // Services
    const tokenService = new JwtTokenService();
    const uuidGeneratorService = new UuidGeneratorService();
    const otpStringGenerator = new OTPGeneratorService();
    const encryptionService = new BcryptPasswordHasher(CONFIG.SALT_ROUNDS_BCRYPT);
    const emailService = new NodemailerGmailService(CONFIG.GMAIL_USER!, CONFIG.GMAIL_PASS!);

    //Controllers

    // 1- Auth
    const authController = AuthDependencies({
        tokenService: tokenService,
        userRepository: userRepository,
        encryptionService: encryptionService,
        emailService: emailService,
        otpGeneratorService: otpStringGenerator,
        uuidGeneratorService: uuidGeneratorService,
    });

    //2- Product
    const productController = ProductDependencies({
        productRepository: prodcutRepository,
        uuidGeneratorService: uuidGeneratorService,
    });

    //3- Category
    const categoryController = CategoryDependencies({
        uuidGeneratorService: uuidGeneratorService,
        categoryRepository: categoryRepository
    });

      //3- Wishlist
    const wishlistController = WishlistDependencies({
        wishlistRepository: wishlistRepository
    });

    return {
        tokenService,
        userRepository,
        authController,
        productController,
        categoryController,
        wishlistController
    };
};