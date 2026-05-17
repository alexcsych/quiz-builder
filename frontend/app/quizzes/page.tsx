import { QuizList } from "@/components/QuizList";

export default function QuizListPage () {
  return (
    <div className='container mx-auto p-8 max-w-6xl'>
      <div className='flex flex-col gap-2 mb-8'>
        <h1 className='text-3xl font-bold tracking-tight'>My Quizzes</h1>
        <p className='text-muted-foreground text-sm'>
          Manage your existing quizzes or build a new one.
        </p>
      </div>

      <QuizList />
    </div>
  );
}
