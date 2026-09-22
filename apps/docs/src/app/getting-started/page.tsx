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
          GitHub Pages에서 제공하는 tarball을 설치하거나 직접 로컬에서 빌드할 수
          있습니다. React 19.2 이상 20 미만을 대상으로 하며, Next.js 16 연동도
          제공합니다.
        </p>
        <CodeBlock
          label="terminal"
          code={
            "npm install https://9to6blog.github.io/nextjs_uikit/downloads/9to6-ui-0.1.0.tgz\n\n# 또는 이 저장소에서 로컬 패키지 생성\nnpm run build:ui\nnpm pack -w @9to6/ui"
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
            'import "@9to6/ui/styles.css";\nimport { UIProvider } from "@9to6/ui/provider";\n\nexport default function Layout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="ko">\n      <body>\n        <UIProvider theme="system" accent="black" motion="full">\n          {children}\n        </UIProvider>\n      </body>\n    </html>\n  );\n}'
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
        <h2>React · Vite에서 사용</h2>
        <p>
          Next.js가 없는 앱에서는 @9to6/ui/react 또는 개별 컴포넌트 경로를
          사용합니다. React 진입점의 NavLink는 active 값을 받는 일반 링크이며,
          Next.js 라우터와 자동 연동할 때는 @9to6/ui/nav-link를 사용하세요.
        </p>
        <CodeBlock
          label="src/App.tsx"
          code={
            'import "@9to6/ui/styles.css";\nimport { UIProvider, Button, NavLink } from "@9to6/ui/react";\n\nexport default function App() {\n  return <UIProvider><NavLink href="/" active>홈</NavLink><Button>시작하기</Button></UIProvider>;\n}'
          }
        />
      </section>
      <section className="doc-section">
        <h2>Shadcn registry로 소스 가져오기</h2>
        <p>
          공개 문서 사이트의 /r 경로에서 생성된 registry를 제공합니다. CSS를
          추가한 뒤 레이아웃에서 가져오세요. 설치 전 CLI가 표시하는 변경 파일을
          확인할 수 있습니다.
        </p>
        <CodeBlock
          label="terminal"
          code={
            "npx shadcn@latest add https://9to6blog.github.io/nextjs_uikit/r/button.json\n\n# 생성된 스타일을 앱에서 한 번 import\n# 실제 설치 경로는 프로젝트의 components.json aliases를 따릅니다."
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
