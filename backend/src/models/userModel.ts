import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose, { Types } from "mongoose";
import validator from 'validator';

interface IUserSchema {
    name: string;
    email: string;
    password: string;
    pic: string;
    isAdmin: boolean;
    _id: Types.ObjectId;
    createJWT: () => string;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUserSchema>({
    name: { type: String, required: true },
    email: {
        type: String, required: true, unique: true, validate: {
            validator: validator.isEmail,
            message: 'Please provide proper email',
        }
    },
    password: { type: String, required: true, select: false },
    pic: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_LIFETIME })
}

UserSchema.methods.comparePassword = async function (candidatePassword: typeof this.password) {
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model('User', UserSchema);

export default User;