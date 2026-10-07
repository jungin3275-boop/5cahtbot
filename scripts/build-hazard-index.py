"""Convert OCR from the school hazard-prevention slide deck into a search index."""

import argparse
import hashlib
import json
from pathlib import Path


SECTIONS = [
    (3, 18, "risk", "위험 인식과 사고 원인"),
    (19, 20, "inspection", "산업안전보건 자율점검"),
    (21, 22, "signage", "안전보건표지"),
    (23, 27, "ppe", "보호구 지급·착용"),
    (28, 28, "contractor", "도급·용역 안전보건조치"),
    (29, 29, "education", "안전보건교육"),
    (30, 30, "health", "일반건강검진"),
    (31, 32, "accident", "산업재해 보고·기록"),
    (33, 34, "risk", "위험성평가"),
    (35, 36, "musculoskeletal", "근골격계 부담작업"),
    (37, 38, "msds", "물질안전보건자료 MSDS"),
    (39, 56, "statistics", "학교 산업재해 현황과 특징"),
    (57, 59, "slip", "넘어짐 사고와 예방"),
    (60, 65, "burn", "열탕소독 화상사고와 예방"),
    (66, 68, "storage", "정리정돈과 시설창고 개선"),
    (69, 69, "ventilation", "보일러실 환기 개선"),
    (70, 72, "lighting", "조도·사다리·통로 개선"),
    (73, 74, "machinery", "송풍기 안전관리"),
    (75, 77, "electrical", "전기설비 감전 예방"),
    (78, 82, "fall", "옥상·계단 추락과 충돌 예방"),
]


def section_for(pdf_page: int):
    for first, last, category, section in SECTIONS:
        if first <= pdf_page <= last:
            return category, section
    return None


def clean_text(raw: str) -> str:
    lines = []
    for line in raw.splitlines():
        line = " ".join(line.split()).strip()
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
    if len(raw_pages) != 93:
        raise ValueError("Expected OCR results for all 93 PDF pages")

    pages = []
    for page in raw_pages:
        location = section_for(page["pdfPage"])
        if location is None:
            continue
        category, section = location
        text = clean_text(page["text"])
        if len(text) < 40:
            continue
        pages.append({"pdfPage": page["pdfPage"], "category": category, "section": section, "text": text})

    payload = {
        "sourceTitle": "학교현장 위험요인과 재해예방 관리 연수자료",
        "sourceDate": "",
        "sourceUrl": None,
        "sourceSha256": hashlib.sha256(args.source_pdf.read_bytes()).hexdigest(),
        "pdfPageCount": 93,
        "extraction": "Windows Korean OCR; verify all excerpts against the original PDF",
        "pages": pages,
    }
    args.output_json.parent.mkdir(parents=True, exist_ok=True)
    args.output_json.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Indexed {len(pages)} pages, {sum(len(page['text']) for page in pages)} characters")
    print(f"SHA-256 {payload['sourceSha256']}")


if __name__ == "__main__":
    main()
