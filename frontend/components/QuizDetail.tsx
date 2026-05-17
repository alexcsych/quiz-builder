import { FullQuiz } from "@/services/quiz.service";
import { QuizViewQuestionItem } from "@/components/QuizViewQuestionItem";

interface QuizDetailProps {
  quiz: FullQuiz;
}

export function QuizDetail ({ quiz }: QuizDetailProps) {
  return (
    <div className='space-y-8'>
      <div className='space-y-2 border-b pb-6'>
        <h1 className='text-4xl font-bold tracking-tight text-foreground'>
          {quiz.title}
        </h1>
        {quiz.description ? (
          <p className='text-muted-foreground text-lg'>{quiz.description}</p>
        ) : (
          <p className='text-muted-foreground text-sm italic'>
            No description provided for this quiz.
          </p>
        )}
      </div>

      <div className='space-y-6'>
        {quiz.questions.map((question, index) => (
          <QuizViewQuestionItem
            key={question.id || index}
            question={question}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
