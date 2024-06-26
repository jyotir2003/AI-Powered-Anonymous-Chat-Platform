import mongoose, { Schema, Document } from "mongoose";
export interface Message extends Document {
    content: string;
    createdAt: Date;

}

const MessageSchema : Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifycode: string;
    verifycodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const UserSchema : Schema<User> = new Schema({
    username: {
        type: String,
        required: [true,"username is required"],
        trim: true,
        unique: true    
    },
    email: {
        type: String,
        required: [true,"email is required"],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please use a valid email address']
    },
    password: {
        type: String,
        required: [true,"password is required"]
    },
    verifycode: {
        type: String,
        required: [true,"verifycode is required"]
    },
    verifycodeExpiry: {
        type: Date,
        required: [true,"verifycodeExpiry is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: {
        type: [MessageSchema],
        default: []
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)
export default UserModel;





