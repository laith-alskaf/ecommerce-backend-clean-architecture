import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
    DEV_MONGODB_URI: process.env.MONGODB_URI!,
    PORT: process.env.PORT || 8080,
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:8080",

    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,

    SALT_ROUNDS_BCRYPT: 10
};
