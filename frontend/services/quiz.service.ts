const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface QuizItem {
  id: string;
  title: string;
  description?: string;
  questionsCount: number;
}

export interface QuizOption {
  id?: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id?: string;
  text: string;
  type: "BOOLEAN" | "INPUT" | "CHECKBOX";
  options: QuizOption[];
}

export interface FullQuiz {
  id?: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
}
export const quizService = {
  async getAll (): Promise<QuizItem[]> {
    const res = await fetch(`${API_BASE_URL}/quizzes`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch quizzes");
    return res.json();
  },

  async getById (id: string): Promise<FullQuiz> {
    const res = await fetch(`${API_BASE_URL}/quizzes/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      if (res.status === 404) throw new Error("Quiz not found");
      throw new Error("Failed to fetch quiz details");
    }
    return res.json();
  },

  async create (quizData: FullQuiz): Promise<FullQuiz> {
    const res = await fetch(`${API_BASE_URL}/quizzes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to create quiz");
    }
    return res.json();
  },

  async delete (id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE_URL}/quizzes/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  },
};
