import Link from "next/link";
import { Trash2, HelpCircle, Calendar } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizItem } from "@/services/quiz.service";

interface QuizListItemProps {
  quiz: QuizItem & { createdAt?: string };
  onDelete: (id: string) => void;
}

export function QuizListItem ({ quiz, onDelete }: QuizListItemProps) {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm(`Are you sure you want to delete "${quiz.title}"?`)) {
      onDelete(quiz.id);
    }
  };

  const formattedDate = quiz.createdAt
    ? new Date(quiz.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Link href={`/quizzes/${quiz.id}`}>
      <Card className='h-52 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer relative group'>
        <CardHeader>
          <div className='flex justify-between items-start gap-4'>
            <CardTitle className='line-clamp-1 pr-6 text-xl'>
              {quiz.title}
            </CardTitle>

            <Button
              variant='ghost'
              size='icon'
              className='opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10 h-8 w-8 absolute top-4 right-4'
              onClick={handleDeleteClick}
            >
              <Trash2 className='size-4' />
            </Button>
          </div>

          <CardDescription className='line-clamp-2 mt-2 text-sm'>
            {quiz.description || "No description provided."}
          </CardDescription>
        </CardHeader>

        <CardFooter className='text-xs text-muted-foreground flex justify-between items-center border-t pt-3'>
          <div className='flex items-center gap-1 font-medium'>
            <HelpCircle className='size-3.5 text-primary' />
            {quiz.questionsCount}{" "}
            {quiz.questionsCount === 1 ? "question" : "questions"}
          </div>

          {formattedDate && (
            <div className='flex items-center gap-1 text-muted-foreground'>
              <Calendar className='size-3.5' />
              {formattedDate}
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
