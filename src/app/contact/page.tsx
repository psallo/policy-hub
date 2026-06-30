import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문의하기",
  description: "정책허브에 문의하거나 오류를 제보해 주세요.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-2 text-3xl font-bold">문의하기</h1>
      <p className="mb-10 text-gray-500">
        서비스 관련 문의, 오류 제보, 개선 제안을 보내주세요.
      </p>

      <div className="space-y-6">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-semibold text-gray-900">이메일 문의</h2>
          <p className="mb-4 text-sm text-gray-600">
            아래 이메일로 문의하시면 영업일 기준 1~3일 내에 답변 드리겠습니다.
          </p>
          <a
            href="mailto:treasure0613@gmail.com"
            className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700"
          >
            treasure0613@gmail.com 으로 보내기
          </a>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-3 font-semibold text-gray-900">자주 묻는 문의 유형</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>
                <strong>오류 제보</strong>: 잘못된 정책 정보나 링크 오류를 발견하셨나요?
                해당 게시물 URL과 함께 알려주세요.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>
                <strong>정책 추가 요청</strong>: 특정 정책이나 출처 사이트 추가를
                원하시나요? 사이트 주소를 알려주시면 검토하겠습니다.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>
                <strong>광고 문의</strong>: 광고 게재 관련 문의도 동일 이메일로
                연락해 주세요.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>
                <strong>개인정보 관련</strong>: 개인정보 열람·삭제 요청은{" "}
                <a href="/privacy" className="text-blue-600 underline">
                  개인정보처리방침
                </a>
                을 참고해 주세요.
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
          정책허브는 개인이 운영하는 비영리 목적의 정보 제공 사이트입니다. 모든 정책 정보는
          공식 정부 사이트를 출처로 하며, 상업적 이용을 목적으로 하지 않습니다.
        </div>
      </div>
    </div>
  );
}
