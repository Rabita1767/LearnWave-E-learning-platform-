import express from "express";
import auth from "../middlewares/auth";
import notificationController from "../controllers/notificationController";
import validate from "../middlewares/express_validator";
const routes = express();
routes.get("/getSubscriptionNotification", notificationController.getSubscriptionNotification);
export default routes;