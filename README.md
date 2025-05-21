# 🛍️ E-Commerce Backend with Wishlist - Clean Architecture

A **scalable**, **secure**, and **maintainable** e-commerce backend built with **Node.js**, **TypeScript**, **Express**, and **MongoDB**, following **Clean Architecture** principles. This project powers a modern e-commerce platform with robust user authentication, role-based access control, product and category management, and a user wishlist system. It includes comprehensive **Swagger documentation** and is designed for developers learning real-world backend development.

## 🎯 Why This Project?

This is my **second training backend project**, actively developed to practice and master modern backend technologies and patterns. It serves as a practical example of:

- ✅ **Clean Architecture** with separated concerns (entities, use cases, controllers, repositories).
- 🎓 **TypeScript** for type-safe backend development.
- 🔐 **Authentication** and **authorization** systems (JWT, role-based access).
- 🛒 **RESTful API design** for e-commerce applications.
- 🧪 Real-world features like wishlist management and input validation.

## ✨ Features

### 🔐 User Authentication

- **JWT-based** signup, login, logout, email verification, and password reset.
- Secure password hashing with **bcrypt**.
- Email verification and password reset using **OTP codes**.
- Protected routes with **JWT middleware**.

### 👥 Role-Based Access Control

- **SuperAdmin**: Full system access (e.g., manage all products/categories).
- **Admin**: Manage own products and categories.
- **Customer**: Browse products, manage wishlist, and shop.

### 🛒 Product Management

- Create, read, update, and delete (CRUD) products.
- Search products by keyword with **pagination** support.
- Filter products by **category**.
- **Resource ownership** checks to ensure users only modify their own products.

### 📁 Category Management

- Full CRUD operations for categories.
- Retrieve categories and associated products.
- Input validation for secure category operations.

### 📋 Wishlist System

- **GET /wishlist**: View user's wishlist.
- **POST /wishlist/:productId**: Add a product to the wishlist (with validation).
- **DELETE /wishlist/product/:productId**: Remove a product from the wishlist (with validation).
- **DELETE /wishlist/all-product**: Clear the entire wishlist.
- All wishlist operations require **JWT authentication**.

### 🧪 Validation & Security

- Input validation using **Joi** for robust data integrity.
- **UUID** for secure resource IDs.
- **MongoDB indexing** for optimized queries.
- **CORS** support for cross-origin requests.
- Middleware for authentication and resource ownership.

### 📚 API Documentation

- Interactive **Swagger UI** at `/api-docs` for exploring all endpoints.
- Detailed **OpenAPI 3.0.0** specifications with JSDoc annotations.
- Clear request/response schemas and error handling.

## 📋 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint           | Description               | Protected | Validation               |
| ------ | ------------------ | ------------------------- | --------- | ------------------------ |
| POST   | `/register`        | Register a new user       | No        | `validateSignup`         |
| POST   | `/login`           | Login and issue JWT token | No        | `validateLogin`          |
| POST   | `/forgot-password` | Request password reset    | No        | `validateForgotPass`     |
| POST   | `/change-password` | Change password using OTP | No        | `validateChangePassword` |
| POST   | `/verify-email`    | Verify email with OTP     | No        | `validateVerifyEmail`    |
| POST   | `/logout`          | Log out a user            | Yes       | None                     |

### User-Categories (`/api/user/category`)

| Method | Endpoint       | Description           | Protected | Validation               |
| ------ | -------------- | --------------------- | --------- | ------------------------ |
| POST   | `/`            | Create a new category | Yes       | `validateCategory`       |
| DELETE | `/:categoryId` | Delete a category     | Yes       | `validateCategoryId`     |
| PUT    | `/:categoryId` | Update a category     | Yes       | `validateUpdateCategory` |

### Categories (`/api/category`)

| Method | Endpoint       | Description                 | Protected | Validation           |
| ------ | -------------- | --------------------------- | --------- | -------------------- |
| GET    | `/`            | Get all categories          | No        | None                 |
| GET    | `/:categoryId` | Get a single category by ID | No        | `validateCategoryId` |

### User-Products (`/api/user/product`)

| Method | Endpoint      | Description                      | Protected | Validation                                        |
| ------ | ------------- | -------------------------------- | --------- | ------------------------------------------------- |
| GET    | `/`           | Get products created by the user | Yes       | None                                              |
| POST   | `/`           | Create a new product             | Yes       | `validateProduct`                                 |
| DELETE | `/:productId` | Delete a product                 | Yes       | `validateProductId`, `checkResourceOwnership`     |
| PUT    | `/:productId` | Update a product                 | Yes       | `validateUpdateProduct`, `checkResourceOwnership` |

### Products (`/api/product`)

| Method | Endpoint                    | Description                        | Protected | Validation                       |
| ------ | --------------------------- | ---------------------------------- | --------- | -------------------------------- |
| GET    | `/`                         | Get all products (with pagination) | No        | `validatePaginationProduct`      |
| GET    | `/:productId`               | Get a single product by ID         | No        | None                             |
| GET    | `/byCategoryId/:categoryId` | Get products by category ID        | No        | `validateGetProductByCategoryId` |
| GET    | `/search`                   | Search products by keyword         | No        | `validateSearchProduct`          |

### Wishlist (`/api/wishlist`)

| Method | Endpoint              | Description                  | Protected | Validation                  |
| ------ | --------------------- | ---------------------------- | --------- | --------------------------- |
| GET    | `/`                   | Get user's wishlist          | Yes       | None                        |
| POST   | `/:productId`         | Add product to wishlist      | Yes       | `validateWishlistProductId` |
| DELETE | `/product/:productId` | Remove product from wishlist | Yes       | `validateWishlistProductId` |
| DELETE | `/all-product`        | Clear entire wishlist        | Yes       | None                        |

### API Documentation
- [API Documentation](https://ecommerce-backend-clean-architecture.vercel.app/api-docs/)
  
| Method | Endpoint    | Description                          |
| ------ | ----------- | ------------------------------------ |
| GET    | `/api-docs` | Interactive Swagger UI documentation |

## 🛠️ Tech Stack

- **Runtime**: Node.js (v18+)
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken), bcrypt
- **Validation**: Joi
- **ID Generation**: UUID
- **Documentation**: Swagger (swagger-jsdoc, swagger-ui-express)
- **Security**: CORS, dotenv
- **Others**: crypto

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/laith-alskaf/ecommerce-backend-clean-architecture.git
   cd ecommerce-backend-clean-architecture
   ```

2. **Create `.env` file**:
   Copy `.env.example` to `.env` and update with your configuration:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your-secret-key
   NOOE_ENV=development
   GMAIL_USER=laithalskaf@gmail.com
   GMAIL_PASS=************
   CLIENT_URL= http://localhost:5000
   SERVER_URL=https://ecommerce-backend-clean-architecture.vercel.app

   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Access the API**:
   - Base URL: `http://localhost:5000/api`
   - Swagger UI: `http://localhost:5000/api-docs`

## 🧪 API Testing

Test the API using **Postman** or **Swagger UI**:

1. Register a user via `/api/auth/register`.
2. verify your email `/api/auth/verify-email`.
3. Log in via `/api/auth/login` to obtain a JWT token.
4. Use the token in the `Authorization` header (`Bearer <token>`) for protected endpoints.
5. Explore all endpoints in Swagger UI at `/api-docs`.

### 📥 Postman Collection

Download the Postman collection for comprehensive testing:

- [Postman Collection](https://drive.google.com/file/d/1Yfbm9KyQFlnggJJoS5LFmy48C4HaAmYZ/view?usp=drive_link)
- Includes auth flows, product CRUD, wishlist operations, and role-based access tests.

## 🔐 Security Notes

- **JWT Tokens**: Expire after 1 hour. Refresh by logging in again.
- **Password Hashing**: Uses bcrypt for secure storage.
- **Input Validation**: Joi ensures robust data validation.
- **Resource Ownership**: Middleware prevents unauthorized product modifications.
- **CORS**: Configured for development; restrict origins in production.

## 📌 Project Status

This is my **second training backend project**, actively maintained to practice real-world backend development. I’m continuously improving it by:

- Adding new features (e.g., wishlist system).
- Applying best practices (e.g., Clean Architecture, TypeScript).
- Enhancing security and performance (e.g., MongoDB indexing, middleware).

I’m regularly pushing updates to GitHub as I experiment with new techniques, like debugging wishlist deletion issues or integrating PostgreSQL support. Follow along for my latest progress, and feel free to share feedback or ideas!

## 📈 Future Improvements

- Adding support for **PostgreSQL** database alongside MongoDB:.
- Implement **refresh tokens** for extended sessions.
- Support **multilingual responses** (e.g., Arabic).
- Integrate **payment gateways** (e.g., Stripe).
- Introduce **Jest** for unit and integration testing.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Feel free to:

- Open issues for bugs or suggestions.
- Submit pull requests for improvements.
- Share feedback on architecture or code.

## 📬 Contact

For questions or feedback:

- **Email**: laithalskaf@gmail.com
- **LinkedIn**: [[LinkedIn Profile](https://www.linkedin.com/in/laith-alskaf-10a4b4339)]

---

Built with 💪 by **Eng Laith Alskaf**.
