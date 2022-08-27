import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import UnauthenticatedError from '../errors/custom-api-error';
import User, { IUserSchema } from '../models/userModel';

declare module "express" {
    interface Request {
        // user: {
        //     id: Types.ObjectId
        // }
        user: IUserSchema
    }
}

declare module "express-serve-static-core" {
    interface Request {
        // user: {
        //     id: Types.ObjectId
        // }
        user: IUserSchema
    }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader?.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication Invalid')
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET as string) as { id: Types.ObjectId };
        req.user = await User.findById(payload.id) as IUserSchema;

        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid')
    }

}

export default auth;