🛒 E-Commerce Backend API (Training Project)
A backend system for an E-commerce platform, built using Node.js, TypeScript, MongoDB, and designed with Clean Architecture principles.

This is my second training project as I continue improving my backend development skills. The project is structured for scalability, role-based access, and maintainability, following real-world patterns used in professional systems.

🚀 Features
Authentication & Authorization

Signup, Login, Logout

Email verification (OTP)

Forgot & Change Password

JWT-based Auth

Roles: superAdmin, admin, customer

Role System

superAdmin: Full control over the system

admin: Can create, update, and delete their own products/categories

customer: Can view products and categories

Category Management

Create, update, delete, and retrieve categories

Only authorized roles can perform certain actions

Product Management

Admins can add/update/delete only their own products

Anyone can view products by category or ID

Secure Routes with middlewares and validations for each operation

🧪 API Testing
You can try out the API using the Postman collection below:
📩 Download Postman Collection (https://drive.google.com/file/d/1JNkTssjmVN8ZnWf0rRUmUn9c5Vkzb0kP/view?usp=drive_link)

📂 Tech Stack
Node.js + Express.js

TypeScript

MongoDB + Mongoose

JWT (authentication)

Clean Architecture

UUID for unique IDs

📌 Notes
This project is not yet complete. I am building it step by step and pushing updates regularly as I explore deeper backend concepts.
Feedback is always welcome!
