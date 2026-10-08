# 학교 산업안전보건 GPT v0.5

첨부 설계 보고서를 바탕으로 만든 독립형 근거 기반 GPT 모듈입니다. `산업안전보건업무 매뉴얼`, `학교현장 위험요인과 재해예방 관리 연수자료`, `관리감독자 정기 안전보건교육 질의응답 모음`, `서울특별시교육청 안전보건관리규정`을 검색하고, OpenAI GPT가 검색 근거 안에서 답변하도록 구성했습니다.

## 실행

```bash
npm ci
```

프로젝트 루트에 `.env.local`을 만들고 OpenAI API 키를 입력합니다.

```bash
OPENAI_API_KEY=발급받은_API_키
OPENAI_MODEL=gpt-6-astra
```

그다음 개발 서버를 실행합니다.

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다. 배포 전에는 아래 명령으로 확인합니다.

```bash
npm run typecheck
npm run build
```

## 현재 기능

- 7개 빠른 질문과 자유 질문 입력
- 검색된 근거와 질문을 OpenAI Responses API에 전달해 한국어 답변 생성
- GPT 답변 문장에 `[근거 1]` 형식의 근거 번호 표시
- API 키가 없거나 호출에 실패하면 기존 검색 답변으로 자동 전환
- 주요 질문에 절차·교육시간·보고기한·보존기간 등 구체적인 핵심 내용 표시
- 등록된 근거자료 4종을 동시에 검색하고 문서명·조문·PDF 쪽·질의응답 번호를 구분해 표시
- 관리감독자 교육 질의응답 11개를 질문·답변 단위로 청킹해 검색
- 2022년 서울특별시교육청 안전보건관리규정 본문 35개 조문과 부칙을 조문 단위로 청킹해 검색
- 교육, 산업재해, MSDS, 도급·용역, 위험성평가, 건강진단, 작업환경측정 등의 관련 장 검색
- 관련도가 높은 매뉴얼 페이지 최대 3개의 원문 문맥 표시
- 교육청 매뉴얼 결과는 공식 원문 PDF로 연결하고, 첨부자료 결과는 로컬 원문 쪽을 안내
- 짧은 후속 질문에서 직전 질문의 업무 분야 유지
- 관련 근거가 부족한 질문에는 답변 생성 중단
- PC, 태블릿, 모바일 반응형 화면과 파란색 바탕
- 다른 팀 기능 URL을 환경 변수로 연결하는 확장 지점

## 중요한 제한

GPT는 검색된 근거자료만 전달받아 답변하도록 지시됩니다. API 키가 설정되지 않았거나 OpenAI 호출이 실패하면 검색어와 업무 분야를 이용한 기존 안내를 표시합니다. 이미지 문서와 한글 글꼴 인코딩이 깨진 PDF는 Windows 한국어 OCR로 색인을 만들었으며, 표·숫자·기한에는 인식 오류가 있을 수 있습니다. 한자·무작위 영문·깨진 기호가 섞인 줄은 화면에서 제외하고, 읽을 수 있는 문장이 없는 페이지는 원문 확인 안내를 표시합니다.

검색 대상은 2025년 3월 매뉴얼, 학교현장 위험요인 연수자료, 관리감독자 정기교육 질의응답 모음, 2022년 9월 1일 제정 서울특별시교육청 안전보건관리규정입니다. 현행 법령과 이후 개정 사항을 자동으로 검증하지 않으므로 실제 업무 판단 전 원문과 최신 기준을 확인해야 합니다. 원본 PDF와 HWP는 프로젝트에 복제하지 않고 검색 색인만 포함합니다.

## 구성

- `src/app/api/ask/route.ts`: 질문 검증, 근거 검색, OpenAI Responses API 호출
- `src/lib/manual-search.ts`: 업무 분야 판별, 페이지 순위, 발췌문 생성
- `src/data/manual-pages.json`: 77쪽 중 본문 53쪽의 OCR 검색 색인
- `src/data/hazard-prevention-pages.json`: 위험요인·재해예방 자료 93쪽 중 본문 80쪽의 OCR 검색 색인
- `src/data/supervisor-training-qna.json`: 관리감독자 정기교육 질의응답 11개 청크
- `src/data/safety-health-regulation.json`: 안전보건관리규정 35개 조문과 부칙 청크
- `scripts/build-manual-index.py`: OCR 결과를 검색 색인으로 변환
- `scripts/build-hazard-index.py`: 위험요인 자료 OCR을 검색 색인으로 변환
- `scripts/build-supervisor-training-qna.mjs`: kordoc 변환 Markdown을 질의응답 단위 색인으로 변환
- `scripts/build-safety-health-regulation-index.py`: 페이지별 한글 OCR을 조문 단위 색인으로 변환
- `src/components/chat-workspace.tsx`: 검색 화면과 근거 카드

## 다른 기능과 합치기

`.env.example`을 `.env.local`로 복사하고 준비된 기능의 URL을 입력합니다. 지원 값은 `NEXT_PUBLIC_RISK_ASSESSMENT_URL`, `NEXT_PUBLIC_MSDS_URL`, `NEXT_PUBLIC_FORMS_URL`, `NEXT_PUBLIC_CONTRACTOR_URL`입니다. 관련 검색 결과에 설정된 URL만 후속 기능 버튼으로 표시됩니다.

OpenAI API 키는 `NEXT_PUBLIC_` 변수에 넣지 않고 서버 전용 `OPENAI_API_KEY`로 관리합니다. Supabase는 문서가 늘어나거나 여러 사용자가 공유해야 할 때 도입하면 됩니다.
