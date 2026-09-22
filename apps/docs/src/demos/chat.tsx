"use client";
import { useDemoReady } from "@/lib/use-demo-ready";
import { useState } from "react";
import { Attachment } from "@9to6/ui/attachment";
import { Bubble } from "@9to6/ui/bubble";
import { Message, MessageContent, MessageActions } from "@9to6/ui/message";
import { MessageScroller } from "@9to6/ui/message-scroller";
import { Questionnaire } from "@9to6/ui/questionnaire";
import { Button } from "@9to6/ui/button";
export function ChatDemo({ name }: { name: string }) {
  useDemoReady(name);
  const [count, setCount] = useState(8);
  const [answer, setAnswer] = useState("");
  switch (name) {
    case "attachment":
      return (
        <Attachment
          name="NINE UI 시작 가이드"
          size="설치 및 사용 방법"
          href="/getting-started/"
        />
      );
    case "bubble":
      return (
        <div className="demo-stack">
          <Bubble from="user">나만의 인터페이스를 만들고 싶어요.</Bubble>
          <Bubble>작은 컴포넌트부터 함께 시작해 볼까요?</Bubble>
        </div>
      );
    case "message":
      return (
        <div>
          <Message from="user">
            <MessageContent>
              <Bubble from="user">어떤 컴포넌트가 있나요?</Bubble>
            </MessageContent>
          </Message>
          <Message>
            <MessageContent>
              기본 입력부터 복잡한 데이터 화면까지, 필요에 맞춰 조합할 수
              있습니다.
            </MessageContent>
            <MessageActions>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setAnswer("피드백을 반영했습니다.")}
              >
                도움이 되었어요
              </Button>
            </MessageActions>
          </Message>
          <span role="status" className="demo-note">
            {answer}
          </span>
        </div>
      );
    case "message-scroller":
      return (
        <div className="demo-stack">
          <MessageScroller>
            {Array.from({ length: count }, (_, i) => (
              <Message key={i} from={i % 2 ? "assistant" : "user"}>
                <MessageContent>
                  <Bubble from={i % 2 ? "assistant" : "user"}>
                    {i + 1}.{" "}
                    {i % 2
                      ? "좋은 아이디어네요. 다음 단계를 준비해 볼게요."
                      : "새로운 디자인을 함께 만들어 봅시다."}
                  </Bubble>
                </MessageContent>
              </Message>
            ))}
          </MessageScroller>
          <Button variant="outline" onClick={() => setCount((c) => c + 1)}>
            메시지 추가
          </Button>
        </div>
      );
    case "questionnaire":
      return (
        <div className="demo-stack">
          <Questionnaire
            questions={[
              { id: "name", label: "이름", type: "text", required: true },
              { id: "email", label: "이메일", type: "email", required: true },
              {
                id: "role",
                label: "주로 하는 일",
                type: "select",
                required: true,
                options: [
                  { value: "design", label: "디자인" },
                  { value: "engineering", label: "개발" },
                  { value: "both", label: "디자인과 개발" },
                ],
              },
            ]}
            onSubmit={async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 800));
              setAnswer(`${values.name}님, 데모 응답이 제출되었습니다.`);
            }}
          />
          <p role="status" className="demo-note">
            {answer || "데모 입력은 외부로 전송하지 않습니다."}
          </p>
        </div>
      );
    default:
      return null;
  }
}
