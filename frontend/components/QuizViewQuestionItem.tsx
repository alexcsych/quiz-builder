import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { QuizQuestion } from "@/services/quiz.service";

interface QuizViewQuestionItemProps {
  question: QuizQuestion;
  index: number;
}

export function QuizViewQuestionItem ({
  question,
  index,
}: QuizViewQuestionItemProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription className='text-xs uppercase tracking-wider font-semibold text-primary'>
          Question {index + 1} — {question.type}
        </CardDescription>
        <CardTitle className='text-xl mt-1'>{question.text}</CardTitle>
      </CardHeader>

      <CardContent>
        {question.type === "INPUT" && (
          <Input
            placeholder='Short text answer placeholder...'
            className='max-w-md bg-muted/20'
            disabled
          />
        )}

        {question.type === "BOOLEAN" && (
          <div className='flex gap-6'>
            {question.options.map(opt => (
              <label
                key={opt.id}
                className='flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-not-allowed'
              >
                <input
                  type='radio'
                  name={`view-bool-${question.id}`}
                  className='size-4 text-primary opacity-60'
                  disabled
                  defaultChecked={opt.isCorrect}
                />
                <span
                  className={
                    opt.isCorrect ? "text-foreground font-semibold" : ""
                  }
                >
                  {opt.text}
                </span>
              </label>
            ))}
          </div>
        )}

        {question.type === "CHECKBOX" && (
          <div className='space-y-3'>
            {question.options.map(opt => (
              <div key={opt.id} className='flex items-center gap-3'>
                <Checkbox id={opt.id} disabled defaultChecked={opt.isCorrect} />
                <label
                  htmlFor={opt.id}
                  className={`text-sm font-medium leading-none cursor-not-allowed ${
                    opt.isCorrect
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {opt.text}
                </label>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
