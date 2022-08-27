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
};

const fetchChats = async (req: Request, res: Response) => {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate('users')
        .populate('groupAdmin')
        .populate('latestMessage')
        .sort({ updatedAt: -1 })
        .then(async (results) => {
            const chat = await User.populate(results, {
                path: "latestMessage.sender",
                select: 'name pic email'
            })

            res.status(StatusCodes.OK).send(chat)
        });
};

const createGroupChat = async (req: Request, res: Response) => {
    if (!req.body.users || !req.body.name) {
        throw new BadRequestError('Please fill all the fields')
    }

    let users = JSON.parse(req.body.users);

    if (users.length < 2) {
        throw new BadRequestError('More than 2 users are required to form a group chat');
    }

    users.push(req.user);

    const groupChat = await Chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
    })
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("users")
        .populate("groupAdmin");

    res.status(StatusCodes.CREATED).json(fullGroupChat);
};

const renameGroup = async (req: Request, res: Response) => {
    const { chatId, chatName } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new: true,
        }
    )
        .populate("users")
        .populate("groupAdmin");
    if (!updatedChat) throw new BadRequestError('Something went wrong');
    res.status(StatusCodes.OK).json(updatedChat);
}

const addToGroup = async (req: Request, res: Response) => {
    const { chatId, userId } = req.body;

    // const isUserAlreadyInGroupChat = await Chat.find({
    //     chatId,
    //     isGroupChat: true,
    //     $and: [
    //         { users: { $elemMatch: { $eq: req.user._id } } },
    //         { users: { $elemMatch: { $eq: userId } } },
    //     ],
    // })

    // if (isUserAlreadyInGroupChat.length === 0) {
    //     const groupChat = await Chat.findByIdAndUpdate(
    //         chatId,
    //     )
    //         .populate("users")
    //         .populate("groupAdmin");
    //     if (!groupChat) throw new BadRequestError('Something went wrong');
    //     res.status(StatusCodes.OK).json(groupChat);
    // } else {
    //     const added = await Chat.findByIdAndUpdate(
    //         chatId,
    //         {
    //             $push: { users: userId },

    //         },
    //         { new: true }
    //     )
    //         .populate("users")
    //         .populate("groupAdmin");
    //     if (!added) throw new BadRequestError('Something went wrong');
    //     res.status(StatusCodes.CREATED).json(added);
    // }

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },

        },
        { new: true }
    )
        .populate("users")
        .populate("groupAdmin");
    if (!added) throw new BadRequestError('Something went wrong');
    res.status(StatusCodes.CREATED).json(added);
}

const removeFromGroup = async (req: Request, res: Response) => {
    const { chatId, userId } = req.body;

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },

        },
        { new: true }
    )
        .populate("users")
        .populate("groupAdmin");
    if (!removed) throw new BadRequestError('Something went wrong');
    res.status(StatusCodes.OK).json(removed);
}

export {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup
}