import { StatusCodes } from 'http-status-codes';
import { Response, Request } from "express";
import Chat from '../models/chatModel';
import User from "../models/userModel";
import { BadRequestError } from '../errors';

const accessChat = async (req: Request, res: Response) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }
    // find the one-on-one chat which belong to the logged user and the corresponding user.
    const isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    }).populate("users").populate("latestMessage")

    const latestChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name pic email'
    });

    if (latestChat.length > 0) {
        res.send(latestChat[0]);
    } else {
        const chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate('users');
            res.status(StatusCodes.CREATED).send(FullChat)
        } catch (error) {
            throw new BadRequestError('Something went wrong')
        }
    }
}

export {
    accessChat,
}