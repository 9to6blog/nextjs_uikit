"use client";
import { useId, useState } from "react";
import { Field, Input, Textarea } from "./input.js";
import { Button } from "./button.js";
export type Question = {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
  type: "text" | "email" | "textarea" | "select" | "radio";
  options?: { value: string; label: string }[];
};
export function Questionnaire({
  questions,
  onSubmit,
  submitLabel = "제출",
  disabled = false,
}: {
  questions: Question[];
  onSubmit: (values: Record<string, string>) => void | Promise<void>;
  submitLabel?: string;
  disabled?: boolean;
}) {
  const id = useId();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  return (
    <form
      className="n-questionnaire"
      onSubmit={async (event) => {
        event.preventDefault();
        const values = Object.fromEntries(
          new FormData(event.currentTarget).entries(),
        ) as Record<string, string>;
        setPending(true);
        setError("");
        try {
          await onSubmit(values);
        } catch {
          setError("제출하지 못했습니다. 다시 시도해 주세요.");
        } finally {
          setPending(false);
        }
      }}
    >
      {questions.map((q) => {
        const fieldId = `${id}-${q.id}`;
        const common = {
          id: fieldId,
          name: q.id,
          required: q.required,
          disabled: disabled || pending,
          "aria-describedby": q.description ? `${fieldId}-hint` : undefined,
        };
        return q.type === "radio" ? (
          <fieldset key={q.id} className="n-fieldset">
            <legend>{q.label}</legend>
            {q.options?.map((option) => (
              <label key={option.value} className="n-choice">
                <input
                  type="radio"
                  name={q.id}
                  value={option.value}
                  required={q.required}
                  disabled={disabled || pending}
                />
                {option.label}
              </label>
            ))}
          </fieldset>
        ) : (
          <Field
            key={q.id}
            htmlFor={fieldId}
            label={q.label}
            description={q.description}
            required={q.required}
          >
            {q.type === "textarea" ? (
              <Textarea {...common} />
            ) : q.type === "select" ? (
              <select {...common} className="n-native-select" defaultValue="">
                <option value="" disabled>
                  선택하세요
                </option>
                {q.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <Input {...common} type={q.type} />
            )}
          </Field>
        );
      })}
      {error && (
        <p role="alert" className="n-error">
          {error}
        </p>
      )}
      <Button type="submit" loading={pending} disabled={disabled}>
        {submitLabel}
      </Button>
    </form>
  );
}
