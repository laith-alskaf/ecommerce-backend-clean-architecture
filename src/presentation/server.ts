import cookieParser from 'cookie-parser';
import express, { Express } from "express";
import { CONFIG } from "./config/env";
import authRoutes from './routes/auth.route';
import { setupDependencies } from './dependencies';
import productRouters from './routes/product.route';
import categoryRouters from './routes/category.route';
import { authMiddleware } from './middleware/auth.middleware';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import { corsOptions } from './config/corsOptions';

export default class Server {
    private app: Express;
    private container: any;

    constructor() {
        this.app = express();
    }

    private setupMiddleware() {
        this.app.use(express.json());
        this.app.use(authMiddleware(this.container.tokenService, this.container.userRepository))
    }

    private setupRoutes() {
        this.app.use(cors(corsOptions));
        this.app.use('/api/auth', authRoutes(this.container.authController));
        this.app.use('/api/product', productRouters(this.container.productController));
        this.app.use('/api/category', categoryRouters(this.container.categoryController));

    }

    public async run(): Promise<void> {
        return new Promise((resolve) => {
            this.app.listen(CONFIG.PORT, () => {
                console.log(`Server is running on ${CONFIG.CLIENT_URL}`);
                resolve();
            });
        });
    }

    public init(): void {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        this.container = setupDependencies();
        this.setupMiddleware();
        this.setupRoutes();
    }
}

