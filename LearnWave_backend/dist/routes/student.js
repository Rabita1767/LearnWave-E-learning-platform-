"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = __importDefault(require("../controllers/studentController"));
const routes = (0, express_1.default)();
const studentController = new studentController_1.default;
routes.post("/auth", studentController.auth);
exports.default = routes;
//# sourceMappingURL=student.js.map