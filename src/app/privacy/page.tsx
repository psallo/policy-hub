import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "정책허브의 개인정보처리방침을 안내합니다.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="mb-2 text-3xl font-bold">개인정보처리방침</h1>
      <p className="mb-8 text-sm text-gray-400">최종 업데이트: 2025년 1월 1일</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">1. 개요</h2>
          <p>
            정책허브(이하 &quot;사이트&quot;)는 이용자의 개인정보를 소중히 여기며, 「개인정보 보호법」 및 관련
            법령을 준수합니다. 본 방침은 사이트가 수집하는 정보와 그 이용 방식을 설명합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">2. 수집하는 정보</h2>
          <p className="mb-2">사이트는 다음 정보를 수집할 수 있습니다.</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>방문 기록, 접속 IP, 브라우저 종류 (서버 로그)</li>
            <li>쿠키 및 유사 추적 기술을 통한 이용 행태 정보</li>
            <li>문의하기 기능 이용 시 제출한 이메일 주소 및 내용</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">3. 정보 수집 목적</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>서비스 운영 및 개선</li>
            <li>이용자 문의 응대</li>
            <li>광고 맞춤화 및 통계 분석</li>
            <li>부정 이용 방지</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">4. 쿠키(Cookie) 사용</h2>
          <p className="mb-2">
            사이트는 서비스 개선 및 맞춤형 광고 제공을 위해 쿠키를 사용합니다. 쿠키는 웹사이트가
            귀하의 컴퓨터에 저장하는 소량의 데이터 파일입니다.
          </p>
          <p className="mb-2">사이트에서 사용하는 쿠키의 종류:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>필수 쿠키</strong>: 사이트 기본 기능 제공 (쿠키 동의 여부 저장 등)
            </li>
            <li>
              <strong>분석 쿠키</strong>: 방문자 통계 수집 (Google Analytics)
            </li>
            <li>
              <strong>광고 쿠키</strong>: 맞춤형 광고 제공 (Google AdSense)
            </li>
          </ul>
          <p className="mt-2">
            브라우저 설정에서 쿠키를 비활성화할 수 있으나, 일부 기능이 제한될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            5. Google AdSense 및 제3자 광고
          </h2>
          <p className="mb-2">
            사이트는 <strong>Google AdSense</strong>를 통해 광고를 게재합니다. Google은 쿠키를
            사용하여 이용자의 이전 방문 기록을 기반으로 관련성 높은 광고를 표시할 수 있습니다.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Google의 광고 쿠키 사용 방식:{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Google 광고 정책
              </a>
            </li>
            <li>
              맞춤 광고 비활성화:{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Google 광고 설정
              </a>
            </li>
            <li>
              제3자 쿠키 거부:{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                광고 선택 도구
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">6. 정보의 제3자 제공</h2>
          <p>
            사이트는 법령에 따른 의무 이행, 서비스 운영에 필요한 경우(Google AdSense, Firebase
            등)를 제외하고 이용자의 개인정보를 제3자에게 제공하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">7. 개인정보 보유 기간</h2>
          <p>
            수집된 개인정보는 수집 목적 달성 후 즉시 파기합니다. 단, 관련 법령에 따라 보존이
            필요한 경우 해당 기간 동안 보관합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">8. 이용자의 권리</h2>
          <p>이용자는 언제든지 다음 권리를 행사할 수 있습니다.</p>
          <ul className="list-disc space-y-1 pl-5 mt-2">
            <li>개인정보 열람 요청</li>
            <li>개인정보 수정·삭제 요청</li>
            <li>개인정보 처리 정지 요청</li>
          </ul>
          <p className="mt-2">
            권리 행사는 아래 문의처로 연락해 주시면 성실히 대응하겠습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">9. 개인정보처리방침 변경</h2>
          <p>
            본 방침은 법령·서비스 변경에 따라 개정될 수 있으며, 변경 시 사이트 공지사항을 통해
            안내합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">10. 문의처</h2>
          <p>개인정보 관련 문의는 아래로 연락해 주세요.</p>
          <div className="mt-2 rounded-lg bg-gray-50 p-4">
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
