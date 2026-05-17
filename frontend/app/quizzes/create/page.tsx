import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { QuizForm } from "@/components/QuizForm";

export default function CreateQuizPage () {
  return (
    <div className='container mx-auto p-8 max-w-3xl space-y-6'>
      <Link
        href='/quizzes'
        className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
      >
        <ArrowLeft className='size-4' /> Back to Quizzes
      </Link>

      <div className='space-y-1'>
        <h1 className='text-3xl font-bold tracking-tight'>Create a New Quiz</h1>
        <p className='text-muted-foreground text-sm'>
          Design your custom quiz with flexible question types.
        </p>
      </div>

      <QuizForm />
    </div>
  );
}
