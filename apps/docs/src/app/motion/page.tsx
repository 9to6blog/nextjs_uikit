import { MotionStudio } from "@/components/motion-studio";
import { CodeBlock } from "@/components/code-block";
export const metadata = { title: "Motion studio" };
export default function Motion() {
  return (
    <article className="guide-page">
      <div className="doc-breadcrumb">MOTION SYSTEM</div>
      <header className="doc-heading">
        <h1>
          Less friction.
          <br />
          More flow.
        </h1>
        <p>
          움직임은 장식보다 피드백입니다. 상태의 변화를 자연스럽게 연결합니다.
        </p>
      </header>
      <MotionStudio />
      <section className="doc-section">
        <h2>One motion language</h2>
        <div className="motion-token-grid">
          <div>
            <span>200 ms</span>
            <strong>Respond</strong>
            <p>버튼 피드백, 메뉴 닫힘</p>
          </div>
          <div>
            <span>300 ms</span>
            <strong>Connect</strong>
            <p>탭 이동, 상태 전환</p>
          </div>
          <div>
            <span>500 ms</span>
            <strong>Reveal</strong>
            <p>큰 표면, 진행률 변화</p>
          </div>
        </div>
        <CodeBlock
          label="CSS"
          code={
            "--n-duration-fast: 200ms;\n--n-duration-normal: 300ms;\n--n-duration-slow: 500ms;\n--n-ease: cubic-bezier(.22, 1, .36, 1);\n--n-ease-exit: cubic-bezier(.4, 0, 1, 1);"
          }
        />
      </section>
      <section className="doc-section">
        <h2>Respect the user</h2>
        <p>
          운영체제의 prefers-reduced-motion을 우선합니다. 앱 설정에서도 모션
          감소를 선택할 수 있습니다. 상태와 정보는 애니메이션이 꺼져도 동일하게
          유지됩니다.
        </p>
        <CodeBlock
          code={'<UIProvider motion="reduced">\n  {children}\n</UIProvider>'}
        />
      </section>
    </article>
  );
}
