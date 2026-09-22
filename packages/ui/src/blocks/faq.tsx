"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../accordion.js";
import { BlockShell, type BlockProps } from "./shared.js";
export type FaqProps = BlockProps & {
  items: { id: string; question: string; answer: string }[];
};
export function Faq({ items, ...props }: FaqProps) {
  return (
    <BlockShell {...props}>
      <Accordion type="single" collapsible>
        {items.map((i) => (
          <AccordionItem key={i.id} value={i.id}>
            <AccordionTrigger>{i.question}</AccordionTrigger>
            <AccordionContent>{i.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </BlockShell>
  );
}
