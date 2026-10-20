import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "학교 산업안전보건 업무 | v1.8 근거 기반 안내",
  description: "학교 산업안전보건 자료에서 직접 근거를 찾아 안내하는 업무 도우미",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
