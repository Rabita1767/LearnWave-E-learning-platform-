import express from "express";
import assignmentController from "../controllers/assignmentController";
import auth from "../middlewares/auth";
import validate from "../middlewares/express_validator";
const routes = express();
routes.post("/submitAssignment", auth.auth, auth.isStudent, validate.submitAssignment, assignmentController.submitAssignment);
routes.get("/getAllSubmittedAssignment", auth.auth, auth.isInstructor, validate.getAllSubmittedAssignment, assignmentController.getAllSubmittedAssignment);
routes.get("/getOneAssignment", auth.auth, validate.getOneAssignment, assignmentController.getOneAssignment);
routes.post("/checkAssignment", auth.auth, auth.isInstructor, assignmentController.checkAssignment);
routes.get("/getAssignmentScore", auth.auth, auth.isStudent, validate.checkAssignment, auth.findStudent, assignmentController.getAssignmentScore);
routes.post("/deleteAssignment", auth.auth, auth.isInstructor, assignmentController.deleteAssignment);
routes.patch("/editAssignment", auth.auth, auth.isInstructor, assignmentController.editAssignment);
routes.post("/getAllAssignment", auth.auth, auth.isInstructor, assignmentController.getAllAssignment);
export default routes;

