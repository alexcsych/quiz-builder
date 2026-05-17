import { z } from "zod";

export const quizFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  questions: z
    .array(
      z.object({
        text: z.string().min(1, "Question text is required"),
        type: z.enum(["INPUT", "BOOLEAN", "CHECKBOX"]),
        options: z
          .array(
            z.object({
              text: z.string().min(1, "Option text cannot be empty"),
              isCorrect: z.boolean().default(false),
            }),
          )
          .default([]),
      }),
    )
    .min(1, "You must add at least one question"),
});

export type QuizFormValues = z.infer<typeof quizFormSchema>;
