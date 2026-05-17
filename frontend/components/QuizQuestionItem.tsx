"use client";

import {
  Control,
  Controller,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldSet, FieldLabel } from "@/components/ui/field";
import { QuizFormValues } from "@/lib/schemas/quiz-form.schema";

type QuestionValue = QuizFormValues["questions"][number];
type OptionValue = QuestionValue["options"][number];

interface QuizQuestionItemProps {
  index: number;
  fieldId: string;
  control: Control<QuizFormValues>;
  errors: FieldErrors<QuizFormValues>;
  setValue: UseFormSetValue<QuizFormValues>;
  watchedQuestion: QuestionValue | undefined;
  showDelete: boolean;
  onRemove: () => void;
}

export function QuizQuestionItem ({
  index,
  fieldId,
  control,
  // errors,
  setValue,
  watchedQuestion,
  showDelete,
  onRemove,
}: QuizQuestionItemProps) {
  const currentType = watchedQuestion?.type;

  const handleTypeChange = (type: "INPUT" | "BOOLEAN" | "CHECKBOX") => {
    setValue(`questions.${index}.type`, type);

    if (type === "BOOLEAN") {
      setValue(`questions.${index}.options`, [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]);
    } else if (type === "CHECKBOX") {
      setValue(`questions.${index}.options`, [{ text: "", isCorrect: false }]);
    } else {
      setValue(`questions.${index}.options`, []);
    }
  };

  return (
    <Card key={fieldId} className='relative group/card'>
      {showDelete && (
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='absolute top-4 right-4 text-destructive hover:bg-destructive/10'
          onClick={onRemove}
        >
          <Trash2 className='size-4' />
        </Button>
      )}

      <CardHeader>
        <CardTitle className='text-lg font-semibold'>
          Question #{index + 1}
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        <FieldSet>
          <div className='flex gap-4 items-start'>
            <div className='flex-1'>
              <Controller
                name={`questions.${index}.text`}
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      placeholder='Type your question here...'
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Select value={currentType} onValueChange={handleTypeChange}>
              <SelectTrigger className='w-35'>
                <SelectValue placeholder='Type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='INPUT'>Input</SelectItem>
                <SelectItem value='BOOLEAN'>Boolean (T/F)</SelectItem>
                <SelectItem value='CHECKBOX'>Checkbox</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </FieldSet>

        {currentType === "BOOLEAN" && (
          <div className='flex gap-6 pt-2 pl-1'>
            {watchedQuestion?.options?.map(
              (opt: OptionValue, oIndex: number) => (
                <label
                  key={oIndex}
                  className='flex items-center gap-2 cursor-pointer text-sm font-medium'
                >
                  <input
                    type='radio'
                    name={`boolean-radio-${index}`}
                    checked={opt.isCorrect}
                    className='size-4 text-primary'
                    onChange={() => {
                      setValue(`questions.${index}.options`, [
                        { text: "True", isCorrect: oIndex === 0 },
                        { text: "False", isCorrect: oIndex === 1 },
                      ]);
                    }}
                  />
                  {opt.text}
                </label>
              ),
            )}
          </div>
        )}

        {currentType === "CHECKBOX" && (
          <div className='space-y-3 pt-2'>
            <FieldLabel>Answer Options (Check correct ones)</FieldLabel>
            {watchedQuestion?.options?.map((_: OptionValue, oIndex: number) => (
              <div key={oIndex} className='flex items-center gap-3'>
                <Controller
                  name={`questions.${index}.options.${oIndex}.isCorrect`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div className='flex-1'>
                  <Controller
                    name={`questions.${index}.options.${oIndex}.text`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className='relative'
                      >
                        <Input
                          placeholder={`Option #${oIndex + 1}`}
                          {...field}
                          className='pr-10'
                        />
                        {watchedQuestion.options.length > 1 && (
                          <button
                            type='button'
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive w-auto!'
                            onClick={() => {
                              const filtered = watchedQuestion.options.filter(
                                (_, i: number) => i !== oIndex,
                              );
                              setValue(`questions.${index}.options`, filtered);
                            }}
                          >
                            <Trash2 className='size-3.5' />
                          </button>
                        )}
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </div>
            ))}

            <Button
              type='button'
              variant='outline'
              size='sm'
              className='mt-1'
              onClick={() => {
                const currentOptions = watchedQuestion?.options || [];
                setValue(`questions.${index}.options`, [
                  ...currentOptions,
                  { text: "", isCorrect: false },
                ]);
              }}
            >
              <Plus className='size-3.5 mr-1' /> Add Option
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
