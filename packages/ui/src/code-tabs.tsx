"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs.js";
import { CodeBlock } from "./code-block.js";
import { AnimatedSize } from "./animated-size.js";
export type CodeTab = {
  value: string;
  label: string;
  code: string;
  language?: string;
};
export function CodeTabs({
  tabs,
  label = "코드 언어",
  defaultValue,
}: {
  tabs: CodeTab[];
  label?: string;
  defaultValue?: string;
}) {
  return (
    <Tabs defaultValue={defaultValue ?? tabs[0]?.value} className="n-code-tabs">
      <TabsList aria-label={label}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <AnimatedSize>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <CodeBlock
              code={tab.code}
              language={tab.language}
              filename={tab.label}
            />
          </TabsContent>
        ))}
      </AnimatedSize>
    </Tabs>
  );
}
