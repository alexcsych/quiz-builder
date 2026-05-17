"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { quizService, FullQuiz } from "@/services/quiz.service";
import { QuizDetail } from "@/components/QuizDetail";

interface QuizPageProps {
  params: Promise<{ id: string }>;
}

export default function QuizPage ({ params }: QuizPageProps) {
  const { id } = use(params);

  const [quiz, setQuiz] = useState<FullQuiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    quizService
      .getById(id)
      .then(setQuiz)
      .catch((err: any) => setError(err.message || "Failed to load quiz"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className='container mx-auto p-8 max-w-3xl space-y-6'>
      <Link
        href='/quizzes'
        className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
      >
        <ArrowLeft className='size-4' /> Back to Quizzes
      </Link>

      {loading && (
        <div className='flex flex-col items-center justify-center pt-20 gap-2'>
          <Loader2 className='size-8 animate-spin text-primary' />
          <p className='text-sm text-muted-foreground'>
            Loading quiz structure...
          </p>
        </div>
      )}

      {error && (
        <div className='border border-destructive/20 bg-destructive/5 rounded-xl p-6 text-center space-y-2'>
          <p className='text-sm font-medium text-destructive'>{error}</p>
          <Link
            href='/quizzes'
            className='text-xs text-primary hover:underline block'
          >
            Return to dashboard
          </Link>
        </div>
      )}

      {!loading && !error && quiz && <QuizDetail quiz={quiz} />}
    </div>
  );
}
