"use client";
import { useDemoReady } from "@/lib/use-demo-ready";
import { useState } from "react";
import { Button } from "@9to6/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@9to6/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@9to6/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@9to6/ui/tabs";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@9to6/ui/collapsible";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@9to6/ui/navigation-menu";
import { Pagination } from "@9to6/ui/pagination";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
} from "@9to6/ui/sidebar";
import { NavLink } from "@9to6/ui/nav-link";
import { DirectionProvider } from "@9to6/ui/direction";
export function NavigationDemo({ name }: { name: string }) {
  useDemoReady(name);
  const [page, setPage] = useState(1);
  const [selection, setSelection] = useState("개요");
  switch (name) {
    case "accordion":
      return (
        <Accordion type="single" collapsible defaultValue="one">
          <AccordionItem value="one">
            <AccordionTrigger>
              내 프로젝트에서 자유롭게 사용할 수 있나요?
            </AccordionTrigger>
            <AccordionContent>
              패키지 또는 소스 코드를 프로젝트에 가져와 테마와 컴포넌트를 직접
              조정할 수 있습니다.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="two">
            <AccordionTrigger>애니메이션을 줄일 수 있나요?</AccordionTrigger>
            <AccordionContent>
              운영체제의 모션 감소 설정을 따르며, UIProvider에서 motion을
              reduced로 지정할 수도 있습니다.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="three">
            <AccordionTrigger>Server Component를 지원하나요?</AccordionTrigger>
            <AccordionContent>
              정적인 컴포넌트는 서버에서 사용하고, 상호작용이 필요한 컴포넌트만
              클라이언트 경계를 갖습니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    case "breadcrumb":
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">홈</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/components/button/">
                컴포넌트
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
    case "tabs":
      return (
        <Tabs defaultValue="design">
          <TabsList aria-label="프로젝트 보기">
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="design">
            <div className="tab-demo-content">
              <strong>Designed with intention.</strong>
              <p>여백, 대비, 움직임이 하나의 언어로 이어집니다.</p>
            </div>
          </TabsContent>
          <TabsContent value="code">
            <div className="tab-demo-content">
              <strong>Built to make it yours.</strong>
              <p>타입 안전한 API와 조합 가능한 컴포넌트.</p>
            </div>
          </TabsContent>
          <TabsContent value="activity">
            <div className="tab-demo-content">
              <strong>Every detail, connected.</strong>
              <p>새로운 컴포넌트를 탐색해 보세요.</p>
            </div>
          </TabsContent>
        </Tabs>
      );
    case "collapsible":
      return (
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="outline">추가 정보 펼치기</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="tab-demo-content">
              이 영역은 높이 변화에 맞춰 자연스럽게 펼쳐집니다. 다시 누르면
              접힙니다.
            </div>
          </CollapsibleContent>
        </Collapsible>
      );
    case "navigation-menu":
      return (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>시작하기 ⌄</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/getting-started/">
                  설치 가이드
                </NavigationMenuLink>
                <NavigationMenuLink href="/foundations/">
                  디자인 토큰
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/components/button/">
                컴포넌트
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );
    case "pagination":
      return <Pagination page={page} pageCount={7} onPageChange={setPage} />;
    case "sidebar":
      return (
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <strong>Workspace</strong>
              <SidebarGroup>
                <SidebarGroupLabel>프로젝트</SidebarGroupLabel>
                {["개요", "디자인", "개발"].map((item) => (
                  <SidebarMenuButton
                    key={item}
                    onClick={() => setSelection(item)}
                  >
                    {item}
                  </SidebarMenuButton>
                ))}
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <SidebarTrigger />
            <p className="demo-note" role="status">
              {selection} 화면
            </p>
          </SidebarInset>
        </SidebarProvider>
      );
    case "nav-link":
      return (
        <div className="demo-row">
          <NavLink href="/" className="demo-nav">
            홈
          </NavLink>
          <NavLink href="/components/nav-link" className="demo-nav">
            현재 페이지
          </NavLink>
          <NavLink href="/getting-started" className="demo-nav">
            가이드
          </NavLink>
        </div>
      );
    case "direction":
      return (
        <DirectionProvider dir="rtl">
          <div dir="rtl">
            <Tabs defaultValue="first">
              <TabsList aria-label="RTL example">
                <TabsTrigger value="first">الأول</TabsTrigger>
                <TabsTrigger value="second">الثاني</TabsTrigger>
              </TabsList>
              <TabsContent value="first">
                방향키 이동도 RTL 설정을 따릅니다.
              </TabsContent>
              <TabsContent value="second">두 번째 패널</TabsContent>
            </Tabs>
          </div>
        </DirectionProvider>
      );
    default:
      return null;
  }
}
