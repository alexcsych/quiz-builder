import { Router } from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  deleteQuiz,
} from "../controllers/quiz.controller.js";
import { validateQuiz } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/quizzes", validateQuiz, createQuiz);

router.get("/quizzes", getAllQuizzes);
router.get("/quizzes/:id", getQuizById);
router.delete("/quizzes/:id", deleteQuiz);

export default router;
