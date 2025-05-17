import cookieParser from 'cookie-parser';
import express, { Express } from "express";
import { CONFIG } from "./config/env";
import authRoutes from './routes/auth.route';
import { setupDependencies } from './dependencies';
import productRouters from './routes/product.route';
import categoryRouters from './routes/category.route';


export default class Server {
    private app: Express;
    private container: any;

    constructor() {
        this.app = express();
    }

    private setupMiddleware() {
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(express.static("public"));
        // this.app.use(authMiddleware(this.container.tokenService, this.container.userRepository))
    }

    private setupRoutes() {
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
        this.container = setupDependencies();
        this.setupMiddleware();
        this.setupRoutes();
    }
}

