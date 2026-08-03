import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()



const db = async () => {
    try {
        await mongoose.connect(process.env.DATABASEURL);
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
}


export default db;