import { ThemeStudio } from "@/components/theme-studio";
import { CodeBlock } from "@/components/code-block";
export const metadata = { title: "Foundations" };
export default function Foundations() {
  return (
    <article className="guide-page">
      <div className="doc-breadcrumb">FOUNDATIONS</div>
      <header className="doc-heading">
        <h1>A language of your own.</h1>
        <p>색상·크기·밀도는 하나의 의미 있는 토큰 체계로 연결됩니다.</p>
      </header>
      <ThemeStudio />
      <section className="doc-section">
        <h2>Semantic tokens</h2>
        <p>
          모든 스타일은 n- 접두사와 data-n-ui 범위 안에 있습니다. 기존 앱의 전역
          CSS를 초기화하지 않습니다.
        </p>
        <div className="token-grid">
          {[
            "bg",
            "surface",
            "raised",
            "text",
            "muted",
            "accent",
            "success",
            "warning",
            "danger",
          ].map((token) => (
            <div key={token}>
              <span style={{ background: `var(--n-${token})` }} />
              <code>--n-{token}</code>
            </div>
          ))}
        </div>
        <CodeBlock
          label="CSS"
          code={
            '/* 특정 테마 범위에서 토큰을 재정의합니다. */\n[data-n-ui][data-theme="light"] {\n  --n-accent: #3659e3;\n  --n-accent-hover: #2847c4;\n  --n-accent-soft: #eef2ff;\n  --n-accent-ink: #304dc3;\n  --n-on-accent: #ffffff;\n  --n-radius: 10px;\n  --n-height: 40px;\n}'
          }
        />
      </section>
      <section className="doc-section">
        <h2>세 가지 기본 약속</h2>
        <ul className="doc-list">
          <li>색상은 성공·경고·오류 등 의미에 따라 사용합니다.</li>
          <li>포커스는 색상만으로 구분하지 않고 외곽선으로 표시합니다.</li>
          <li>터치·키보드·마우스에서 같은 작업을 수행할 수 있게 설계합니다.</li>
        </ul>
        <p>
          사용자 정의 팔레트는 별도 대비 검증이 필요합니다. 예제 프리셋의 검증
          범위는 지원 범위 페이지에서 확인할 수 있습니다.
        </p>
      </section>
    </article>
  );
}
