import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "학교 산업안전보건 GPT | v0.3 근거 기반 답변",
  description: "학교 산업안전보건 매뉴얼과 현장 위험요인 자료를 함께 검색하는 근거 기반 도우미",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
