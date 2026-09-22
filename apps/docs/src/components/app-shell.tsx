"use client";
import { Icon } from "@9to6/ui/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  Search,
  Sun,
  Moon,
  ArrowUpRight,
  Menu,
  Command as CommandIcon,
  ChevronRight,
} from "lucide-react";
import { UIProvider, type UISettings } from "@9to6/ui/provider";
import { MovingHighlight } from "@9to6/ui/moving-highlight";
import { Button } from "@9to6/ui/button";
import { Kbd } from "@9to6/ui/kbd";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@9to6/ui/dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@9to6/ui/command";
import { Toaster } from "@9to6/ui/toast";
import { catalog, groupLabels, groupOrder } from "@/lib/catalog";

type Settings = Required<UISettings>;
const initial: Settings = {
  theme: "light",
  motion: "full",
  density: "comfortable",
  accent: "black",
};
const SettingsContext = createContext<{
  settings: Settings;
  update: (value: Partial<Settings>) => void;
}>({ settings: initial, update: () => {} });
export const useSettings = () => useContext(SettingsContext);
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("nine-settings", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("nine-settings", callback);
  };
}
function snapshot() {
  try {
    return localStorage.getItem("nine-ui-settings") ?? "";
  } catch {
    return "";
  }
}
function parse(value: string): Settings {
  try {
    const data = JSON.parse(value);
    return {
      theme: ["light", "dark", "system"].includes(data.theme)
        ? data.theme
        : "light",
      motion: data.motion === "reduced" ? "reduced" : "full",
      density: data.density === "compact" ? "compact" : "comfortable",
      accent:
        data.version !== 2 && data.accent === "blue"
          ? "black"
          : ["black", "blue", "violet", "teal"].includes(data.accent)
            ? data.accent
            : "black",
    };
  } catch {
    return initial;
  }
}

function Brand() {
  return (
    <Link href="/" className="brand" aria-label="NINE UI 홈">
      <span className="brand-symbol" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        NINE<span className="brand-ui">/ui</span>
      </span>
    </Link>
  );
}
function ComponentNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="component-nav" aria-label="컴포넌트 탐색">
      <MovingHighlight selector="a" variant="line" />
      <div className="nav-group">
        <span className="nav-group-title">GET STARTED</span>
        {[
          ["/getting-started/", "설치 가이드"],
          ["/foundations/", "디자인 토큰"],
          ["/motion/", "모션 스튜디오"],
          ["/quality/", "지원 범위와 검증"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={
              pathname.replace(/\/$/, "") === href.replace(/\/$/, "")
                ? "page"
                : undefined
            }
          >
            {label}
          </Link>
        ))}
      </div>
      {groupOrder.map((group) => (
        <div className="nav-group" key={group}>
          <span className="nav-group-title">
            {groupLabels[group]}
            <span>{catalog.filter((item) => item.group === group).length}</span>
          </span>
          {catalog
            .filter((item) => item.group === group)
            .map((item) => (
              <Link
                key={item.slug}
                href={`/components/${item.slug}/`}
                onClick={onNavigate}
                aria-current={
                  pathname.includes(`/components/${item.slug}`) &&
                  pathname.replace(/\/$/, "").endsWith(item.slug)
                    ? "page"
                    : undefined
                }
              >
                {item.name}
                {["tabs", "dialog", "switch"].includes(item.slug) && (
                  <span className="nav-dot" />
                )}
              </Link>
            ))}
        </div>
      ))}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const raw = useSyncExternalStore(subscribe, snapshot, () => "");
  const settings = parse(raw);
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState(false);
  const [mobile, setMobile] = useState(false);
  function update(value: Partial<Settings>) {
    try {
      localStorage.setItem(
        "nine-ui-settings",
        JSON.stringify({ ...settings, ...value, version: 2 }),
      );
      window.dispatchEvent(new Event("nine-settings"));
    } catch {
      /* Preferences remain optional when storage is unavailable. */
    }
  }
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearch((value) => !value);
      }
    };
    window.addEventListener("keydown", handler);
    shellRef.current?.setAttribute("data-shortcuts-ready", "true");
    return () => window.removeEventListener("keydown", handler);
  }, []);
  const isHome = pathname === "/";
  return (
    <SettingsContext.Provider value={{ settings, update }}>
      <UIProvider {...settings} ref={shellRef} className="app-root">
        <a href="#main" className="skip-link">
          본문으로 이동
        </a>
        <header className="site-header">
          <div className="header-inner">
            <Brand />
            <nav className="top-nav" aria-label="주요 탐색">
              <Link
                href="/components/button/"
                data-active={pathname.startsWith("/components")}
              >
                Components
              </Link>
              <Link
                href="/foundations/"
                data-active={pathname.startsWith("/foundations")}
              >
                Foundations
              </Link>
              <Link
                href="/motion/"
                data-active={pathname.startsWith("/motion")}
              >
                Motion
                <span className="top-nav-dot" />
              </Link>
            </nav>
            <div className="header-actions">
              <button
                type="button"
                className="search-trigger"
                aria-label="컴포넌트 검색"
                onClick={() => setSearch(true)}
              >
                <Search size={14} />
                <span>컴포넌트 검색</span>
                <Kbd>⌘ K</Kbd>
              </button>
              <Button
                variant="ghost"
                size="icon"
                aria-label={
                  settings.theme === "dark"
                    ? "라이트 테마로 변경"
                    : "다크 테마로 변경"
                }
                onClick={() =>
                  update({
                    theme: settings.theme === "dark" ? "light" : "dark",
                  })
                }
              >
                {settings.theme === "dark" ? <Sun /> : <Moon />}
              </Button>
              <a
                href="https://github.com/9to6blog/nextjs_uikit"
                className="github-link"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <ArrowUpRight size={13} />
              </a>
              <Button
                variant="ghost"
                size="icon"
                className="mobile-menu-button"
                aria-label="탐색 메뉴 열기"
                onClick={() => setMobile(true)}
              >
                <Menu />
              </Button>
            </div>
          </div>
        </header>
        <div className={isHome ? "home-layout" : "docs-layout"}>
          {!isHome && (
            <aside className="docs-sidebar">
              <ComponentNavigation />
            </aside>
          )}
          <main
            id="main"
            tabIndex={-1}
            className={isHome ? "home-main" : "docs-main"}
          >
            {children}
          </main>
        </div>
        <footer className="site-footer">
          <Brand />
          <span>Thoughtfully built. Entirely yours.</span>
          <a href="https://github.com/9to6blog/nextjs_uikit">
            Source on GitHub <ArrowUpRight size={12} />
          </a>
        </footer>
        <Dialog open={search} onOpenChange={setSearch}>
          <DialogContent variant="command" className="search-dialog">
            <DialogTitle className="n-sr-only">컴포넌트 검색</DialogTitle>
            <DialogDescription className="n-sr-only">
              이름을 검색하고 Enter로 이동하세요.
            </DialogDescription>
            <Command label="컴포넌트 검색어">
              <CommandInput
                autoFocus
                placeholder="무엇을 만들고 싶으세요?"
                aria-label="컴포넌트 검색어"
              />
              <CommandList>
                <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                {groupOrder.map((group) => (
                  <CommandGroup heading={groupLabels[group]} key={group}>
                    {catalog
                      .filter((item) => item.group === group)
                      .map((item) => (
                        <CommandItem
                          key={item.slug}
                          value={item.name}
                          keywords={[item.description]}
                          onSelect={() => {
                            setSearch(false);
                            router.push(`/components/${item.slug}/`);
                          }}
                        >
                          <span>{item.name}</span>
                          <ChevronRight size={13} />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                ))}
              </CommandList>
              <div className="search-footer">
                <CommandIcon size={13} />
                <Icon name="arrow-up" />
                <Icon name="arrow-down" /> 탐색 <Kbd>Enter</Kbd> 이동{" "}
                <Kbd>esc</Kbd> 닫기
              </div>
            </Command>
          </DialogContent>
        </Dialog>
        <Dialog open={mobile} onOpenChange={setMobile}>
          <DialogContent className="mobile-nav-dialog">
            <DialogTitle>Explore NINE UI</DialogTitle>
            <DialogDescription>컴포넌트와 가이드</DialogDescription>
            <ComponentNavigation onNavigate={() => setMobile(false)} />
          </DialogContent>
        </Dialog>
        <Toaster />
      </UIProvider>
    </SettingsContext.Provider>
  );
}
