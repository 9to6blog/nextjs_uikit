"use client";
import { Icon } from "@9to6/ui/icons";
import { useDemoReady } from "@/lib/use-demo-ready";
import { useState } from "react";
import { Button } from "@9to6/ui/button";
import { Field, Input } from "@9to6/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@9to6/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@9to6/ui/alert-dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@9to6/ui/sheet";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@9to6/ui/drawer";
import { Popover, PopoverTrigger, PopoverContent } from "@9to6/ui/popover";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@9to6/ui/tooltip";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@9to6/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@9to6/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@9to6/ui/context-menu";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@9to6/ui/menubar";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@9to6/ui/command";
import { toast } from "@9to6/ui/toast";

export function OverlaysDemo({ name }: { name: string }) {
  useDemoReady(name);
  const [selection, setSelection] = useState("");
  const [checked, setChecked] = useState(true);
  switch (name) {
    case "dialog":
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>프로젝트 만들기</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>새 프로젝트</DialogTitle>
            <DialogDescription>
              아이디어를 시작할 새로운 공간을 만들어 보세요.
            </DialogDescription>
            <form
              className="demo-stack dialog-form"
              onSubmit={(event) => {
                event.preventDefault();
                setSelection("프로젝트가 준비되었습니다.");
              }}
            >
              <Field label="프로젝트 이름" htmlFor="dialog-project">
                <Input
                  id="dialog-project"
                  placeholder="My workspace"
                  required
                />
              </Field>
              <div className="demo-row">
                <DialogClose asChild>
                  <Button variant="outline">취소</Button>
                </DialogClose>
                <Button type="submit">만들기</Button>
              </div>
              <p role="status" className="demo-note">
                {selection}
              </p>
            </form>
          </DialogContent>
        </Dialog>
      );
    case "alert-dialog":
      return (
        <div className="demo-stack">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="danger">프로젝트 보관</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>프로젝트를 보관할까요?</AlertDialogTitle>
              <AlertDialogDescription>
                목록에서 숨겨집니다. 보관함에서 다시 복원할 수 있습니다.
              </AlertDialogDescription>
              <div className="demo-row dialog-form">
                <AlertDialogCancel asChild>
                  <Button variant="outline">취소</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    onClick={() =>
                      setSelection("데모 프로젝트를 보관했습니다.")
                    }
                  >
                    보관하기
                  </Button>
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
          <span role="status" className="demo-note">
            {selection}
          </span>
        </div>
      );
    case "sheet":
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">상세 설정 열기</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>프로젝트 설정</SheetTitle>
            <SheetDescription>
              프로젝트의 기본 정보를 관리합니다.
            </SheetDescription>
            <div className="demo-stack dialog-form">
              <Field label="프로젝트 이름" htmlFor="sheet-project">
                <Input id="sheet-project" defaultValue="My workspace" />
              </Field>
              <SheetClose asChild>
                <Button>완료</Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      );
    case "drawer":
      return (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">빠른 설정 열기</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="drawer-demo">
              <DrawerTitle>Make room for good ideas.</DrawerTitle>
              <DrawerDescription>
                아래로 밀어 닫거나 닫기 버튼을 사용하세요.
              </DrawerDescription>
              <div className="dialog-form">
                <DrawerClose asChild>
                  <Button>완료</Button>
                </DrawerClose>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      );
    case "popover":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">크기 설정</Button>
          </PopoverTrigger>
          <PopoverContent aria-label="크기 설정">
            <Field
              htmlFor="popover-width"
              label="너비"
              description="픽셀 단위의 너비를 입력하세요."
            >
              <Input
                id="popover-width"
                type="number"
                defaultValue="320"
                aria-describedby="popover-width-hint"
              />
            </Field>
          </PopoverContent>
        </Popover>
      );
    case "tooltip":
      return (
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">마우스를 올려 보세요</Button>
            </TooltipTrigger>
            <TooltipContent>키보드 포커스로도 표시됩니다.</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case "hover-card":
      return (
        <HoverCard>
          <HoverCardTrigger
            href="https://github.com/9to6blog/nextjs_uikit"
            className="text-link"
          >
            @9to6/ui
          </HoverCardTrigger>
          <HoverCardContent>
            <strong>NINE UI</strong>
            <p className="demo-note">
              Next.js를 위한 독립 디자인 시스템.
              <br />
              조합 가능한 컴포넌트와 자연스러운 움직임.
            </p>
          </HoverCardContent>
        </HoverCard>
      );
    case "dropdown-menu":
      return (
        <div className="demo-stack">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                프로젝트 메뉴 <Icon name="chevron-down" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Project</DropdownMenuLabel>
              <DropdownMenuItem
                onSelect={() => setSelection("편집을 선택했습니다.")}
              >
                편집
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setSelection("복제를 선택했습니다.")}
              >
                복제
              </DropdownMenuItem>
              <DropdownMenuItem disabled>잠긴 항목</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={checked}
                onCheckedChange={setChecked}
              >
                즐겨찾기
              </DropdownMenuCheckboxItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  내보내기 <Icon name="chevron-right" />
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onSelect={() => setSelection("JSON 내보내기 선택")}
                  >
                    JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setSelection("Markdown 내보내기 선택")}
                  >
                    Markdown
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
          <span role="status" className="demo-note">
            {selection}
          </span>
        </div>
      );
    case "context-menu":
      return (
        <div className="demo-stack">
          <ContextMenu>
            <ContextMenuTrigger className="context-target" tabIndex={0}>
              우클릭 또는 Shift + F10<small>터치에서는 길게 누르세요.</small>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onSelect={() => setSelection("복사 선택")}>
                복사
              </ContextMenuItem>
              <ContextMenuItem onSelect={() => setSelection("이름 변경 선택")}>
                이름 변경
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          <span role="status" className="demo-note">
            {selection}
          </span>
        </div>
      );
    case "menubar":
      return (
        <div className="demo-stack">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>파일</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onSelect={() => setSelection("새 문서 선택")}>
                  새 문서
                </MenubarItem>
                <MenubarItem onSelect={() => setSelection("저장 선택")}>
                  저장
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>편집</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onSelect={() => setSelection("실행 취소 선택")}>
                  실행 취소
                </MenubarItem>
                <MenubarItem onSelect={() => setSelection("다시 실행 선택")}>
                  다시 실행
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <span role="status" className="demo-note">
            {selection}
          </span>
        </div>
      );
    case "command":
      return (
        <div className="demo-stack">
          <Command label="빠른 명령">
            <CommandInput
              placeholder="명령을 검색하세요…"
              aria-label="명령 검색"
            />
            <CommandList>
              <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
              <CommandGroup heading="Workspace">
                <CommandItem onSelect={() => setSelection("프로젝트 선택")}>
                  프로젝트
                </CommandItem>
                <CommandItem onSelect={() => setSelection("설정 선택")}>
                  설정
                </CommandItem>
                <CommandItem onSelect={() => setSelection("테마 선택")}>
                  테마 변경
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
          <span role="status" className="demo-note">
            {selection}
          </span>
        </div>
      );
    case "toast":
      return (
        <div className="demo-row">
          <Button
            onClick={() =>
              toast.success("변경 사항이 저장되었습니다.", {
                description: "방금 저장됨",
                action: { label: "확인", onClick: () => toast.dismiss() },
              })
            }
          >
            성공 알림
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.error("저장할 수 없습니다.", {
                description: "잠시 후 다시 시도해 주세요.",
              })
            }
          >
            오류 알림
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.promise(
                new Promise((resolve) => setTimeout(resolve, 1500)),
                {
                  loading: "처리 중…",
                  success: "작업을 마쳤습니다.",
                  error: "다시 시도해 주세요.",
                },
              )
            }
          >
            비동기 알림
          </Button>
        </div>
      );
    default:
      return null;
  }
}
