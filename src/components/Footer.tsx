import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 mb-8">
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-900">정책허브</p>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><Link href="/about" className="hover:text-blue-600">소개</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">문의하기</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-900">카테고리</p>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><Link href="/posts?category=복지" className="hover:text-blue-600">복지</Link></li>
              <li><Link href="/posts?category=청년" className="hover:text-blue-600">청년</Link></li>
              <li><Link href="/posts?category=창업" className="hover:text-blue-600">창업</Link></li>
              <li><Link href="/posts?category=주거" className="hover:text-blue-600">주거</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-900">카테고리</p>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><Link href="/posts?category=교육" className="hover:text-blue-600">교육</Link></li>
              <li><Link href="/posts?category=일자리" className="hover:text-blue-600">일자리</Link></li>
              <li><Link href="/posts?category=기타" className="hover:text-blue-600">기타</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-900">법적 고지</p>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><Link href="/privacy" className="hover:text-blue-600">개인정보처리방침</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600">이용약관</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 text-xs text-gray-400 space-y-1">
          <p>
            본 사이트의 정책 정보는 참고용이며, 중요한 사항은 반드시{" "}
            <strong className="text-gray-500">공식 정부 사이트</strong>에서 확인하세요.
          </p>
          <p>일부 콘텐츠는 AI가 자동 요약한 내용을 포함하며, 오류가 있을 수 있습니다.</p>
          <p className="mt-3">© 2025 정책허브. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
