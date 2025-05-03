ecommerce-backend-clean-architecture
🛍️ A simple and scalable E-commerce backend system built with Node.js, TypeScript, MongoDB, and Express, following Clean Architecture principles.

✅ Features

User authentication with JWT (signup, login, logout)

Role-based access: superAdmin, admin, customer

Email verification and password reset

Product management (create, update, delete, get)

Category management

Ownership rules: Admins can only modify their own products/categories

Full input validation with middlewares

Clean code and scalable folder structure

📁 Architecture
The project is structured using Clean Architecture, separating concerns across routes, controllers, use-cases, interfaces, models, and middlewares.
This makes the code easy to scale, test, and maintain — similar to real-world enterprise apps.

🧪 Technologies Used

Node.js

TypeScript

Express.js

MongoDB + Mongoose

JWT for authentication

UUID for ID generation

Express middlewares for validation & authorization

Postman for API testing

📦 How to Use

Clone the repo

Create a .env file based on .env.example

Run npm install

Start development server with npm run dev

🧪 Postman Collection
You can test all the APIs using the Postman collection.
👉 Download the Postman Collection
   (https://drive.google.com/file/d/1JNkTssjmVN8ZnWf0rRUmUn9c5Vkzb0kP/view?usp=drive_link)

🛠️ Project Status

This is my second training backend project. I'm building it step by step at home to improve my skills and publish real projects on GitHub. The system is still evolving, and I push updates regularly.

🤝 Contributions and feedback are welcome!
