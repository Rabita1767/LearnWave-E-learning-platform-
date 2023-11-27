import express from "express";
import reviewController from "../controllers/reviewController";
import auth from "../middlewares/auth";
import validate from "../middlewares/express_validator";
const routes = express();
routes.post("/getAllReview", auth.auth, reviewController.getAllReview);
routes.post("/addReview", auth.auth, auth.isStudent, reviewController.addReview);
routes.patch("/updateReview", auth.auth, auth.isStudent, reviewController.updateReview);
routes.post("/deleteReview", auth.auth, auth.isStudent, reviewController.deleteReview);
export default routes;

