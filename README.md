🛍️ E-commerce Backend with Wishlist - Clean Architecture
A scalable and maintainable e-commerce backend system built with Node.js , TypeScript , MongoDB , and Express , following Clean Architecture principles . Includes full authentication, role-based access control, and a Wishlist management system .
_____________________________________________________________________________________________________________
✨ Features
🔐 User Authentication
JWT-based signup/login/logout
Email verification & password reset
👥 Role-Based Access Control
SuperAdmin: Full system access
Admin: Manage own products/categories
Customer: Shop products
🛒 Product Management
Create, update, delete, and search products
Category filtering + pagination
📁 Category Management
🧪 Validation & Security
Middleware-based input validation
UUID for secure resource IDs
📋 Wishlist System
GET /wishlist - View user wishlist
POST /wishlist/add-product - Add product with validation
POST /wishlist/remove-product - Remove product
POST /wishlist/delete - Clear wishlist
All operations require JWT authentication
_____________________________________________________________________________________________________________

🧪 Technologies Used

Node.js

TypeScript

Express.js

MongoDB + Mongoose

JWT for authentication

UUID for ID generation

Express middlewares for validation & authorization
_____________________________________________________________________________________________________________

🚀 Quick Start

 1-Clone the repo:
   git clone https://github.com/laith-alskaf/ecommerce-backend-clean-architecture.git

 2-Create .env file from .env.example

 3-Install dependencies:
   npm install

 4-Start development server:
   npm run dev
_____________________________________________________________________________________________________________

📦 API Testing
📥 Download Postman Collection :
Postman Collection Link
         (https://drive.google.com/file/d/1JNkTssjmVN8ZnWf0rRUmUn9c5Vkzb0kP/view?usp=drive_link)

Includes:

 -Auth flows (signup, login, verify email)
 -Product CRUD operations
 -Wishlist operations
 -Role-based access tests
_____________________________________________________________________________________________________________

📌 Project Status
This is my second training backend project . I'm actively improving it at home to practice real-world backend development. Updates are pushed regularly as I learn new patterns and best practices.
_____________________________________________________________________________________________________________

💬 Contributions & Feedback
Contributions are welcome!
Feel free to:

 -Open issues for bugs or suggestions
 -Submit pull requests for improvements
 -Share your feedback on architecture decisions
 _____________________________________________________________________________________________________________

🎯 Why This Project?
-✅ Great example of Clean Architecture in practice
-🎓 Perfect for developers learning:
      -TypeScript in backend projects
      -Authentication systems
      -Role-based access control
      -RESTful API design