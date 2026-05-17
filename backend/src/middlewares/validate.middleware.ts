import { Request, Response, NextFunction } from "express";

export const validateQuiz = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { title, questions } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    res
      .status(400)
      .json({ error: "Title is required and must be a non-empty string" });
    return;
  }

  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    res
      .status(400)
      .json({ error: "Questions array is required and cannot be empty" });
    return;
  }

  for (const [index, q] of questions.entries()) {
    if (!q.text || typeof q.text !== "string" || q.text.trim() === "") {
      res
        .status(400)
        .json({ error: `Question at index ${index} must have text` });
      return;
    }

    const validTypes = ["BOOLEAN", "INPUT", "CHECKBOX"];
    if (!q.type || !validTypes.includes(q.type)) {
      res.status(400).json({
        error: `Question at index ${index} has invalid type. Allowed types: ${validTypes.join(
          ", ",
        )}`,
      });
      return;
    }

    if (q.type === "BOOLEAN" || q.type === "CHECKBOX") {
      if (!q.options || !Array.isArray(q.options) || q.options.length === 0) {
        res.status(400).json({
          error: `Question of type ${q.type} at index ${index} must have options`,
        });
        return;
      }
    }
  }

  next();
};
