//Module imports
import mongoose from "mongoose";
//File imports
import { config } from "./config.js";
import customLogger from "../utils/logger.js";

export const connectDB = async () => {

    try {

        await mongoose.connect(config.mongo.url);
        
        customLogger.info(`${new Date().toLocaleDateString()}: Connected to MongoDB`);

    } catch (error) {

        customLogger.error(`${new Date().toLocaleDateString()}: ${error.message}`);

    };

};