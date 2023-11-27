import express from "express";
import cartController from "../controllers/cartController";
import auth from "../middlewares/auth";
import validate from "../middlewares/express_validator";
const routes = express();
routes.post("/addToCart", auth.auth, auth.isStudent, validate.addToCart, cartController.addToCart);
routes.post("/removeFromCart", auth.auth, auth.isStudent, validate.addToCart, cartController.removeFromCart);
routes.get("/viewCart", auth.auth, auth.isStudent, cartController.viewCart);
export default routes;