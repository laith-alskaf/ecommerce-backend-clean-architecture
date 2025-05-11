import dotenv from 'dotenv'
import connectDB from "./database/mongodb/connection";
import express from 'express';
import authRoutes from './routes/auth.route'
import productRouters from './routes/product.route';
import categoryRouters from './routes/category.route';
import WishlistRouters from './routes/wishlist.route';
import path from 'path';
dotenv.config();

const app = express();
connectDB();
app.use(express.json());
// app.use(cookieParser());
// app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/product", productRouters);
app.use("/api/category",categoryRouters);
app.use("/api/wishlist",WishlistRouters);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port 5000");
});

export default app;


//pass  laithalskaf   B6a0pzdGluwoOpsy