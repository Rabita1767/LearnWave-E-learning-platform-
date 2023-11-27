"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const student_1 = __importDefault(require("./routes/student"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/student", student_1.default);
(0, database_1.default)(() => {
    app.listen(8000, () => {
        console.log(`Server is running on port ${8000}`);
    });
});
//# sourceMappingURL=index.js.map