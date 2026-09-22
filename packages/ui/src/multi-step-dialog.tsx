"use client";
import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./dialog.js";
import { Button } from "./button.js";
import { AnimatedSize } from "./animated-size.js";
export type DialogStep = {
  id: string;
  title: string;
  description: string;
  content?: ReactNode;
  canContinue?: boolean;
};
export function MultiStepDialog({
  steps,
  trigger,
  onComplete,
  nextLabel = "계속",
  backLabel = "이전",
  completeLabel = "완료",
}: {
  steps: DialogStep[];
  trigger: ReactNode;
  onComplete?: () => void;
  nextLabel?: string;
  backLabel?: string;
  completeLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("forward");
  const step = steps[Math.min(index, steps.length - 1)];
  if (!step) return null;
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (value) setIndex(0);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="n-step-dialog"
        overlayClassName="n-step-overlay"
      >
        <AnimatedSize>
          <div key={step.id} className="n-step-body" data-direction={direction}>
            <DialogTitle>{step.title}</DialogTitle>
            <DialogDescription>{step.description}</DialogDescription>
            {step.content}
          </div>
        </AnimatedSize>
        <div className="n-step-footer">
          <Button
            size="sm"
            variant="outline"
            disabled={index === 0}
            onClick={() => {
              setDirection("back");
              setIndex((i) => i - 1);
            }}
          >
            {backLabel}
          </Button>
          <span className="n-sr-only" role="status">
            {index + 1} / {steps.length} 단계
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={step.canContinue === false}
            onClick={() => {
              if (index === steps.length - 1) {
                onComplete?.();
                setOpen(false);
              } else {
                setDirection("forward");
                setIndex((i) => i + 1);
              }
            }}
          >
            {index === steps.length - 1 ? completeLabel : nextLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
