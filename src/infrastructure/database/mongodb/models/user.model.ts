import mongoose, { Schema, Model, Document } from "mongoose";
import { IUser } from "../../../../domain/entity/user";
import { object } from "joi";
// import { v4 as uuidv4 } from "uuid";

type UserDocument = IUser & Document;

const userSchema = new Schema<UserDocument>({
    _id: { type: String, default: () => crypto.randomUUID(), ref: 'Wishlist' },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['customer', 'admin', 'superAdmin'],
        default: 'customer',
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    otpCode: { type: String, default: "" },
    otpCodeExpires: { type: Date, },
}, { timestamps: true },);

export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('Users', userSchema);