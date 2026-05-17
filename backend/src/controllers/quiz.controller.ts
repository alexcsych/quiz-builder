import { Request, Response } from "express";
import prisma from "../../prisma/prisma.js";
import { Quiz } from "../../prisma/generated/client.js";

export const createQuiz = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title, description, questions } = req.body;

    const newQuiz = await prisma.quiz.create({
      data: {
        title,
        description,
        questions: {
          create: questions.map((q: any) => ({
            text: q.text,
            type: q.type,
            options: q.options
              ? {
                  create: q.options.map((opt: any) => ({
                    text: opt.text,
                    isCorrect: opt.isCorrect ?? false,
                  })),
                }
              : undefined,
          })),
        },
      },
      include: {
        questions: {
          include: { options: true },
        },
      },
    });

    res.status(201).json(newQuiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    res
      .status(500)
      .json({ error: "Internal server error while creating quiz" });
  }
};

export const getAllQuizzes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const quizzes = await prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        _count: {
          select: { questions: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const result = quizzes.map(
      (quiz: Quiz & { _count: { questions: number } }) => ({
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        createdAt: quiz.createdAt,
        questionsCount: quiz._count.questions,
      }),
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getQuizById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };

    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: { options: true },
        },
      },
    });

    if (!quiz) {
      res.status(404).json({ error: "Quiz not found" });
      return;
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error fetching quiz by id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteQuiz = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };

    const exist = await prisma.quiz.findUnique({ where: { id } });
    if (!exist) {
      res.status(404).json({ error: "Quiz not found" });
      return;
    }

    await prisma.quiz.delete({ where: { id } });

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
