import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import quizRoutes from "./routes/quiz.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT ?? "5000";

app.use(cors());
app.use(express.json());
app.use("/api", quizRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Quiz Builder API" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
