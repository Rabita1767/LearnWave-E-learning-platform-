"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const databaseConnection = async (callback) => {
    try {
        if (process.env.DATABASE_URL) {
            const exist = await mongoose_1.default.connect(process.env.DATABASE_URL);
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
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = databaseConnection;
//# sourceMappingURL=database.js.map