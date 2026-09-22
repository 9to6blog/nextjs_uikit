import { CodeBlock } from "@/components/code-block";
export const metadata = { title: "시작하기" };
export default function GettingStarted() {
  return (
    <article className="guide-page">
      <div className="doc-breadcrumb">GET STARTED</div>
      <header className="doc-heading">
        <h1>Make yourself at home.</h1>
        <p>독립 패키지로 가져오거나, 소스를 직접 소유하세요.</p>
      </header>
      <section className="doc-section">
        <h2>01. 로컬에서 실행</h2>
        <p>
          Node.js 22 이상이 필요합니다. 패키지와 문서 앱을 하나의 npm
          workspace로 관리합니다.
        </p>
        <CodeBlock
          label="terminal"
          code={
            "git clone https://github.com/9to6blog/nextjs_uikit.git\ncd nextjs_uikit\nnpm ci\nnpm run dev\n\n# http://127.0.0.1:3106"
          }
        />
      </section>
      <section className="doc-section">
        <h2>02. 내 프로젝트에 설치</h2>
        <p>
          현재 npm 공개 배포 전입니다. 라이브러리를 빌드하고 로컬 tarball로
          설치할 수 있습니다. 패키지는 React 19.2 이상과 Next.js 16을 대상으로
          합니다.
        </p>
        <CodeBlock
          label="terminal"
          code={
            "# 이 저장소에서\nnpm run build:ui\nnpm pack -w @9to6/ui\n\n# 사용하는 Next.js 프로젝트에서\nnpm install /absolute/path/to/9to6-ui-0.1.0.tgz"
          }
        />
      </section>
      <section className="doc-section">
        <h2>03. 테마와 스타일 연결</h2>
        <p>
          전역 스타일은 앱 레이아웃에서 한 번 불러옵니다. 정적 자식 콘텐츠는
          Server Component로 유지할 수 있습니다.
        </p>
        <CodeBlock
          label="app/layout.tsx"
          code={
            'import "@9to6/ui/styles.css";\nimport { UIProvider } from "@9to6/ui/provider";\n\nexport default function Layout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="ko">\n      <body>\n        <UIProvider theme="system" accent="blue" motion="full">\n          {children}\n        </UIProvider>\n      </body>\n    </html>\n  );\n}'
          }
        />
      </section>
      <section className="doc-section">
        <h2>04. 조합해서 사용</h2>
        <CodeBlock
          label="app/page.tsx"
          code={
            'import { Button } from "@9to6/ui/button";\nimport { Card, CardContent, CardHeader, CardTitle } from "@9to6/ui/card";\n\nexport default function Page() {\n  return (\n    <Card>\n      <CardHeader><CardTitle>My workspace</CardTitle></CardHeader>\n      <CardContent><Button type="submit" form="project">저장</Button></CardContent>\n    </Card>\n  );\n}'
          }
        />
        <p>
          상태, 이벤트 핸들러, 브라우저 API를 사용하는 컴포넌트에만 &quot;use
          client&quot;를 추가하세요.
        </p>
      </section>
      <section className="doc-section">
        <h2>Shadcn registry로 소스 가져오기</h2>
        <p>
          로컬 문서 서버의 /r 경로에서 생성된 registry를 제공합니다. CSS를
          추가한 뒤 레이아웃에서 가져오세요. 설치 전 CLI가 표시하는 변경 파일을
          확인할 수 있습니다.
        </p>
        <CodeBlock
          label="terminal"
          code={
            "# 소비 프로젝트에서 — 로컬 문서 서버가 켜져 있어야 합니다.\nnpx shadcn@latest add http://127.0.0.1:3106/r/button.json\n\n# 생성된 스타일 파일을 app/layout.tsx에서 import\n# 실제 설치 경로는 프로젝트의 components.json aliases를 따릅니다."
          }
        />
      </section>
      <section className="doc-section">
        <h2>로컬 빌드, 정적 호스팅</h2>
        <p>
          npm run build는 패키지와 registry, 정적 문서 사이트를 빌드합니다.
          apps/docs/out의 파일을 정적 호스팅에 올릴 수 있습니다. 문서 사이트에는
          데이터베이스나 실행 중인 Next.js 서버가 필요하지 않습니다.
        </p>
      </section>
    </article>
  );
}
