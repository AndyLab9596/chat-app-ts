import mongoose, { Types } from "mongoose";

interface IMessageSchema {
    sender: Types.ObjectId;
    content: string;
    chat: Types.ObjectId,
    readBy: Types.ObjectId[]
}

const MessageSchema = new mongoose.Schema<IMessageSchema>({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true })

const Message = mongoose.model('Message', MessageSchema);

export default Message;