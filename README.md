# 🛍️ E-Commerce Backend with Wishlist - Clean Architecture

A **scalable**, **secure**, and **maintainable** e-commerce backend built with **Node.js**, **TypeScript**, **Express**, **MongoDB**, and **PostgreSQL**, following **Clean Architecture** principles. This project powers a modern e-commerce platform with robust user authentication, role-based access control, product and category management, user wishlist, user profile management, and push notifications. It includes comprehensive **Swagger documentation** and is designed for developers learning real-world backend development.

## 🎯 Why This Project?

This is my **second training backend project**, actively developed to practice and master modern backend technologies and patterns. It serves as a practical example of:

- ✅ **Clean Architecture** with separated concerns (entities, use cases, controllers, repositories).
- 🎓 **TypeScript** for type-safe backend development.
- 🔐 **Authentication** and **authorization** systems (JWT, role-based access).
- 🛒 **RESTful API design** for e-commerce applications.
- 🧪 Real-world features like wishlist management, user profile updates, and input validation.

## ✨ Features

### 🔐 User Authentication

- **JWT-based** signup, login, logout, email verification, and password reset.
- Secure password hashing with **bcrypt**.
- Email verification and password reset using **OTP codes**.
- Protected routes with **JWT middleware**.

### 👥 Role-Based Access Control

- **SuperAdmin**: Full system access (e.g., manage all products/categories).
- **Admin**: Manage own products and categories.
- **Customer**: Browse products, manage wishlist, update profile, and shop.

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

### 👤 User Profile Management

- **GET /api/user/me**: Retrieve authenticated user's profile information.
- **PUT /api/user/me**: Update user profile (e.g., name, email).
- **DELETE /api/user/me**: Delete user account permanently.
- All profile operations require **JWT authentication** and input validation.

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

### User Profile (`/api/user`)

| Method | Endpoint | Description              | Protected | Validation               |
| ------ | -------- | ------------------------ | --------- | ------------------------ |
| GET    | `/me`    | Get user profile info    | Yes       | None                     |
| PUT    | `/me`    | Update user profile info | Yes       | `validateUpdateUserInfo` |
| DELETE | `/me`    | Delete user account      | Yes       | None                     |

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

### Wishlist (`/api/user/wishlist`)

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
- **Databases**:
  - **MongoDB**: NoSQL database with Mongoose.
  - **PostgreSQL**: Relational database managed via **Supabase** for enhanced scalability and user management.
- **Authentication**: JWT (jsonwebtoken), bcrypt
- **Validation**: Joi
- **ID Generation**: UUID, PostgreSQL auto-increment
- **Documentation**: Swagger (swagger-jsdoc, swagger-ui-express)
- **Security**: CORS, dotenv
- **Cloud Services**: Supabase (PostgreSQL)
- **Notifications**: Firebase Cloud Messaging (FCM)

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18 or higher
- **MongoDB**: Local or MongoDB Atlas
- **PostgreSQL**: Supabase account for managed PostgreSQL database
- **Firebase**: Firebase project for push notifications
- **npm**

### Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/laith-alskaf/ecommerce-backend-clean-architecture.git
   cd ecommerce-backend-clean-architecture
   ```

2. **Set up Supabase**:

   - Create a Supabase account at [Supabase.io](https://supabase.com/).
   - Create a new project and obtain the PostgreSQL connection string (e.g., `postgresql://[user]:[password]@[host]:[port]/[db]`).
   - Update the `DATABASE_URL` in the `.env` file with the Supabase connection string.
3. **Set up Firebase**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Generate a service account key under **Project Settings > Service Accounts**.
   - Create `firebase.env` and add Firebase credentials to it (see below).

   ```
   FIREBASE_TYPE=service_account
   FIREBASE_PROJECT_ID=
   FIREBASE_PRIVATE_KEY_ID=
   FIREBASE_PRIVATE_KEY=
   FIREBASE_CLIENT_EMAIL=
   FIREBASE_CLIENT_ID=
   FIREBASE_AUTH_URI=
   FIREBASE_TOKEN_URI=
   FIREBASE_AUTH_PROVIDER_CERT_URL=
   FIREBASE_CLIENT_CERT_URL=
   FIREBASE_UNIVERSE_DOMAIN=
   ```

4. **Create `.env` file**:
   Copy `.env.example` to `.env` and update with your configuration:

   ```
   PORT= ***
   MONGODB_URI= ***
   POSTGRES_URL= ***
   JWT_SECRET= your-secret-key
   NODE_ENV= development
   GMAIL_USER= ***
   GMAIL_PASS= ***
   CLIENT_URL= ***
   SERVER_URL= ***
   ```

4. **Install dependencies**:

   ```bash
   npm install
   ```

5. **Run the development server**:

   ```bash
   npm run dev
   ```

6. **Access the API**:
   - Base URL: `http://localhost:Port/api`
   - Swagger UI: `http://localhost:Port/api-docs`

## 🧪 API Testing

Test the API using **Postman** or **Swagger UI**:

1. Register a user via `/api/auth/register`.
2. Verify your email via `/api/auth/verify-email`.
3. Log in via `/api/auth/login` to obtain a JWT token.
4. Use the token in the `Authorization` header (`Bearer <token>`) for protected endpoints (e.g., `/api/user/me`).
5. Explore all endpoints in Swagger UI at `/api-docs`.

### 📥 Postman Collection

Download the Postman collection for comprehensive testing:

- [Postman Collection](https://drive.google.com/file/d/1qBzZ5rqvDApSoeo0YslUUBoDS_2W_dXR/view?usp=drive_link)
- Includes auth flows, product CRUD, wishlist operations, user profile management, and role-based access tests.

## 📢 Firebase Notifications Setup

This project uses **Firebase Cloud Messaging (FCM)** to send push notifications to clients when a new product is added.

### Backend Setup

1. **Generate Service Account Key**:
   - In [Firebase Console](https://console.firebase.google.com/), go to **Project Settings > Service Accounts**.
   - Click **Generate new private key** and download the `service-account.json` file.
   - **Important**: Do **not** commit `service-account.json` to GitHub. Add it to `.gitignore`:
     ```
     config/service-account.json
     ```

2. **Configure Environment Variables**:
   - Add the following to your `.env` or `firebase.env` file (values from `service-account.json`):
     ```
     FIREBASE_TYPE=service_account
     FIREBASE_PROJECT_ID=your-project-id
     FIREBASE_PRIVATE_KEY_ID=your-private-key-id
     FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
     FIREBASE_CLIENT_EMAIL=your-client-email
     FIREBASE_CLIENT_ID=your-client-id
     FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
     FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
     FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
     FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-client-email
     FIREBASE_UNIVERSE_DOMAIN=googleapis.com
     ```
   - Ensure `src/presentation/config/firebase.ts` uses these variables for Firebase initialization.
3. **Test Notifications**:
   - Create a new product via `/api/user/product` using Postman.
   - Check server logs for confirmation (e.g., "Notification sent successfully").
   - Ensure clients are subscribed to the `new_product` topic.

## 🔐 Security Notes

- **JWT Tokens**: Expire after 1 hour. Refresh by logging in again.
- **Password Hashing**: Uses bcrypt for secure storage.
- **Input Validation**: Joi ensures robust data validation.
- **Resource Ownership**: Middleware prevents unauthorized product modifications.
- **CORS**: Configured for development; restrict origins in production.
- **Supabase Security**: Supabase provides row-level security and SSL for PostgreSQL connections.
- **Firebase Security**: Firebase credentials are stored in environment variables to prevent exposure.

## 📌 Project Status

This is my **second training backend project**, actively maintained to practice real-world backend development. Recent updates include:

- Integrated **Firebase Cloud Messaging** to send push
- Integrated **PostgreSQL** via **Supabase** for scalable relational database management.
- Added **user profile endpoints** (`/api/user/me`) for managing user information.
- Continuously improving with new features, security enhancements, and performance optimizations.

I’m regularly pushing updates to GitHub as I experiment with new techniques, like debugging wishlist deletion issues or integrating Supabase. Follow along for my latest progress, and feel free to share feedback or ideas!

## 📈 Future Improvements

- Implement **refresh tokens** for extended sessions.
- Support **multilingual responses** (e.g., Arabic).
- Integrate **payment gateways** (e.g., Stripe).
- Introduce **Jest** for unit and integration testing.
- Add **real-time features** using WebSockets (e.g., order updates).

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
