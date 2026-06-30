import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description: "정책허브 서비스 이용약관을 안내합니다.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="mb-2 text-3xl font-bold">이용약관</h1>
      <p className="mb-8 text-sm text-gray-400">최종 업데이트: 2025년 1월 1일</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">제1조 (목적)</h2>
          <p>
            본 약관은 정책허브(이하 &quot;사이트&quot;)가 제공하는 서비스의 이용 조건 및 절차, 이용자와
            사이트의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">제2조 (서비스 내용)</h2>
          <p className="mb-2">사이트는 다음 서비스를 제공합니다.</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>정부 지원 정책 및 혜택 정보 자동 수집·요약 서비스</li>
            <li>정책 카테고리별 검색 및 조회 서비스</li>
            <li>AI 기반 정책 내용 요약 서비스</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">제3조 (정보의 정확성)</h2>
          <p className="mb-2">
            사이트에 게시된 정책 정보는 공공기관 공식 자료를 바탕으로 수집·요약된 것입니다.
            단, 다음 사항에 유의하시기 바랍니다.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              일부 콘텐츠는 <strong>AI가 자동 요약</strong>한 내용으로, 오류가 포함될 수 있습니다.
            </li>
            <li>정책 내용은 변경될 수 있으므로 반드시 출처(공식 사이트)를 확인하세요.</li>
            <li>사이트는 정보의 정확성·완전성에 대해 법적 책임을 지지 않습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">제4조 (광고)</h2>
          <p>
            사이트는 운영 비용 충당을 위해 Google AdSense 등 제3자 광고 서비스를 이용합니다.
            광고 내용에 대한 책임은 광고주에게 있으며, 사이트는 광고 내용의 정확성에 대해
            책임지지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">제5조 (저작권)</h2>
          <p>
            사이트의 요약 콘텐츠에 대한 저작권은 정책허브에 있으며, 원문 정보의 저작권은 각
            공공기관에 있습니다. 사이트 콘텐츠의 무단 복제·배포를 금지합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">제6조 (면책)</h2>
          <p>
            사이트는 정책 정보 오류로 인한 신청 실패, 혜택 미수령 등의 결과에 대해 책임지지
            않습니다. 중요한 정책은 반드시 관련 공공기관에 직접 확인하시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">제7조 (약관 변경)</h2>
          <p>
            사이트는 필요 시 본 약관을 변경할 수 있으며, 변경된 약관은 사이트 공지를 통해
            효력이 발생합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">제8조 (문의)</h2>
          <div className="rounded-lg bg-gray-50 p-4">
            <p>운영자: 정책허브</p>
            <p>
              이메일:{" "}
              <a
                href="mailto:treasure0613@gmail.com"
                className="text-blue-600 underline"
              >
                treasure0613@gmail.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
