//Module imports
import mongoose from "mongoose";
//File imports
import { config } from "./config.js";

export const connectDB = async () => {

    try {

        await mongoose.connect(config.mongo.url);
        
        console.log("MongoDB Connected");

    } catch (error) {

        console.log(error.message);

    };

};