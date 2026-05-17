import Link from "next/link";
import { Plus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export function CreateQuizCard () {
  return (
    <Link href='/quizzes/create'>
      <Card className='h-52 flex flex-col justify-between border-dashed border-2 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer bg-muted/20 group'>
        <CardHeader>
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors'>
              <Plus className='size-5 text-muted-foreground group-hover:text-primary transition-colors' />
            </div>
            <CardTitle className='text-xl text-muted-foreground group-hover:text-primary transition-colors'>
              Create Quiz
            </CardTitle>
          </div>
          <CardDescription className='mt-2 text-sm text-muted-foreground/80'>
            Click here to build a new interactive quiz with dynamic question
            types.
          </CardDescription>
        </CardHeader>

        <CardFooter className='text-xs text-muted-foreground/60 flex items-center border-t pt-3 font-medium group-hover:text-primary/80 transition-colors'>
          Start building now
        </CardFooter>
      </Card>
    </Link>
  );
}
