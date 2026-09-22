import { ChartGallery } from "@/components/chart-gallery";
export const metadata = { title: "Charts" };
export default function ChartsPage() {
  return (
    <article className="collection-page">
      <div className="doc-breadcrumb">
        Build with NINE <span>/</span> Charts
      </div>
      <header className="doc-heading">
        <div className="collection-eyebrow">12 WAYS TO SEE YOUR DATA</div>
        <h1>
          데이터에 맞는
          <br />
          표현을 고르세요.
        </h1>
        <p>
          추세, 비교, 구성과 관계. 데이터와 표현을 바꾸어 보고, 필요한 차트를
          코드로 가져가세요.
        </p>
      </header>
      <ChartGallery />
    </article>
  );
}
