export type Category =
  | "복지"
  | "청년"
  | "창업"
  | "주거"
  | "교육"
  | "일자리"
  | "기타";

export interface PostImage {
  src: string;
  alt: string;
}

export interface RawPost {
  title: string;
  content: string;
  images: PostImage[];
  sourceUrl: string;
  sourceName: string;
  publishedAt: Date;
}

export interface ProcessedPost {
  title: string;
  summary: string;
  content: string;
  images: PostImage[];
  sourceUrl: string;
  sourceName: string;
  category: Category;
  tags: string[];
  deadline: Date | null;
  isAiSummary: boolean;
}
