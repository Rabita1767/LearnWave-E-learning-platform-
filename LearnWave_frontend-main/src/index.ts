import express from "express";
import databaseConnection from "./config/database";
import studentRoutes from "./routes/student";
import instructorRoutes from "./routes/instructor";
import adminRoutes from "./routes/admin";
import commonRoutes from "./routes/common";
import cartRoutes from "./routes/cart";
import assignmentRoutes from "./routes/assignment";
import wishlistRoutes from "./routes/wishlist";
import quizRoutes from "./routes/quiz";
import subscriptionRoutes from "./routes/subscription";
import reviewRoutes from "./routes/review";
const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use("/student", studentRoutes);
app.use("/instructor", instructorRoutes);
app.use("/admin", adminRoutes);
app.use("/cart", cartRoutes);
app.use("/assignment", assignmentRoutes);
app.use("/quiz", quizRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/common", commonRoutes);
app.use("/subscription", subscriptionRoutes);
app.use("/review", reviewRoutes);
databaseConnection(() => {
    app.listen(8000, () => {
        console.log(`Server is running on port ${8000}`)
    })
})
