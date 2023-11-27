import express from "express";
import wishlistController from "../controllers/wishlistController";
import auth from "../middlewares/auth";
import validate from "../middlewares/express_validator";
const routes = express();
routes.post("/addToWishlist", auth.auth, auth.isStudent, wishlistController.addToWishlist);
routes.get("/viewWishlist", auth.auth, auth.isStudent, wishlistController.viewWishlist);
routes.delete("/removeFromWishlist", auth.auth, auth.isStudent, wishlistController.removeFromWishlist);
export default routes;