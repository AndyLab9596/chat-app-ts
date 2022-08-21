import mongoose, { Types } from "mongoose";

interface IChatSchema {
    chatName: string;
    isGroupChat: boolean;
    users: Types.ObjectId[];
    latestMessage: Types.ObjectId;
    groupAdmin: Types.ObjectId;
};

const ChatSchema = new mongoose.Schema<IChatSchema>({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;