import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const databaseConnection = async (callback: () => void): Promise<void> => {
    try {
        if (process.env.DATABASE_URL) {
            const exist = await mongoose.connect(process.env.DATABASE_URL);
            if (exist) {
                console.log("successful");
                callback();
            }
            else {

                console.log("unsuccessful!");
            }
        }
        else {
            console.log("Unsuccessful!");
        }

    } catch (error) {
        console.log(error);
    }

}
export default databaseConnection;