"use client";

import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { quizFormSchema, QuizFormValues } from "@/lib/schemas/quiz-form.schema";
import { quizService } from "@/services/quiz.service";
import { QuizQuestionItem } from "@/components/QuizQuestionItem";

export function QuizForm () {
  const router = useRouter();

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema) as any,
    defaultValues: {
      title: "",
      description: "",
      questions: [{ text: "", type: "INPUT", options: [] }],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = form;

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const watchedQuestions = useWatch({
    control,
    name: "questions",
  });

  const onSubmit = async (data: QuizFormValues) => {
    try {
      await quizService.create(data);
      router.push("/quizzes");
      router.refresh();
    } catch (err: any) {
      form.setError("root", { message: err.message || "Something went wrong" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <FieldGroup>
        <Card>
          <CardHeader>
            <CardTitle className='text-xl'>General Info</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldSet className='space-y-4'>
              <Controller
                name='title'
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='title'>Quiz Title</FieldLabel>
                    <Input
                      id='title'
                      placeholder='e.g., JavaScript Advanced Trivia'
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name='description'
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor='description'>
                      Description (Optional)
                    </FieldLabel>
                    <Input
                      id='description'
                      placeholder='Briefly describe what this test is about'
                      {...field}
                    />
                  </Field>
                )}
              />
            </FieldSet>
          </CardContent>
        </Card>

        <div className='space-y-4'>
          {questionFields.map((field, index) => (
            <QuizQuestionItem
              key={field.id}
              fieldId={field.id}
              index={index}
              control={control}
              errors={errors}
              setValue={setValue}
              watchedQuestion={watchedQuestions[index]}
              showDelete={questionFields.length > 1}
              onRemove={() => removeQuestion(index)}
            />
          ))}
        </div>

        {errors.questions?.root && (
          <p className='text-sm font-medium text-destructive text-center'>
            {errors.questions.root.message}
          </p>
        )}
        {errors.root && (
          <p className='text-sm font-medium text-destructive text-center'>
            {errors.root.message}
          </p>
        )}

        <div className='flex justify-between items-center pt-4 border-t'>
          <Button
            type='button'
            variant='outline'
            onClick={() =>
              appendQuestion({ text: "", type: "INPUT", options: [] })
            }
          >
            <Plus className='size-4 mr-2' /> Add Question
          </Button>

          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Quiz"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
