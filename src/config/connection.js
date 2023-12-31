//Module imports
import mongoose from "mongoose";
//File imports
import { config } from "./config.js";
import customLogger from "../utils/logger.js";
import { loggerPrefix } from "../utils/logger.js";

const filename = 'connection.js';

export const connectDB = async () => {

    try {

        await mongoose.connect(config.mongo.url);
        
        customLogger.info(loggerPrefix(filename, `Connected to MongoDB`));

    } catch (error) {

        customLogger.error(loggerPrefix(filename, `${error.message}`));

    };

};