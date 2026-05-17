"use client";

import { useEffect, useState } from "react";
import { quizService, QuizItem } from "@/services/quiz.service";
import { CreateQuizCard } from "./CreateQuizCard";
import { QuizListItem } from "./QuizListItem";

export function QuizList () {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    quizService
      .getAll()
      .then(setQuizzes)
      .catch(err => console.error("Failed to load quizzes:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    const success = await quizService.delete(id);
    if (success) {
      setQuizzes(prev => prev.filter(quiz => quiz.id !== id));
    } else {
      alert("Could not delete the quiz. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='h-52 bg-muted rounded-xl' />
        ))}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      <CreateQuizCard />

      {quizzes.map(quiz => (
        <QuizListItem key={quiz.id} quiz={quiz} onDelete={handleDelete} />
      ))}
    </div>
  );
}
