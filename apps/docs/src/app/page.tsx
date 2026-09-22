import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  MousePointer2,
  Braces,
  Check,
} from "lucide-react";
import { Badge } from "@9to6/ui/badge";
import { DemoHost } from "@/components/demo-host";
import { HomePlayground } from "@/components/home-playground";
import { catalog } from "@/lib/catalog";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <Link href="/quality/" className="release-pill">
            <span />
            An independent UI system{" "}
            <span className="release-version">v0.1</span>
            <ArrowUpRight size={12} />
          </Link>
          <h1>
            Good interfaces.
            <br />
            <span>Great feeling.</span>
          </h1>
          <p>
            익숙한 컴포넌트에, 기분 좋은 디테일.
            <br />
            Next.js를 위한 당신만의 디자인 시스템.
          </p>
          <div className="hero-actions">
            <Link className="n-button" data-size="lg" href="/getting-started/">
              시작하기 <ArrowRight size={16} />
            </Link>
            <Link className="hero-secondary" href="/components/button/">
              컴포넌트 둘러보기 <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="hero-facts">
            <span>
              <Check size={13} /> {catalog.length} components
            </span>
            <span>
              <Check size={13} /> TypeScript
            </span>
            <span>
              <Check size={13} /> Next.js 16
            </span>
          </div>
        </div>
        <HomePlayground />
      </section>
      <section className="principles-strip" aria-label="디자인 원칙">
        <div>
          <Layers size={19} />
          <span>
            <strong>Made to compose</strong>
            <small>작은 조각으로 만드는 큰 가능성</small>
          </span>
        </div>
        <div>
          <MousePointer2 size={19} />
          <span>
            <strong>Motion with meaning</strong>
            <small>시선을 안내하는 자연스러운 움직임</small>
          </span>
        </div>
        <div>
          <Braces size={19} />
          <span>
            <strong>Your code. Your rules.</strong>
            <small>프로젝트에 맞춰 직접 확장하는 구조</small>
          </span>
        </div>
      </section>
      <section className="home-showcase">
        <div className="home-collection-links">
          <Link href="/blocks/">
            <strong>24 Blocks</strong>
            <span>컴포넌트를 조합한 완성된 화면</span>
            <ArrowUpRight size={18} />
          </Link>
          <Link href="/charts/">
            <strong>12 Charts</strong>
            <span>데이터에 맞는 다양한 표현</span>
            <ArrowUpRight size={18} />
          </Link>
          <Link href="/carousels/">
            <strong>6 Carousels</strong>
            <span>콘텐츠를 연결하는 움직임</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE BUILDING BLOCKS</span>
            <h2>작은 디테일까지, 하나의 언어로.</h2>
            <p>직접 눌러보고, 바꿔보고, 프로젝트에 가져가세요.</p>
          </div>
          <Link href="/components/button/">
            모든 컴포넌트 <ArrowRight size={15} />
          </Link>
        </div>
        <div className="showcase-grid">
          {(
            [
              {
                slug: "button",
                group: "core",
                title: "Buttons",
                desc: "분명한 액션, 섬세한 피드백",
              },
              {
                slug: "tabs",
                group: "navigation",
                title: "Tabs",
                desc: "끊김 없이 이어지는 탐색",
              },
              {
                slug: "switch",
                group: "forms",
                title: "Switch",
                desc: "작은 움직임으로 전하는 상태",
              },
              {
                slug: "accordion",
                group: "navigation",
                title: "Accordion",
                desc: "필요한 순간 자연스럽게 펼쳐지는 내용",
              },
              {
                slug: "dialog",
                group: "overlays",
                title: "Dialog",
                desc: "중요한 순간에 집중하는 공간",
              },
              {
                slug: "badge",
                group: "core",
                title: "Badges",
                desc: "간결하고 의미 있는 상태 표시",
              },
            ] as const
          ).map((item) => (
            <article className="showcase-card" key={item.slug}>
              <div className="showcase-card-top">
                <span>{item.title}</span>
                <Link
                  href={`/components/${item.slug}/`}
                  aria-label={`${item.title} 문서`}
                >
                  <ArrowUpRight size={15} />
                </Link>
              </div>
              <div className="showcase-preview">
                <DemoHost name={item.slug} group={item.group} />
              </div>
              <p className="showcase-caption">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="home-bottom">
        <div>
          <Badge tone="accent">BUILT FOR YOUR NEXT IDEA</Badge>
          <h2>Make it feel like you.</h2>
          <p>색상, 밀도, 모션까지. 당신의 제품에 맞춰 조정하세요.</p>
        </div>
        <Link href="/foundations/" className="n-button" data-size="lg">
          나만의 테마 만들기 <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
