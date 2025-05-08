import { Schema, model } from "mongoose"; // Erase if already required
import { IUser } from "../../../interfaces/user";
import { v4 as uuidv4 } from "uuid";


const userSchema = new Schema<IUser>({
    id: { type: String, default: () => uuidv4() },
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

userSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.otpCode;
        delete ret.isEmailVerified;
        delete ret.otpCodeExpires;
        delete ret.lastLogin;
        delete ret.password;
    }
});
export const UserModel = model<IUser>('Users', userSchema);