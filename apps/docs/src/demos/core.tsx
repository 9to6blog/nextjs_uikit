"use client";
import { useDemoReady } from "@/lib/use-demo-ready";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Plus,
  Inbox,
  Download,
  FileText,
} from "lucide-react";
import { Button } from "@9to6/ui/button";
import { Badge } from "@9to6/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@9to6/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@9to6/ui/alert";
import { Avatar, AvatarFallback } from "@9to6/ui/avatar";
import { AspectRatio } from "@9to6/ui/aspect-ratio";
import { EmptyState } from "@9to6/ui/empty-state";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@9to6/ui/item";
import { ButtonGroup } from "@9to6/ui/button-group";
import { Kbd, KbdGroup } from "@9to6/ui/kbd";
import { Marker } from "@9to6/ui/marker";
import { Separator } from "@9to6/ui/separator";
import { Skeleton } from "@9to6/ui/skeleton";
import { Spinner } from "@9to6/ui/spinner";
import { Progress } from "@9to6/ui/progress";
import { Heading, Text, Code, Blockquote } from "@9to6/ui/typography";

export function CoreDemo({ name }: { name: string }) {
  useDemoReady(name);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(64);
  const [count, setCount] = useState(0);
  switch (name) {
    case "button":
      return (
        <div className="demo-stack">
          <div className="demo-row">
            <Button onClick={() => setCount((c) => c + 1)}>
              시작하기 <ArrowRight />
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">
              <Plus /> 새로 만들기
            </Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">삭제</Button>
          </div>
          <div className="demo-row">
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
            <Button
              loading={loading}
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 1400);
              }}
            >
              <Check /> 변경 사항 저장
            </Button>
            <Button size="icon" aria-label="다운로드">
              <Download />
            </Button>
          </div>
          <p role="status" className="demo-note">
            {count
              ? `${count}번 실행했습니다.`
              : "버튼을 눌러 상태와 모션을 확인하세요."}
          </p>
        </div>
      );
    case "badge":
      return (
        <div className="demo-row">
          <Badge>Draft</Badge>
          <Badge tone="accent">In progress</Badge>
          <Badge tone="success" dot>
            Published
          </Badge>
          <Badge tone="warning" dot>
            Needs review
          </Badge>
        </div>
      );
    case "button-group":
      return (
        <ButtonGroup aria-label="편집 작업">
          <Button variant="outline" onClick={() => setCount((c) => c + 1)}>
            저장 {count > 0 && `(${count})`}
          </Button>
          <Button variant="outline">복제</Button>
          <Button variant="outline">이동</Button>
        </ButtonGroup>
      );
    case "card":
      return (
        <Card className="demo-card">
          <CardHeader>
            <div className="demo-between">
              <CardTitle>좋은 아이디어의 시작</CardTitle>
              <Badge tone="accent">New</Badge>
            </div>
            <CardDescription>
              생각을 모으고, 다음 프로젝트를 만들어 보세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mini-art">
              <div />
              <div />
              <div />
              <span>N</span>
            </div>
          </CardContent>
          <CardFooter>
            <Avatar>
              <AvatarFallback>DH</AvatarFallback>
            </Avatar>
            <span className="demo-note">My workspace</span>
            <Button
              size="sm"
              className="push-right"
              style={{ minWidth: 90 }}
              aria-pressed={count > 0}
              onClick={() => setCount((c) => (c ? 0 : 1))}
            >
              <span aria-live="polite">{count > 0 ? "선택됨" : "열기"}</span>
              {count > 0 ? <Check /> : <ArrowRight />}
            </Button>
          </CardFooter>
        </Card>
      );
    case "alert":
      return (
        <div className="demo-stack">
          <Alert>
            <AlertTitle>모든 변경 사항이 저장되었습니다.</AlertTitle>
            <AlertDescription>
              언제든 이전 버전으로 돌아갈 수 있습니다.
            </AlertDescription>
          </Alert>
          <Alert role="alert">
            <AlertTitle>연결을 확인해 주세요.</AlertTitle>
            <AlertDescription>
              작성 중인 내용은 이 화면에 유지됩니다.
            </AlertDescription>
          </Alert>
        </div>
      );
    case "avatar":
      return (
        <div className="demo-row">
          <Avatar>
            <AvatarFallback>DH</AvatarFallback>
          </Avatar>
          <Avatar style={{ width: 56, height: 56 }}>
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
          <Avatar style={{ width: 72, height: 72 }}>
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
        </div>
      );
    case "aspect-ratio":
      return (
        <div style={{ width: 420, maxWidth: "100%" }}>
          <AspectRatio ratio={16 / 9}>
            <div className="ratio-art">
              <span>16 : 9</span>
            </div>
          </AspectRatio>
        </div>
      );
    case "empty":
      return (
        <EmptyState
          icon={<Inbox />}
          title={
            count ? "첫 프로젝트를 추가했습니다" : "새로운 시작을 위한 공간"
          }
          description="프로젝트를 추가하면 이곳에서 함께 관리할 수 있습니다."
          action={
            <Button onClick={() => setCount((c) => c + 1)}>
              <Plus /> 프로젝트 추가
            </Button>
          }
        />
      );
    case "item":
      return (
        <Item>
          <ItemMedia>
            <FileText size={24} />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>디자인 시스템 가이드</ItemTitle>
            <ItemDescription>팀이 함께 만드는 일관된 경험</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCount((c) => c + 1)}
            >
              {count ? "선택됨" : "선택"}
            </Button>
          </ItemActions>
        </Item>
      );
    case "kbd":
      return (
        <div className="demo-row">
          <span className="demo-note">빠른 검색</span>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
          <Kbd>Esc</Kbd>
          <Kbd>↵</Kbd>
        </div>
      );
    case "marker":
      return (
        <Text>
          좋은 인터페이스는 <Marker>작은 디테일</Marker>에서 시작됩니다.
        </Text>
      );
    case "separator":
      return (
        <div className="demo-stack">
          <span>프로젝트</span>
          <Separator />
          <div className="demo-row">
            <span>Design</span>
            <Separator orientation="vertical" />
            <span>Engineering</span>
          </div>
        </div>
      );
    case "skeleton":
      return (
        <div
          className="demo-stack"
          role="status"
          aria-label="프로필을 불러오는 중"
        >
          <div className="demo-row">
            <Skeleton style={{ width: 44, height: 44, borderRadius: "50%" }} />
            <div className="demo-stack" style={{ gap: 8 }}>
              <Skeleton style={{ width: 150, height: 12 }} />
              <Skeleton style={{ width: 90, height: 10 }} />
            </div>
          </div>
          <Skeleton
            style={{
              width: 280,
              maxWidth: "100%",
              height: 120,
              borderRadius: 12,
            }}
          />
        </div>
      );
    case "spinner":
      return (
        <div className="demo-row">
          <Spinner />
          <span className="demo-note">잠시만 기다려 주세요.</span>
        </div>
      );
    case "progress":
      return (
        <div className="demo-stack">
          <div className="demo-between">
            <span className="demo-note">업로드</span>
            <span className="demo-note">{progress}%</span>
          </div>
          <Progress value={progress} label="업로드 진행률" />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setProgress((p) => (p >= 100 ? 0 : p + 12))}
          >
            진행률 변경
          </Button>
        </div>
      );
    case "typography":
      return (
        <div>
          <Heading>Thoughtfully designed.</Heading>
          <Text>
            읽기 좋은 글자, 충분한 여백, 자연스러운 흐름.
            <br />
            인터페이스를 구성하는 가장 기본적인 약속입니다.
          </Text>
          <Blockquote>Less friction. More intention.</Blockquote>
          <Text>
            <Code>@9to6/ui</Code>로 시작하세요.
          </Text>
        </div>
      );
    default:
      return null;
  }
}
