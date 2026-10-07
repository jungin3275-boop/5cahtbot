"""Convert Korean Windows OCR output into the bundled, page-level search index."""

import argparse
import hashlib
import json
from pathlib import Path

SECTIONS = [
    (15, 16, "inspection", "산업안전보건 자율점검관리"),
    (17, 19, "signage", "법령 요지 게시 및 안전보건표지"),
    (21, 22, "ppe", "안전보호구 지급·관리"),
    (23, 41, "contractor", "도급·공사·용역 안전보건 조치"),
    (43, 45, "education", "안전보건교육"),
    (47, 50, "accident", "산업재해 발생 시 대응·보고"),
    (51, 52, "health", "건강진단"),
    (53, 56, "risk", "위험성평가"),
    (57, 59, "musculoskeletal", "근골격계부담작업 유해요인조사"),
    (61, 65, "msds", "물질안전보건자료 MSDS"),
    (67, 68, "environment", "작업환경측정"),
    (71, 72, "serious", "안전보건 관계 법령상 의무이행 점검"),
    (75, 76, "forms", "서식·부록"),
]

SOURCE_URL = (
    "https://safety.sen.go.kr/fus/file/down0010f.do"
    "?attach_file_id=616&file_seq=1&alias_name=20250415032919300_1"
)


def section_for(pdf_page: int):
    for first, last, category, section in SECTIONS:
        if first <= pdf_page <= last:
            return category, section
    return None


def clean_text(raw: str) -> str:
    lines = []
    for line in raw.splitlines():
        line = " ".join(line.split()).strip()
        if not line or line.startswith(("lil물", "신법한전보건업무", "과다다과")):
            continue
        if len(line) < 3:
            continue
        if sum("가" <= char <= "힣" for char in line) < 2 and "MSDS" not in line.upper():
            continue
        lines.append(line)
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("ocr_json", type=Path)
    parser.add_argument("source_pdf", type=Path)
    parser.add_argument("output_json", type=Path)
    args = parser.parse_args()

    raw_pages = json.loads(args.ocr_json.read_text(encoding="utf-8-sig"))
    if len(raw_pages) != 77 or [page["pdfPage"] for page in raw_pages] != list(range(1, 78)):
        raise ValueError("Expected OCR results for every PDF page from 1 through 77")

    pages = []
    for page in raw_pages:
        location = section_for(page["pdfPage"])
        if location is None:
            continue
        category, section = location
        text = clean_text(page["text"])
        if len(text) < 60:
            continue
        pages.append({"pdfPage": page["pdfPage"], "category": category, "section": section, "text": text})

    payload = {
        "sourceTitle": "서울특별시교육청 산업안전보건업무 매뉴얼",
        "sourceDate": "2025-03",
        "sourceUrl": SOURCE_URL,
        "sourceSha256": hashlib.sha256(args.source_pdf.read_bytes()).hexdigest(),
        "pdfPageCount": 77,
        "extraction": "Windows Korean OCR; verify all excerpts against the original PDF",
        "pages": pages,
    }
    args.output_json.parent.mkdir(parents=True, exist_ok=True)
    args.output_json.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Indexed {len(pages)} pages, {sum(len(page['text']) for page in pages)} characters")
    print(f"SHA-256 {payload['sourceSha256']}")


if __name__ == "__main__":
    main()
