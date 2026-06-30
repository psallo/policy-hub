import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "소개",
  description:
    "정책허브는 정부 지원 정책과 혜택을 한 곳에 모아 쉽게 제공하는 서비스입니다.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="mb-4 text-3xl font-bold">정책허브 소개</h1>
      <p className="mb-10 text-gray-500">
        정부 지원 정책과 혜택을 한 곳에서 쉽게 확인하세요.
      </p>

      <div className="space-y-10 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            왜 정책허브를 만들었나요?
          </h2>
          <p>
            대한민국에는 수백 가지의 정부 지원 정책과 혜택이 존재하지만, 각 부처 사이트에
            분산되어 있어 일반인이 자신에게 맞는 정책을 찾기가 쉽지 않습니다. 정책허브는
            흩어진 정보를 한 곳에 모아, 누구나 쉽게 읽을 수 있도록 요약해 제공합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">어떻게 운영되나요?</h2>
          <div className="space-y-4">
            <div className="flex gap-4 rounded-xl bg-blue-50 p-4">
              <span className="text-2xl">📡</span>
              <div>
                <p className="font-semibold text-gray-900">자동 수집</p>
                <p>
                  정책브리핑(korea.kr), 온통청년 등 공식 정부 사이트의 RSS 피드와 공지사항을
                  매일 자동으로 수집합니다.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl bg-purple-50 p-4">
              <span className="text-2xl">🤖</span>
              <div>
                <p className="font-semibold text-gray-900">AI 요약</p>
                <p>
                  수집된 원문을 AI가 400~600자 분량으로 요약합니다. 신청 대상, 혜택 내용,
                  신청 방법을 포함하며, AI 요약 글에는 별도 표시를 합니다.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl bg-green-50 p-4">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-gray-900">출처 명시</p>
                <p>
                  모든 정책 정보에는 원문 출처 링크가 포함됩니다. 중요한 내용은 반드시
                  공식 사이트에서 직접 확인하시기 바랍니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">주의사항</h2>
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <ul className="list-disc space-y-1 pl-4">
              <li>
                정책허브의 내용은 참고용이며, 실제 신청 전 반드시 공식 사이트를 확인하세요.
              </li>
              <li>AI 요약 과정에서 오류가 발생할 수 있습니다.</li>
              <li>정책 내용은 수시로 변경될 수 있으므로 최신 정보를 확인하세요.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">문의하기</h2>
          <p>
            서비스 관련 문의, 오류 제보, 개선 제안은{" "}
            <Link href="/contact" className="text-blue-600 underline">
              문의하기
            </Link>{" "}
            페이지를 이용해 주세요.
          </p>
        </section>
      </div>
    </div>
  );
}
