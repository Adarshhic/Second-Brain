import mongoose, { model, Schema, Document } from "mongoose";
import { config } from "./config";
require('dotenv').config();

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};


interface IUser extends Document {
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

interface IContent extends Document {
    title: string;
    link: string;
    type: string;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ILink extends Document {
    hash: string;
    userId: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
    username:  { type: String, unique: true },
    password:  { type: String },
    firstName: { type: String },
    lastName:  { type: String },
});

export const UserModel = model<IUser>("User", UserSchema);

const ContentSchema = new Schema<IContent>({
    title:  String,
    link:   String,
    type:   String,
    tags:   [{ type: mongoose.Types.ObjectId, ref: "tag" }],
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true }); 

export const ContentModel = model<IContent>("Content", ContentSchema);

const LinkSchema = new Schema<ILink>({
    hash:   String,
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true },
});

export const LinkModel = model<ILink>("Links", LinkSchema);