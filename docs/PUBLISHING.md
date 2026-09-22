# GitHub Pages

공개 주소: https://9to6blog.github.io/nextjs_uikit/

Next.js 빌드는 로컬에서 수행합니다. `main`에는 소스와 검증 스크립트만, `gh-pages`에는 검증한 정적 산출물만 보관합니다. GitHub의 Pages 배포 작업은 `.nojekyll`이 있는 산출물을 게시하며 Next.js를 빌드하지 않습니다.

1. `npm ci`, `npm run build`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:package`, `npm run test:react`로 변경 사항을 검증합니다.
2. 소스를 커밋하고 `main`에 푸시합니다.
3. `npm run build:pages`로 `/nextjs_uikit` basePath를 포함한 사이트를 로컬 빌드합니다. `artifacts/pages-build.json`이 산출물 경로와 소스 커밋을 기록합니다.
4. `npm run test:pages`로 산출물의 모든 문서 경로, 공개 registry·패키지, 브라우저 탐색을 검증합니다.
5. `npm run publish:pages`는 깨끗한 현재 커밋과 빌드 기록이 일치할 때만 전용 `gh-pages` 브랜치를 갱신합니다. 기존 배포 이력을 보존하며 force push를 하지 않습니다.
6. 저장소 Settings → Pages의 게시 소스는 `gh-pages`, `/ (root)`입니다. GitHub의 `pages build and deployment` 작업 성공 후 `npm run test:pages -- https://9to6blog.github.io/nextjs_uikit/`로 실제 주소를 검증합니다.

검증한 커밋은 `/build-info.json`, 설치용 tarball은 `/downloads/9to6-ui-0.1.0.tgz`, source registry는 `/r/`에 있습니다. 이 경로는 모두 위 프로젝트 주소 아래에 위치합니다. 빌드 산출물과 테스트 증거는 `main`에 커밋하지 않습니다.

로컬 Pages 미리보기는 `STATIC_ROOT`에 `pages-build.json`의 directory, `BASE_PATH=/nextjs_uikit`, `PORT=3107`을 지정하고 `node scripts/serve.mjs`를 실행합니다. 일반 `npm run build`·`npm run preview`는 basePath 없는 로컬 개발 경로를 유지합니다.

구성 근거: [GitHub Pages 게시 소스](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [Next.js basePath](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath).
