import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";
import User from "../models/userModel";

const register = async (req: Request, res: Response) => {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) throw new BadRequestError('Please provide all values!');

    const isUserExist = await User.findOne({ email });
    if (isUserExist) throw new BadRequestError('Email is already existed');

    const user = await User.create({ email, password, name, pic });
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token,
    })
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequestError('Please provide all values!');
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new UnauthenticatedError('Invalid credential');
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new BadRequestError('Invalid credential')
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token,
    })
};

export {
    register,
    login,
}