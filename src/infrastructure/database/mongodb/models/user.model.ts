import mongoose, { Schema, Model, Document } from "mongoose"; 
import { IUser } from "../../../../domain/entity/user";
// import { v4 as uuidv4 } from "uuid";

type UserDocument = IUser & Document;

const userSchema = new Schema<UserDocument>({
    _id: { type: String, default: () => crypto.randomUUID() },
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

// userSchema.set('toJSON', {
//     transform: (_, ret) => {
//         delete ret._id;
//         delete ret.__v;
//         delete ret.otpCode;
//         delete ret.isEmailVerified;
//         delete ret.otpCodeExpires;
//         delete ret.lastLogin;
//         delete ret.password;
//     }
// });
export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('Users', userSchema);