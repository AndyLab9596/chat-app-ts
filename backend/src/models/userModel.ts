import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface IUserSchema {
    name: string;
    email: string;
    password: string;
    pic: string;
    isAdmin: boolean;
}

const UserSchema = new mongoose.Schema<IUserSchema>({
    name: { type: String, required: true },
    email: {
        type: String, required: true, unique: true, validate: {
            validator: validator.isEmail,
            message: 'Please provide proper email',
        }
    },
    password: { type: String, required: true },
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


const User = mongoose.model('User', UserSchema);

export default User;