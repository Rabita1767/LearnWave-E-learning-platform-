import express from "express";
import studentController from "../controllers/studentController";
import auth from "../middlewares/auth"
import validate from "../middlewares/express_validator";
import courseController from "../controllers/courseController";
const routes = express();
routes.post("/auth", validate.signUp, studentController.auth);
routes.post("/verifyMail", studentController.verifyMail);
routes.post("/login", validate.login, studentController.login);
routes.post("/viewSubscriptionNotification", auth.auth, auth.isStudent, studentController.viewSubscriptionNotification);
routes.post("/getAssignmentById", auth.auth, auth.isStudent, studentController.getAssignmentById);
export default routes;