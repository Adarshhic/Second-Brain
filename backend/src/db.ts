import mongoose, { model, Schema } from "mongoose";
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

const UserSchema = new Schema({
    username: { type: String, unique: true }, 
    password: { type: String }           
});


export const UserModel = model("User", UserSchema);


const ContentSchema = new Schema({
    title: String,                         
    link: String,  
    type: String,                      
    tags: [{ type: mongoose.Types.ObjectId, ref: "tag" }], 
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});


export const ContentModel = model("Content", ContentSchema);

const LinkSchema = new Schema({
    hash: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
});

export const LinkModel = model("Links", LinkSchema);