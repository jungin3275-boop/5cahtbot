import manual from "@/data/manual-pages.json";
import hazardPrevention from "@/data/hazard-prevention-pages.json";
import supervisorTraining from "@/data/supervisor-training-qna.json";
import safetyHealthRegulation from "@/data/safety-health-regulation.json";
import educationMinistryGuidance from "@/data/education-ministry-guidance.json";
import supervisorTraining2026 from "@/data/supervisor-training-2026.json";
import newEmployeeTraining from "@/data/new-employee-training.json";
import inspectionBestPractices from "@/data/inspection-best-practices.json";
import workerHealthSupport from "@/data/worker-health-support.json";
import safetySiren2026 from "@/data/safety-siren-2026.json";
import regularWorkerTrainingCurrent from "@/data/regular-worker-training-current.json";
import safetyHealthCommitteeCurrent from "@/data/safety-health-committee-current.json";
import contractorCouncilGuidance from "@/data/contractor-council-guidance.json";
import seriousAccidentResponseManual from "@/data/serious-accident-response-manual.json";
import facilityHazardousWorkRules from "@/data/facility-hazardous-work-rules.json";
import seriousAccidentPreventionGuide from "@/data/serious-accident-prevention-guide.json";
import highRiskFactorResponseGuidePart1 from "@/data/high-risk-factor-response-guide-part1.json";
import workerTrainingBigText2026 from "@/data/worker-training-big-text-2026.json";
import schoolWorkerChemicalSafety from "@/data/school-worker-chemical-safety.json";
import schoolWorkerGeneralSafety from "@/data/school-worker-general-safety.json";
import aerialWorkPlatformSafetyManual from "@/data/aerial-work-platform-safety-manual.json";
import workplaceHealthManagement2024 from "@/data/workplace-health-management-2024.json";
import educationServiceSafetyHealthFaq from "@/data/education-service-safety-health-faq.json";
import disinfectantSpraySafety from "@/data/disinfectant-spray-safety.json";
import riskAssessmentTiming from "@/data/risk-assessment-timing.json";

export type Evidence = {
  pdfPage: number;
  referenceLabel?: string;
  section: string;
  excerpt: string;
  sourceTitle: string;
  sourcePublisher?: string;
  sourceDate: string;
  url?: string;
};

export type SearchResponse = {
  status: "found" | "not_found";
  message: string;
  keyPoints: string[];
  sourceTitle: string;
  sourceDate: string;
  evidence: Evidence[];
  relatedEvidence?: Evidence[];
  topic?: "risk" | "msds" | "contractor";
  answerMode?: "gpt" | "search";
  model?: string;
};

const CATEGORY_GUIDES: Record<string, { message: string; keyPoints: string[] }> = {
  inspection: {
    message: "학교의 자율점검은 분야별 점검표로 위험요인을 반복 확인하고 미흡사항을 개선하는 방식으로 운영합니다.",
    keyPoints: [
      "시설관리·청소·급식(조리)·통학차량보조 분야별 점검표를 주 1회 작성하고 월 1회 보고하도록 안내합니다.",
      "기계·설비의 안전장치 작동 상태와 유지·보수 기록을 확인합니다.",
      "보호구 지급·착용과 방호장치 사용 상태를 점검합니다.",
      "조도, 바닥 상태, 통행로 장애물, 낙하물과 산소결핍 가능성 등 작업환경을 확인합니다.",
    ],
  },
  ppe: {
    message: "보호구는 작업별 위험에 맞는 제품을 개인별로 지급하고, 실제 착용 상태와 기능을 계속 확인해야 합니다.",
    keyPoints: [
      "개인보호구는 개인별로 지급하고 지급대장에 각 근로자가 서명합니다.",
      "급식작업에는 방수앞치마, 미끄럼방지 장화, 베임방지장갑 등 작업에 맞는 보호구를 확인합니다.",
      "보호 기능이 사라졌거나 신체에 맞지 않는 보호구는 교체합니다.",
      "보호구를 지급하는 데 그치지 않고 미착용 상태로 작업하지 않도록 교육·지도합니다.",
    ],
  },
  musculoskeletal: {
    message: "반복동작·무리한 힘·부적절한 자세가 있는 작업은 유해요인조사와 작업환경 개선을 함께 진행해야 합니다.",
    keyPoints: [
      "근골격계부담작업 유해요인조사는 3년 주기로 실시하도록 안내합니다.",
      "조사 결과에 따라 작업환경 개선계획을 작성하고 근로자 교육을 실시합니다.",
      "식판·조리기구 등은 운반대차를 이용하고 인력 운반 시 소량으로 나누어 옮깁니다.",
      "산업재해로 근골격계질환이 인정된 작업은 수시 유해요인조사 대상 여부를 확인합니다.",
    ],
  },
  slip: {
    message: "출입문 턱·바닥 경사·움직이는 소독판이 연속으로 겹치면 넘어짐 사고로 이어질 수 있어 동선 전체를 개선해야 합니다.",
    keyPoints: [
      "출입문 턱과 바닥 단차를 제거하거나 실리콘·미장 등으로 완만하게 처리합니다.",
      "움직이는 소독판 패드와 경사로 발판은 고정하고 미끄럼방지 조치를 합니다.",
      "타일 바닥을 평탄하게 보수하고 위험 단차에는 식별 가능한 경고표지를 부착합니다.",
      "가능하면 휴게실에서 외부로 바로 나갈 수 있는 별도 동선을 검토합니다.",
    ],
  },
  burn: {
    message: "열탕소독 작업은 뜨거운 물과 무거운 소쿠리를 동시에 다루므로 작업방법·인원·보호구를 함께 바꿔야 합니다.",
    keyPoints: [
      "소쿠리를 들어 올리기 전에 회전솥의 뜨거운 물을 먼저 배수합니다.",
      "고온·중량물 취급은 2인 1조로 작업합니다.",
      "방수앞치마가 발등까지 덮도록 착용하고 장화와 앞치마 사이로 물이 들어갈 틈이 없는지 확인합니다.",
      "작업 전 TBM에서 당일 열탕소독 절차와 보호구 상태를 함께 확인합니다.",
    ],
  },
  ventilation: {
    message: "보일러실은 가스 누출 시 좁은 공간에 축적되지 않도록 환기설비의 상시 작동성과 접근성을 확보해야 합니다.",
    keyPoints: [
      "환기팬 스위치와 흡·배기구 주변의 적재물을 제거합니다.",
      "퇴근 후에도 누출 상황에 대응할 수 있도록 가스감지기와 환기팬 연동을 검토합니다.",
      "배관과 접속부의 결함 및 누출 여부를 정기적으로 점검합니다.",
      "환기설비가 실제로 작동하는지 점검 기록을 남깁니다.",
    ],
  },
  electrical: {
    message: "노출된 충전부와 접지되지 않은 콘센트는 감전·누전·화재 위험이 있어 사용 전 방호조치가 필요합니다.",
    keyPoints: [
      "차단기 충전부는 절연덮개나 적절한 외함으로 신체 접촉을 방지합니다.",
      "습기와 먼지가 충전부에 쌓이지 않도록 벽부 콘센트 등 적합한 설비로 개선합니다.",
      "압축기 등 전기 사용부하가 큰 기기의 콘센트에는 접지를 설치합니다.",
      "전선 피복·절연 상태와 누전차단기 작동 여부를 함께 점검합니다.",
    ],
  },
  fall: {
    message: "옥상·계단·현수막 게시대 작업은 임시 발판 대신 고정된 통로와 추락방지 시설을 먼저 마련해야 합니다.",
    keyPoints: [
      "옥상 덕트와 배관을 넘는 통로에는 고정식 안전계단과 미끄럼방지 표면을 설치합니다.",
      "옥상 가장자리에는 기준에 맞는 안전난간을 설치합니다.",
      "사다리 작업은 지반 상태와 보조다리 고정을 확인하고 강풍·우천 시 작업을 통제합니다.",
      "현수막 작업 아래의 보행자·차량 통행과 상부 전선 접촉 위험도 함께 통제합니다.",
    ],
  },
  education: {
    message: "안전보건교육은 교육 대상과 시점에 따라 필요한 시간과 방법이 달라집니다.",
    keyPoints: [
      "현업업무종사자(조리·시설관리·청소 등)는 채용 시 8시간 교육을 실시합니다.",
      "일용근로자는 근로기간이 1주일 이하이면 1시간, 1주일 초과 1개월 이하이면 4시간으로 안내되어 있습니다.",
      "교육은 현장·온라인·집체 방식으로 실시할 수 있습니다.",
      "현업업무종사자의 정기교육은 반기별 12시간입니다.",
      "교육기록과 수료증의 보존기간은 기록 종류와 적용 근거를 확인해야 하며, 관리감독자 교육 이수자료는 교육일로부터 5년 보존이 권장됩니다.",
    ],
  },
  accident: {
    message: "산업재해 발생 시에는 응급조치와 보고를 진행하고, 조사표 제출과 재발방지 조치를 이어서 실시하도록 안내합니다.",
    keyPoints: [
      "3일 이상 휴업재해는 재해발생일을 제외하고 휴무일·공휴일을 포함한 연속 3일 이상 휴업을 기준으로 안내합니다.",
      "사고 발생 즉시 관계 기관에 유선 보고하고, 산업재해조사표는 발생일 기준 1개월 이내 제출합니다.",
      "재발방지계획을 수립·시행하고 산업재해조사표와 함께 3년간 보존합니다.",
      "사고가 발생한 작업에는 수시 위험성평가를 실시하며, 근골격계질환은 해당 공정의 수시 유해요인조사를 검토합니다.",
    ],
  },
  msds: {
    message: "세제도 제품의 성분과 사용 용도에 따라 MSDS 관리 대상이 될 수 있으므로 제품 자료를 먼저 확인해야 합니다.",
    keyPoints: [
      "사용 중인 화학제품 목록을 정리하고 공급처 또는 제조회사에서 MSDS를 확보합니다.",
      "매뉴얼은 세제·락스·윤활유·락카·휘발유 등을 MSDS 확인 예시로 제시합니다.",
      "MSDS 15번 항목의 법적 규제현황과 3번 항목의 구성성분·함유량을 확인합니다.",
      "대상 제품은 근로자가 쉽게 접근할 수 있는 장소에 MSDS를 게시·비치하고, 용기 경고표지와 작업공정별 관리요령을 마련해 교육합니다.",
    ],
  },
  contractor: {
    message: "도급·공사 계약 전에는 안전보건 평가기준과 제출서류를 제시하고, 금액과 규모에 따른 추가 조치를 확인하도록 안내합니다.",
    keyPoints: [
      "공고 시 안전보건수준 평가기준을 제시하고 안전보건관리 활동계획서, 체크리스트, 준수 서약서 등을 제출받습니다.",
      "총 공사금액 2천만원 이상은 산업안전보건관리비 계상 여부를 확인합니다.",
      "50억원 이상 건설공사는 단계별 안전보건대장을 작성하고 전문가를 통해 적정성을 확인합니다.",
      "공사 종료 후 관리비를 정산하고 업체의 안전보건 이행 수준을 평가해 다음 업체 선정에 반영합니다.",
    ],
  },
  risk: {
    message: "위험성평가는 위험요인을 찾고 위험수준을 판단한 뒤 감소대책을 실행하고 기록하는 절차로 진행합니다.",
    keyPoints: [
      "사전준비 → 유해·위험요인 파악 → 위험성 결정 → 감소대책 수립·실행 → 결과 공유 → 기록·보존 순으로 진행합니다.",
      "근로자가 위험요인 파악과 평가 과정에 참여해야 합니다.",
      "최초평가 외에 산업재해 발생, 작업자·설비·방법 변경, 정비·보수 작업 등의 경우 수시평가를 실시합니다.",
      "정기평가는 매년 1회 실시하고, 평가 및 조치 결과는 3년간 보존합니다.",
    ],
  },
  health: {
    message: "일반건강진단 주기는 사무직 여부에 따라 다르고, 유해인자 노출 업무는 특수·배치 전 건강진단을 별도로 확인해야 합니다.",
    keyPoints: [
      "조리·시설관리·청소·통학차량보조 등 비사무직은 1년에 1회 일반건강진단을 실시합니다.",
      "교원·지방직 공무원 등 사무직은 2년에 1회 일반건강진단을 실시합니다.",
      "특수건강진단 대상 유해인자에 노출되는 근로자는 배치 전 건강진단과 특수건강진단 대상 여부를 확인합니다.",
      "매뉴얼은 특수건강진단을 배치 후 6개월 이내 첫 검진 후 1년마다 실시하도록 안내합니다.",
    ],
  },
  environment: {
    message: "작업환경측정 대상 여부는 취급 제품의 MSDS와 실제 작업시간·노출조건을 함께 확인해 판단합니다.",
    keyPoints: [
      "MSDS 3번 항목에서 작업환경측정 대상 유해인자의 명칭과 함유량을 확인합니다.",
      "화학적 유해인자는 매뉴얼 기준으로 해당 성분 함량이 1% 이상인 제품인지 확인합니다.",
      "허용소비량 이하 작업장, 임시작업·단시간작업 등은 제외 조건 해당 여부를 별도로 검토합니다.",
      "신규 또는 변경 시 30일 이내 측정하고 이후 6개월마다 1회 이상 실시하는 기준을 안내합니다.",
    ],
  },
  heat: {
    message: "폭염 작업은 체감온도를 확인하고 단계에 따라 작업시간과 휴식시간을 조정해야 합니다.",
    keyPoints: [
      "체감온도 31℃ 이상이면 온열질환 예방조치를 시작하고 온도를 주기적으로 확인합니다.",
      "체감온도 33℃ 이상이면 2시간마다 20분 이상의 휴식을 부여합니다.",
      "체감온도가 높아지면 옥외작업을 단축하거나 중지하고 민감군을 별도로 보호합니다.",
      "열사병이 의심되면 즉시 119에 신고하고 시원한 장소로 옮겨 체온을 낮춥니다.",
    ],
  },
  weather: {
    message: "호우·태풍 전후에는 시설물, 전기설비, 배수로를 점검하고 위험 작업을 중지해야 합니다.",
    keyPoints: [
      "기상특보를 확인하고 옥외 적치물과 시설물을 고정하며 배수로를 정비합니다.",
      "호우·태풍 중에는 옥외작업과 침수·붕괴 위험 장소 출입을 중지합니다.",
      "침수 우려 구역의 전원을 차단하고 젖은 손으로 전기설비를 만지지 않습니다.",
      "복구 작업 전 구조물과 전기설비의 안전 상태를 확인하고 보호구를 착용합니다.",
    ],
  },
  struck: {
    message: "물체에 맞거나 운반물에 부딪히는 사고는 적재·운반 방법과 통로 상태를 함께 개선해야 합니다.",
    keyPoints: [
      "운반물은 떨어지지 않도록 고정하고 과도하게 높이 쌓지 않습니다.",
      "무거운 급식 운반카트는 2인 1조로 이동하고 전방 시야를 확보합니다.",
      "트렌치와 단차는 덮개와 표시로 관리하고 통로에 장애물을 두지 않습니다.",
      "사고가 발생하면 추가 낙하 위험을 차단하고 부상자를 안전하게 응급조치합니다.",
    ],
  },
};

const CATEGORY_TERMS: Record<string, string[]> = {
  regulation: ["안전보건관리규정", "관리규정", "규정목적", "적용범위", "보칙", "시행일"],
  organization: ["안전보건관리조직", "안전보건관리책임자", "안전관리자", "보건관리자", "산업보건의", "산업안전보건위원회"],
  inspection: ["점검", "자율점검"],
  signage: ["표지", "게시", "부착", "법령요지"],
  ppe: ["보호구", "안전모", "안전화"],
  contractor: ["도급", "용역", "업체", "계약", "공사", "수급인"],
  supervisor: ["관리감독자", "집합교육", "비대면실시간교육", "우편통신교육", "수료증", "교육이수", "연간16시간"],
  education: ["교육", "채용", "신규", "훈련"],
  accident: ["산업재해", "재해", "사고", "보고", "응급", "부상", "중대재해"],
  health: ["건강진단", "건강검진", "검진", "건강관리"],
  risk: ["위험성평가", "위험성", "위험요인", "유해위험요인"],
  musculoskeletal: ["근골격계", "부담작업", "유해요인조사", "허리통증", "요통", "손목작업", "오래서서", "작업자세", "중량물"],
  msds: ["msds", "물질안전보건자료", "화학물질", "세제", "세척제", "소독제"],
  environment: ["작업환경측정", "작업환경", "노출", "측정"],
  heat: ["온열질환", "폭염", "체감온도", "열사병", "열탈진", "무더위", "휴게시설"],
  weather: ["호우", "태풍", "폭우", "침수", "강풍", "산사태", "악천후"],
  struck: ["물체에맞음", "낙하물", "운반카트", "식판운반차", "배식차"],
  slip: ["넘어짐", "미끄러짐", "출입문턱", "소독판", "단차"],
  burn: ["열탕소독", "화상", "뜨거운물", "회전솥", "소쿠리"],
  storage: ["시설창고", "창고정리", "적재물", "정리정돈"],
  ventilation: ["보일러실", "환기팬", "가스누출", "환기설비"],
  lighting: ["조도", "어두운", "조명", "배관공동구", "미화창고"],
  machinery: ["송풍기", "벨트", "캔버스", "윤활"],
  electrical: ["감전", "차단기", "충전부", "콘센트", "접지", "누전"],
  fall: ["추락", "떨어짐", "옥상", "사다리", "안전난간", "현수막", "안전계단"],
  workstop: ["작업중지권", "작업중지", "작업재개", "급박한위험"],
  hotwork: ["화기작업", "용접", "불티", "화재감시자"],
  confined: ["밀폐공간", "산소농도", "송기마스크", "공기호흡기", "원콜"],
  aerial: ["고소작업대", "차량탑재형고소작업대", "과상승방지장치"],
  elevator: ["리프트", "엘리베이터", "승강로", "인터록"],
  logging: ["벌목", "벌도", "전지작업", "수목작업"],
  chemical: ["위험물질", "인화성물질", "유해물질", "화학물질누출", "잔류물질"],
  maintenance: ["비정형작업", "정비작업", "보수작업", "잠금장치", "loto"],
  loading: ["상하차", "적재화물", "화물고정", "팰릿"],
  construction: ["건설기계", "굴착기", "버킷"],
  forklift: ["지게차", "포크", "후진경보기"],
  crane: ["크레인", "줄걸이", "와이어로프", "슬링벨트"],
  parking: ["기계식주차", "주차설비"],
  firstaid: ["응급처치", "절단사고", "골절", "부목", "화상응급", "가스중독"],
  jobstress: ["직무스트레스", "업무스트레스", "스트레스관리"],
  bullying: ["직장내괴롭힘", "괴롭힘신고", "고충처리"],
  cardio: ["뇌심혈관", "뇌졸중", "심근경색", "한쪽마비", "가슴통증"],
  sharp: ["분리수거", "유리조각", "날카로운폐기물", "찔림"],
  serious: ["중대재해처벌", "의무이행", "관계법령"],
  forms: ["서식", "양식"],
};

type QuestionRoute = {
  test: RegExp;
  category: string;
  preferredSections: string[];
  focusTerms?: string[];
  guide?: { message: string; keyPoints: string[] };
};

function directRoute(
  test: RegExp,
  category: string,
  preferredSections: string[],
  message: string,
  keyPoints: string[],
): QuestionRoute {
  return { test, category, preferredSections, guide: { message, keyPoints } };
}

/**
 * 자주 묻는 질문은 분야 단위의 공통 문장보다 질문에 직접 답하는 청크를 우선한다.
 * 섹션 이름을 사용하므로 같은 뜻의 질문 표현에도 적용되고, 자료가 바뀌면 답변도 함께 바뀐다.
 */
const QUESTION_ROUTES: QuestionRoute[] = [
  // 1·2차 비교 점검에서 질문별 직답이 약했던 항목을 먼저 처리한다.
  directRoute(/신규채용근로자.*몇시간/u, "education", ["계약 형태별 채용 시 교육시간"],
    "신규 채용 현업업무종사자는 원칙적으로 채용 시 8시간 이상의 안전보건교육을 받아야 합니다.",
    ["일용근로자와 근로계약기간이 1주일 이하인 기간제근로자는 1시간 이상입니다.", "근로계약기간이 1주일 초과 1개월 이하인 기간제근로자는 4시간 이상입니다.", "해당 근로자의 계약 형태를 확인한 뒤 교육시간을 정합니다."]),
  directRoute(/관리감독자.*매년.*몇시간/u, "supervisor", ["Q7. 관리감독자 정기교육은 매년 이수하여야 하는지", "Q2. 관리감독자 정기교육에 대한 집합교육 의무 비율", "Q10. 정기교육 이수에 따른 수료증"],
    "관리감독자는 매년 16시간 이상의 정기 안전보건교육을 이수해야 합니다.",
    ["해당 연도 총 교육시간의 2분의 1 이상은 집합교육 또는 비대면 실시간교육으로 이수합니다.", "교육 이수자료는 교육일로부터 5년간 보존하는 것이 권장됩니다."]),
  directRoute(/관리감독자.*근로자교육.*직접/u, "supervisor", ["Q11. 관리감독자가 소속 학교"],
    "관리감독자는 소속 근로자에게 안전보건교육을 직접 실시할 수 있습니다.",
    ["산업안전보건법 시행규칙에 따라 관리감독자에게 강사 자격이 인정됩니다.", "교육 내용·시간·참석자와 실시 결과를 기록해 보관합니다."]),
  directRoute(/산업재해.*무엇부터/u, "accident", ["중대산업재해 최초 발견자의 즉시 조치", "제29조(사고 발생 시 처리 절차)", "산업재해 보고와 재발방지"],
    "산업재해가 발생하면 먼저 작업과 기계를 멈추고, 부상자 응급구호와 2차 사고 방지 조치를 합니다.",
    ["119와 학교 관리자에게 즉시 알리고 사고 장소의 출입을 통제합니다.", "부상자를 안전하게 구조하되 구조자가 추가 위험에 노출되지 않게 합니다.", "초기 조치 후 교육청과 관계기관 보고, 산업재해조사표 제출, 재발방지조치를 이어서 실시합니다."]),
  directRoute(/사고.*처음발견/u, "accident", ["중대산업재해 최초 발견자의 즉시 조치", "2차 사고 방지와 사고 현장 보존"],
    "사고를 처음 발견한 사람은 즉시 작업과 기계를 멈추고 주변 사람을 위험구역에서 대피시켜야 합니다.",
    ["119와 관리자에게 사고 위치, 부상자 수와 상태, 사고 경위를 알립니다.", "자신의 안전을 확보한 뒤 가능한 범위에서 응급조치를 합니다.", "구급대가 도착하면 사고 상황과 실시한 조치를 인계합니다."]),
  directRoute(/부상자.*누구.*순서.*보고/u, "accident", ["중대산업재해 최초 발견자의 즉시 조치", "제29조(사고 발생 시 처리 절차)"],
    "부상자가 발생하면 119와 학교 관리자에게 즉시 알리고, 관리자 보고 체계에 따라 교육청과 관계기관에 보고합니다.",
    ["119 신고 시 학교 주소와 건물·층 등 정확한 위치를 설명합니다.", "부상자 수와 다친 정도, 사고 경위를 함께 알립니다.", "구급대에 현장 상황과 이미 실시한 응급조치를 인계합니다."]),
  directRoute(/산업재해조사표.*언제까지/u, "accident", ["산업재해 보고와 재발방지", "붙임4. 산업재해 Q2"],
    "산업재해조사표는 산업재해가 발생한 날부터 1개월 이내에 관할 지방고용노동관서에 제출합니다.",
    ["사망 또는 3일 이상 휴업이 필요한 부상·질병이 제출 대상입니다.", "휴업일수는 재해 발생일을 제외하고 휴무일과 공휴일을 포함해 계산합니다."]),
  directRoute(/한달.*지나.*휴업/u, "accident", ["붙임4. 산업재해 Q3", "붙임4. 산업재해 Q2"],
    "사고 후 한 달이 지나 휴업했더라도 의사의 진단 소견상 3일 이상 휴업이 필요한 산업재해라면 조사표 제출 대상을 확인해야 합니다.",
    ["휴업일수와 필요성은 의사의 진단 소견 등 객관적 근거로 판단합니다.", "보고를 피하려고 사업주가 휴업시기를 임의로 조정하면 산재 미보고 책임이 발생할 수 있습니다."]),
  directRoute(/퇴직.*산재.*승인/u, "accident", ["붙임4. 산업재해 Q4"],
    "근로자가 퇴직한 뒤 산재 승인을 받았더라도 산업재해라면 보고 대상에 해당합니다.",
    ["퇴직 여부만으로 보고 의무가 없어지지 않습니다.", "보고 대상과 시점은 승인 내용과 휴업일수 등 객관적 자료를 확인해 처리합니다."]),
  directRoute(/사고보고.*끝난뒤/u, "accident", ["붙임4. 산업재해 Q8", "산업재해 보고와 재발방지"],
    "사고 보고 후에는 재발방지대책을 시행하고 해당 작업에 대한 수시 위험성평가를 실시합니다.",
    ["3일 이상 휴업이 필요한 재해가 발생한 작업은 수시 위험성평가를 지체 없이 실시합니다.", "근골격계질환이 업무상 질병으로 인정되면 해당 작업의 수시 유해요인조사를 실시합니다.", "개선조치의 이행 여부를 확인하고 관련 기록을 보존합니다."]),
  directRoute(/위험성평가.*매년실시/u, "risk", ["근로자 참여 위험성평가", "붙임4. 위험성평가 Q1", "제23조(위험성평가의 실시)"],
    "정기 위험성평가는 전체 작업을 대상으로 매년 1회 실시합니다.",
    ["산업재해 발생이나 작업자·설비·방법 변경 시에는 정기평가를 기다리지 않고 수시평가를 실시합니다.", "위험성평가 실시규정은 최초 작성 후 변동사항이 없으면 계속 활용할 수 있습니다."]),
  directRoute(/최초위험성평가.*정기위험성평가/u, "risk", ["최초·정기·수시 위험성평가 실시 시기", "근로자 참여 위험성평가", "제23조(위험성평가의 실시)"],
    "최초 위험성평가는 사업장의 전체 작업과 모든 유해·위험요인을 대상으로 처음 실시하는 평가이고, 정기 위험성평가는 기존 평가 결과의 적정성을 매년 다시 검토하는 평가입니다.",
    ["두 평가 모두 유해·위험요인 파악, 위험성 결정, 감소대책 수립·이행과 기록 절차로 진행합니다.", "작업·설비·방법 변경이나 산업재해 발생 시에는 별도로 수시평가를 실시합니다."]),
  directRoute(/수시위험성평가.*어떤경우|산업재해.*위험성평가.*다시/u, "risk", ["근로자 참여 위험성평가", "산업안전보건법 과제 9. 유해‧위험 방지 활동", "붙임4. 산업재해 Q8"],
    "산업재해가 발생했거나 작업자·설비·작업방법이 바뀐 경우에는 수시 위험성평가를 실시합니다.",
    ["3일 이상 휴업이 필요한 재해가 발생한 작업은 수시평가를 지체 없이 실시합니다.", "건물·기계·기구의 신규 도입이나 보수·정비로 위험요인이 달라진 경우에도 실시합니다.", "평가 후 감소대책을 시행하고 결과를 근로자와 공유합니다."]),
  directRoute(/근로자.*위험성평가.*참여/u, "risk", ["근로자 참여 위험성평가"],
    "근로자는 현장의 유해·위험요인을 찾고 위험수준과 개선대책을 검토하는 과정에 참여해야 합니다.",
    ["해당 작업의 유해·위험요인을 파악하는 과정에 참여합니다.", "위험성을 결정하고 감소대책을 수립·이행하는 과정에 참여합니다.", "평가 결과를 공유받습니다."]),
  directRoute(/위험성평가.*기록.*몇년|개선조치기록.*몇년/u, "risk", ["근로자 참여 위험성평가", "제23조(위험성평가의 실시)"],
    "위험성평가 결과와 개선조치 기록은 3년간 보존합니다.",
    ["평가 대상, 위험요인, 위험성 결정 결과와 감소대책을 기록합니다.", "개선조치의 담당자·기한·완료 여부를 함께 관리합니다."]),
  directRoute(/세제.*msds.*대상/u, "msds", ["물질안전보건자료 관리", "물질안전보건자료 게시·비치·교육"],
    "세제·락스 등 학교에서 사용하는 화학제품은 공급처나 제조사에서 MSDS를 확보한 뒤 관리 대상 여부와 안전조치를 확인합니다.",
    ["학교에서 사용하는 세제·락스 등 화학제품 목록을 먼저 작성합니다.", "제조사나 공급처에서 제품 MSDS를 확보합니다.", "MSDS 대상 제품은 근로자가 쉽게 볼 수 있는 장소에 게시·비치하고, 용기 경고표지와 작업공정별 관리요령을 마련해 교육합니다."]),
  directRoute(/락스.*분무.*이유/u, "msds", ["소독제 분무·분사 금지와 표면소독", "세정제·락스의 혼합과 분무 사용 금지"],
    "락스를 분무하면 소독제가 공기 중에 퍼져 작업자가 흡입하거나 눈·피부에 노출될 위험이 커지므로 분무 방식으로 사용하지 않습니다.",
    ["제품 설명서와 MSDS에 따른 농도와 사용방법을 지킵니다.", "표면에는 분무보다 소독액을 묻힌 천으로 닦는 방식을 사용합니다.", "산성 세정제 등 다른 화학제품과 섞으면 유해가스가 발생할 수 있으므로 혼합하지 않습니다."]),
  directRoute(/경고표지.*없/u, "msds", ["붙임4. 화학물질·MSDS Q3"],
    "MSDS 대상 화학제품 용기에 경고표지가 없으면 필요한 내용을 작성해 용기에 부착해야 합니다.",
    ["제품명 또는 화학물질 명칭과 그림문자를 표시합니다.", "신호어와 유해·위험 문구, 예방조치 문구를 표시합니다.", "제조사 또는 공급자의 주소와 연락처를 표시합니다."]),
  directRoute(/msds교육.*주기.*교육시간/u, "msds", ["붙임4. 화학물질·MSDS Q5"],
    "MSDS 교육은 별도의 정기 주기나 최소 교육시간이 정해져 있지는 않지만, 법에서 정한 교육 사유가 생기면 실시해야 합니다.",
    ["대상 물질을 제조·사용·운반·저장하는 작업에 근로자를 배치할 때 실시합니다.", "새로운 대상 물질이 도입되거나 유해성·위험성 정보가 변경될 때 실시합니다.", "해당 교육시간은 안전보건교육을 실시한 시간으로 인정됩니다."]),
  directRoute(/사다리작업전.*점검/u, "fall", ["사다리를 사용하는 시설관리 작업"],
    "사다리 작업 전에는 전도방지장치의 고정 여부와 작업 높이, 보호구 및 2인 1조 준비 상태를 확인합니다.",
    ["아웃트리거 등 전도방지장치가 제대로 고정되는지 확인합니다.", "작업 높이가 3.5m 이상이면 사다리를 사용하지 않고 안전난간이 있는 비계 등으로 바꿉니다.", "안전모를 착용하고 2m 이상 작업에는 안전대를 준비하며 2인 1조로 작업합니다."]),
  directRoute(/(?:예초기|전정기).*보호구/u, "machinery", ["둥근톱·예초기·연삭기·체인톱 안전수칙", "수목 전지작업 기본 안전수칙"],
    "예초기나 전정기 작업에는 비산물·소음·분진·진동 위험에 맞춰 보안경, 귀마개, 방진마스크와 진동방지장갑 등을 착용합니다.",
    ["작업 조건에 따라 안전모와 안전화 등 추가 보호구를 사용합니다.", "작업 전 방호장치와 날 상태를 점검하고 돌·병·캔 등 비산될 물체를 제거합니다.", "주변 사람의 접근을 통제하고 이상소음이나 과열이 생기면 전원을 차단합니다."]),
  directRoute(/회전솥.*뜨거운물/u, "burn", ["열탕소독 화상사고와 예방"],
    "회전솥의 뜨거운 물은 소쿠리나 내용물을 들어 올리기 전에 먼저 안전하게 배수합니다.",
    ["고온·중량물은 2인 1조로 취급합니다.", "내열 방수앞치마가 발등까지 덮도록 하고 장화와 앞치마 사이의 틈을 막습니다.", "작업 전 배수 절차와 보호구 상태를 함께 확인합니다."]),
  directRoute(/급식실.*미끄러짐/u, "slip", ["붙임3. 직종별 자율점검 - 급식종사자 관련"],
    "급식실 미끄러짐 예방을 위해 바닥의 물·기름·물때와 통로의 호스·적재물을 먼저 점검합니다.",
    ["문턱·배관·패인 곳·돌출부 등 넘어짐 위험요인을 제거합니다.", "청소 후 트렌치 덮개를 원상태로 덮고 물청소 구역에는 미끄러짐 경고표지를 설치합니다.", "미끄럼방지 장화를 착용하고 계단 난간과 답단의 미끄럼방지 상태를 확인합니다."]),
  directRoute(/청소근로자.*보호구/u, "ppe", ["붙임3. 직종별 자율점검 - 복도 및 화장실 청소 작업 관련", "안전보호구 지급·관리"],
    "청소근로자에게는 작업 위험에 맞춰 고무장갑과 미끄럼방지 장화 등 개인보호구를 지급하고 착용하게 합니다.",
    ["자극성 세제를 사용할 때에는 내화학 성능과 제품 MSDS에 맞는 장갑을 선택합니다.", "물기가 있는 바닥에서는 미끄럼방지 성능이 있는 장화를 착용합니다.", "제품 비산이나 분진 위험이 있으면 보안경과 호흡용 보호구 필요 여부를 MSDS로 확인합니다."]),
  directRoute(/화장실청소.*미끄러짐/u, "slip", ["붙임3. 직종별 자율점검 - 복도 및 화장실 청소 작업 관련"],
    "화장실 청소 중에는 청소 구역을 알리는 표지를 설치하고, 작업 후 바닥의 세제와 물기를 완전히 제거합니다.",
    ["통로의 장애물을 치우고 깨지거나 빈 타일을 보수합니다.", "미끄럼방지 장화를 착용합니다.", "세면대나 변기 위에 올라가지 않고 높은 곳은 미끄럼방지 조치된 사다리를 사용합니다."]),
  directRoute(/야간순찰통로.*조명/u, "lighting", ["당직·경비의 야간순찰과 실내 통행 안전"],
    "야간순찰 통로는 자료에서 안내한 75럭스 이상의 조도를 확보합니다.",
    ["조명이 부족한 구간에는 랜턴이나 휴대용 조명을 사용합니다.", "문턱·계단 끝과 문이 갑자기 열리는 곳에는 눈에 띄는 표시와 안전라인을 설치합니다."]),
  directRoute(/경비근로자.*야간순찰.*주의/u, "lighting", ["당직·경비의 야간순찰과 실내 통행 안전"],
    "경비근로자는 야간순찰 전에 통로 조명과 바닥 상태를 확인하고 어두운 구간에는 휴대용 조명을 사용합니다.",
    ["화장실 등 물기가 있는 장소에서는 미끄럼방지화를 착용합니다.", "문턱·계단 끝과 갑자기 열리는 문 주변의 충돌·넘어짐 위험을 확인합니다.", "통로 장애물을 제거하고 혼자 작업할 때의 비상연락 수단을 확보합니다."]),
  directRoute(/통학차량.*승하차.*점검/u, "inspection", ["붙임3. 직종별 자율점검 - 통학보조 관련"],
    "통학차량 승하차 보조자는 학생의 안전한 탑승과 하차를 직접 확인한 뒤 차량을 출발시키거나 학생을 보호자에게 인계해야 합니다.",
    ["출발 전에 모든 학생의 안전띠 착용 상태를 확인합니다.", "승하차는 지정된 장소에서 진행하고 위험행동을 통제합니다.", "운행 종료 후 차량 안의 남은 학생·유실물과 차량 상태를 확인합니다."]),
  directRoute(/일반건강진단.*특수건강진단.*다른/u, "health", ["일반·특수·배치 전 건강진단", "산업안전보건법 과제 5. 근로자 건강관리에 관한 사항"],
    "일반건강진단은 상시 근로자의 기본 건강관리를 위한 검진이고, 특수건강진단은 유해인자 노출 업무 근로자의 직업병 예방과 업무 적합성 평가를 위한 검진입니다.",
    ["비사무직 일반건강진단은 1년에 1회, 사무직은 2년에 1회 실시합니다.", "특수건강진단의 대상과 주기는 노출되는 유해인자에 따라 정합니다.", "유해인자 노출 업무에 새로 배치할 때에는 배치 전 건강진단도 확인합니다."]),
  directRoute(/배치전건강진단.*어떤근로자/u, "health", ["일반·특수·배치 전 건강진단", "산업안전보건법 과제 5. 근로자 건강관리에 관한 사항"],
    "배치 전 건강진단은 특수건강진단 대상 유해인자에 노출되는 업무에 새로 배치될 근로자가 받습니다.",
    ["배치 전에 기초 건강자료를 확보하고 해당 업무에 적합한지 평가합니다.", "실제 대상 여부는 취급 물질과 작업환경의 유해인자를 확인해 판단합니다."]),
  directRoute(/직무스트레스.*신호/u, "jobstress", ["직무스트레스의 원인과 알아차릴 신호"],
    "직무스트레스 신호에는 두통·소화불량·수면장애, 불안·무기력, 짜증과 실수 증가, 업무성과 저하와 음주·흡연 증가 등이 있습니다.",
    ["증상이 반복되거나 누적되면 체크리스트·상담·관찰로 상태를 확인합니다.", "일상생활이 어려워지기 전에 관리자나 전문상담기관에 도움을 요청합니다."]),
  directRoute(/근골격계유해요인조사.*몇년/u, "musculoskeletal", ["근골격계부담작업 유해요인조사", "제5장 사업장 보건관리 · 제28조(근골격계질환 예방 등)"],
    "근골격계부담작업 유해요인조사는 정기적으로 3년마다 실시합니다.",
    ["신설학교·기관이나 새 부담작업의 최초조사는 해당 작업 신설 후 1년 이내 실시합니다.", "업무상 질병 인정이나 작업설비·환경 변경 시에는 수시조사를 실시합니다."]),
  directRoute(/모든작업.*유해요인조사/u, "musculoskeletal", ["붙임4. 근골격계 유해요인조사 Q1"],
    "학교의 모든 작업이 유해요인조사 대상은 아니며, 고용노동부 고시의 근골격계부담작업 범위에 해당하는 작업을 조사합니다.",
    ["작업별 반복동작, 힘의 사용, 자세와 작업시간을 확인해 부담작업 해당 여부를 판단합니다.", "2개월 이내 종료되는 1회성 작업이나 연간 총 작업일수가 60일 이하인 간헐 작업은 제외 조건을 확인할 수 있습니다."]),
  directRoute(/근골격계질환.*수시유해요인조사/u, "musculoskeletal", ["붙임4. 근골격계 유해요인조사 Q3", "근골격계부담작업 유해요인조사"],
    "근골격계질환이 업무상 질병으로 인정되면 해당 작업장과 작업조건에 대해 수시 유해요인조사를 지체 없이 실시합니다.",
    ["산재 여부가 불확실하면 요양 승인 결정통보 후 지체 없이 실시합니다.", "재해자 개인만이 아니라 같은 작업을 수행한 근로자의 작업조건과 증상도 함께 조사합니다."]),
  directRoute(/수시유해요인조사.*재해자만/u, "musculoskeletal", ["붙임4. 근골격계 유해요인조사 Q3"],
    "수시 유해요인조사는 재해자만을 대상으로 하는 것이 아닙니다.",
    ["근골격계질환이 발생한 작업을 함께 수행해 온 동료 근로자도 유해요인조사와 증상 설문 대상에 포함합니다.", "재해가 발생한 작업장의 상황과 작업조건 전체를 확인합니다."]),
  directRoute(/허리통증.*작업할때만/u, "musculoskeletal", ["근골격계질환의 초기 증상과 작업별 징후"],
    "허리 통증이 작업할 때만 나타나더라도 근골격계질환의 초기 신호일 수 있으므로 관리자에게 조기에 알리고 작업을 조정해야 합니다.",
    ["통증이 생기는 작업·자세·중량과 지속시간을 기록합니다.", "증상이 반복되거나 악화되면 건강상담이나 진료를 받고 작업환경 개선을 요청합니다."]),
  directRoute(/공사.*용역업체.*선정.*안전보건/u, "contractor", ["중대재해처벌법 과제 9", "건설공사 계약 단계별 안전보건조치", "붙임2. 공통 자율점검 - 도급"],
    "학교는 공사·용역업체 선정 과정에서 업체의 안전보건 수준과 산업재해 예방 역량을 평가해야 합니다.",
    ["공고 단계에서 안전보건수준 평가기준을 제시합니다.", "안전보건관리 활동계획서·체크리스트·준수 서약서 등을 제출받습니다.", "계약 종료 후 이행 수준을 평가해 다음 업체 선정에 반영합니다."]),
  directRoute(/도급업체.*안전보건서류/u, "contractor", ["건설공사 계약 단계별 안전보건조치", "중대재해처벌법 과제 9"],
    "도급업체에는 안전보건관리 활동계획서, 안전보건수준 평가 체크리스트와 안전보건 준수 서약서 등을 제출받습니다.",
    ["계약 후에는 작업계획서와 재해예방 기술지도 자료를 확인합니다.", "총 공사금액 2천만원 이상이면 산업안전보건관리비 계상·사용 자료를 확인합니다.", "공사 규모에 따라 안전보건대장 등 추가 서류 대상 여부도 확인합니다."]),
  directRoute(/도급협의체.*결과.*기록/u, "contractor", ["도급 협의체 회의 진행과 기록"],
    "도급 협의체 회의가 끝나면 협의 내용과 구체적인 실천계획을 회의록에 기록하고 참가자가 서명·날인합니다.",
    ["참가 현황, 지난 협의사항의 조치 결과와 점검 이행상태를 기록합니다.", "수급업체와 종사자의 의견, 합의한 조치의 담당자와 기한을 남깁니다.", "다음 회의에서 조치 결과를 다시 확인합니다."]),
  directRoute(/체감온도.*몇도이상/u, "heat", ["폭염작업의 체감온도·휴식 기준", "체감온도 단계별 폭염 대응"],
    "체감온도 31℃ 이상이면 온열질환 예방조치를 시작해야 합니다.",
    ["체감온도를 주기적으로 측정하고 물·그늘·휴식 등 기본조치를 제공합니다.", "33℃ 이상이면 2시간마다 20분 이상의 휴식을 부여합니다.", "온도가 더 높아지면 옥외작업을 단축하거나 중지하고 민감군을 별도로 보호합니다."]),
  directRoute(/폭염.*휴식시간.*얼마/u, "heat", ["폭염작업의 체감온도·휴식 기준", "체감온도 단계별 폭염 대응"],
    "체감온도 33℃ 이상인 폭염 작업에는 2시간마다 20분 이상의 휴식을 제공합니다.",
    ["체감온도 33℃ 대응표는 매시간 10분씩 쉬도록 안내합니다.", "35℃ 이상이면 매시간 15분씩 쉬고 무더위 시간대 옥외작업을 중지합니다.", "38℃ 이상이면 재난·안전관리 작업 외 옥외작업을 중지합니다."]),
  directRoute(/호우.*태풍.*옥외작업/u, "weather", ["침수·강풍·감전·붕괴 위험별 조치", "태풍 복구작업 추락·감전 예방"],
    "호우·태풍 중에는 옥외작업과 침수·붕괴 위험 장소 출입을 중지하고 근로자를 안전한 곳으로 대피시킵니다.",
    ["작업 전에 기상특보와 대피기준을 확인하고 시설물·적치물을 고정합니다.", "배수로와 물막이판을 정비하고 침수 우려 구역의 전원을 차단합니다.", "복구 작업은 구조물과 전기설비의 안전 상태를 확인한 뒤 보호구를 착용하고 시작합니다."]),
  directRoute(/침수.*전기설비.*주의/u, "weather", ["침수·강풍·감전·붕괴 위험별 조치", "태풍 복구작업 추락·감전 예방"],
    "침수된 장소의 전기설비는 전원을 먼저 차단하고, 충전 여부가 확인되기 전에는 접근하거나 손대지 않습니다.",
    ["젖은 손이나 몸으로 전기설비를 만지지 않습니다.", "누전차단기·접지·전선 피복과 침수 손상 여부는 자격이 있는 사람이 확인합니다.", "안전이 확인된 뒤에도 절연용 보호구를 착용하고 복구 작업을 진행합니다."]),

  // 비상·응급조치: 예방수칙보다 사고 직후 행동을 먼저 보여준다.
  { test: /감전사고.*(?:만져|접촉)/u, category: "firstaid", preferredSections: ["전기 감전사고의 구조와 응급조치"] },
  { test: /절단사고.*절단부위/u, category: "firstaid", preferredSections: ["끼임·베임·절단사고 응급조치"] },
  {
    test: /화상환자.*(?:얼음|연고)/u,
    category: "firstaid",
    preferredSections: ["사업장 화상 발생 시 응급조치", "이상온도 접촉과 화상 응급조치"],
    guide: {
      message: "등록된 근거자료는 화상 부위를 깨끗한 찬물로 식히도록 안내하며, 얼음이나 연고 사용 여부는 직접 명시하지 않습니다.",
      keyPoints: [
        "열원과의 접촉을 중단하고 119 또는 의료기관의 안내를 받습니다.",
        "피부에 붙은 옷이나 물체를 억지로 떼거나 물집을 터뜨리지 않습니다.",
        "깨끗한 거즈나 천으로 느슨하게 덮어 병원으로 이송합니다.",
      ],
    },
  },
  { test: /가스누출.*(?:구조|들어가)/u, category: "firstaid", preferredSections: ["가스 누출·중독사고의 대피와 응급조치"], focusTerms: ["보호구 없이", "들어가지"] },
  { test: /추락사고.*(?:부상자|이동)/u, category: "firstaid", preferredSections: ["추락·넘어짐·교통사고 시 부상자 고정"], focusTerms: ["함부로 움직이지"] },
  { test: /중대산업재해.*현장.*보존/u, category: "accident", preferredSections: ["2차 사고 방지와 사고 현장 보존"] },

  // 안전보건교육
  { test: /(?:신규채용|채용시).*(?:몇시간|교육시간)|하루만.*일용|계약기간.*1주일/u, category: "education", preferredSections: ["계약 형태별 채용 시 교육시간"] },
  { test: /현업업무종사자.*정기교육.*(?:1년|몇시간|시간)/u, category: "education", preferredSections: ["현업업무종사자·관리감독자 정기교육 시간"] },
  { test: /관리감독자.*(?:매년|연간).*(?:몇시간|교육)/u, category: "supervisor", preferredSections: ["Q7. 관리감독자 정기교육은 매년 이수하여야 하는지", "Q1. 법정 교육시간 및 교육내용", "2026년 관리감독자 정기 안전보건교육 시간 구성"] },
  { test: /관리감독자교육.*집합교육.*(?:시간|얼마)/u, category: "supervisor", preferredSections: ["Q2. 관리감독자 정기교육에 대한 집합교육 의무 비율", "현업업무종사자·관리감독자 정기교육 시간"] },
  { test: /온라인.*교육.*인정/u, category: "education", preferredSections: ["현업업무종사자·관리감독자 정기교육 시간"] },
  { test: /수강기간.*이수하지못/u, category: "supervisor", preferredSections: ["Q3. 수강기간 내 정기교육을 이수하지 못한 경우"] },
  { test: /(?:교육일지.*수료증|수료증).*(?:몇년|보관)/u, category: "supervisor", preferredSections: ["Q10. 정기교육 이수에 따른 수료증"] },
  { test: /관리감독자.*근로자교육.*(?:직접|자체)/u, category: "supervisor", preferredSections: ["Q11. 관리감독자가 소속 학교"] },

  // 산업재해 발생·보고
  { test: /사고.*처음발견|최초발견/u, category: "accident", preferredSections: ["중대산업재해 최초 발견자의 즉시 조치", "2차 사고 방지와 사고 현장 보존"] },
  { test: /부상자.*(?:누구|순서).*보고/u, category: "accident", preferredSections: ["중대산업재해 최초 발견자의 즉시 조치", "제29조(사고 발생 시 처리 절차)"] },
  { test: /산업재해조사표.*언제까지|며칠이상.*산업재해조사표/u, category: "accident", preferredSections: ["붙임4. 산업재해 Q2"] },
  { test: /휴업일수.*(?:토요일|일요일|공휴일)/u, category: "accident", preferredSections: ["붙임4. 산업재해 Q2"] },
  { test: /한달.*지나.*휴업|1개월.*지나.*휴업/u, category: "accident", preferredSections: ["붙임4. 산업재해 Q3"] },
  { test: /퇴직.*산재.*(?:승인|인정)/u, category: "accident", preferredSections: ["붙임4. 산업재해 Q4"] },
  { test: /산업재해조사표.*수정/u, category: "accident", preferredSections: ["붙임4. 산업재해 Q7"] },
  { test: /사고보고.*(?:추가|끝난뒤)|보고.*재발방지/u, category: "accident", preferredSections: ["붙임4. 산업재해 Q8", "산업재해 보고와 재발방지"] },
  { test: /산업재해.*(?:발생|나면).*(?:무엇부터|어떻게|대응)/u, category: "accident", preferredSections: ["산업재해 비상대응체계", "중대산업재해 최초 발견자의 즉시 조치", "제29조(사고 발생 시 처리 절차)", "산업재해 보고와 재발방지"] },

  // 위험성평가
  { test: /위험성평가.*(?:순서|절차)/u, category: "risk", preferredSections: ["위험성평가 절차", "근로자 참여 위험성평가"] },
  { test: /위험성평가실시규정.*매년/u, category: "risk", preferredSections: ["붙임4. 위험성평가 Q1"] },
  { test: /위험성평가.*매년|최초위험성평가.*정기/u, category: "risk", preferredSections: ["최초·정기·수시 위험성평가 실시 시기", "근로자 참여 위험성평가", "제23조(위험성평가의 실시)"] },
  { test: /수시위험성평가.*(?:언제|어떤경우)|산업재해.*위험성평가.*다시/u, category: "risk", preferredSections: ["근로자 참여 위험성평가", "산업안전보건법 과제 9. 유해‧위험 방지 활동", "붙임4. 산업재해 Q8"] },
  { test: /위험성.*낮.*개선대책/u, category: "risk", preferredSections: ["붙임4. 위험성평가 Q3"] },
  { test: /위험성평가서식.*(?:법적|정해)/u, category: "risk", preferredSections: ["붙임4. 위험성평가 Q2"] },
  { test: /근로자.*위험성평가.*참여/u, category: "risk", preferredSections: ["근로자 참여 위험성평가"] },
  { test: /위험성평가.*(?:기록|개선조치).*(?:몇년|보관)/u, category: "risk", preferredSections: ["근로자 참여 위험성평가", "제23조(위험성평가의 실시)"] },

  // 화학물질·MSDS
  { test: /세제.*msds.*대상/u, category: "msds", preferredSections: ["물질안전보건자료 관리", "물질안전보건자료 게시·비치·교육"] },
  { test: /락스.*(?:다른세제|섞)|락스.*분무/u, category: "msds", preferredSections: ["세정제·락스의 혼합과 분무 사용 금지"] },
  { test: /msds.*(?:어느장소|비치)/u, category: "msds", preferredSections: ["붙임4. 화학물질·MSDS Q1", "물질안전보건자료 게시·비치·교육"] },
  { test: /(?:화학제품|msds).*경고표지.*(?:없|어떻게)/u, category: "msds", preferredSections: ["붙임4. 화학물질·MSDS Q3"] },
  { test: /msds교육.*물질별/u, category: "msds", preferredSections: ["붙임4. 화학물질·MSDS Q4"] },
  { test: /msds교육.*(?:주기|교육시간)/u, category: "msds", preferredSections: ["붙임4. 화학물질·MSDS Q5"] },
  { test: /화학물질.*(?:눈|피부).*(?:닿|조치)/u, category: "msds", preferredSections: ["화학제품별 MSDS 응급조치 요령 확인", "세정제·락스의 혼합과 분무 사용 금지"], focusTerms: ["물로", "세척", "의학적 조치"] },
  { test: /(?:페인트|신나|휘발유).*(?:보관|저장)/u, category: "msds", preferredSections: ["학교 화학제품의 운반·보관 수칙", "인화성·유해 위험물질 취급 설비 관리"] },
  { test: /화학제품.*(?:음료수병|다른용기|옮겨담)/u, category: "msds", preferredSections: ["학교 화학제품의 운반·보관 수칙"] },

  // 시설관리 위험작업
  { test: /사다리작업.*(?:점검|혼자)/u, category: "fall", preferredSections: ["사다리를 사용하는 시설관리 작업"] },
  { test: /옥상.*(?:추락방지|작업)/u, category: "fall", preferredSections: ["옥상·계단 추락과 충돌 예방", "발코니·캐노피 등 2m 이상 고소작업"] },
  {
    test: /고소작업대.*안전대/u,
    category: "aerial",
    preferredSections: ["시저형·자주식 고소작업대 안전대 부착 위치", "고소작업대 작업 전·중 안전수칙"],
    guide: {
      message: "시저형·자주식 고소작업대에서는 안전대를 구조물 또는 작업대에 마련된 안전대 부착설비에 체결합니다.",
      keyPoints: [
        "작업 전 장비에 표시된 안전대 부착설비와 체결 상태를 확인합니다.",
        "안전난간을 밟고 올라서거나 작업대 밖의 구조물로 이동하지 않습니다.",
        "안전하게 체결할 부착설비가 없으면 작업을 시작하지 않고 추락방지조치를 먼저 마련합니다.",
      ],
    },
  },
  { test: /전기설비.*(?:점검|수리)/u, category: "electrical", preferredSections: ["배전반 점검 등 전기작업 안전수칙"] },
  { test: /(?:용접|절단작업).*화재감시자/u, category: "hotwork", preferredSections: ["용접 등 화기작업 안전수칙"] },
  { test: /밀폐공간.*(?:들어가기전|절차)/u, category: "confined", preferredSections: ["지하공간·비트·물탱크 등 밀폐공간 작업"] },
  { test: /(?:예초기|전정기).*보호구/u, category: "machinery", preferredSections: ["둥근톱·예초기·연삭기·체인톱 안전수칙", "수목 전지작업 기본 안전수칙"] },
  { test: /기계식주차.*전원/u, category: "parking", preferredSections: ["기계식 주차설비 정비·점검"] },
  { test: /(?:크레인|지게차).*작업구역.*통제/u, category: "crane", preferredSections: ["크레인 줄걸이와 인양 신호", "지게차와 보행자 혼재작업 관리", "크레인 작업의 금지사항"] },

  // 급식·청소·경비·통학보조
  { test: /(?:무거운식판|조리기구).*(?:운반|옮)/u, category: "musculoskeletal", preferredSections: ["근골격계질환 예방을 위한 작업방법", "근골격계부담작업 유해요인조사"] },
  { test: /회전솥.*뜨거운물|열탕소독.*화상/u, category: "burn", preferredSections: ["열탕소독 화상사고와 예방"] },
  { test: /급식실.*미끄러/u, category: "slip", preferredSections: ["붙임3. 직종별 자율점검 - 급식종사자 관련"] },
  { test: /(?:칼|절단기).*(?:베였|응급처치)/u, category: "firstaid", preferredSections: ["끼임·베임·절단사고 응급조치"] },
  { test: /(?:깨진유리|철사).*(?:처리|청소)/u, category: "sharp", preferredSections: ["분리수거 중 유리·철사에 의한 베임·찔림 예방"] },
  { test: /청소근로자.*보호구/u, category: "ppe", preferredSections: ["안전보호구 지급·관리", "붙임3. 직종별 자율점검 - 복도 및 화장실 청소 작업 관련"] },
  { test: /화장실청소.*미끄러/u, category: "slip", preferredSections: ["붙임3. 직종별 자율점검 - 복도 및 화장실 청소 작업 관련"] },
  { test: /야간순찰.*(?:조명|주의)/u, category: "lighting", preferredSections: ["당직·경비의 야간순찰과 실내 통행 안전", "붙임3. 직종별 자율점검 - 경비업무 관련"] },
  { test: /통학차량.*승하차.*(?:점검|보조)/u, category: "inspection", preferredSections: ["붙임3. 직종별 자율점검 - 통학보조 관련"] },

  // 건강관리
  { test: /다른기관.*건강검진.*인정/u, category: "health", preferredSections: ["일반건강진단으로 인정되는 검진과 근로자 의무"] },
  { test: /급식종사자.*폐암.*검진/u, category: "health", preferredSections: ["급식종사자 폐암 건강검진 대상·주기", "폐암 1차·2차 검진 비용 지원"] },
  { test: /근로자건강센터.*지원/u, category: "health", preferredSections: ["근로자건강센터가 제공하는 지원", "급식종사자 무료 건강관리 프로그램"] },
  { test: /산업보건의.*(?:지원|건강관리)/u, category: "health", preferredSections: ["산업보건의 건강관리 지원 대상", "산업보건의 상담·교육·작업환경 평가"] },
  { test: /직무스트레스.*(?:신호|증상)/u, category: "jobstress", preferredSections: ["직무스트레스의 원인과 알아차릴 신호"] },
  { test: /직장내괴롭힘.*기록/u, category: "bullying", preferredSections: ["직장 내 괴롭힘이 발생했을 때의 기록·상담 절차"] },
  { test: /(?:뇌졸중|심근경색).*(?:의심|대응)/u, category: "cardio", preferredSections: ["뇌심혈관질환 의심 환자 발생 시 대응", "뇌졸중·심근경색의 주요 경고신호"], focusTerms: ["119", "응급실", "심폐소생술"] },

  // 근골격계질환
  { test: /근골격계.*초기증상/u, category: "musculoskeletal", preferredSections: ["근골격계질환의 초기 증상과 작업별 징후"] },
  { test: /허리통증.*작업할때/u, category: "musculoskeletal", preferredSections: ["근골격계질환의 초기 증상과 작업별 징후"], focusTerms: ["조기에 알리고", "작업을 조정"] },
  { test: /반복.*손목.*질환/u, category: "musculoskeletal", preferredSections: ["근골격계질환의 초기 증상과 작업별 징후"] },
  { test: /무거운물건.*(?:자세|들)/u, category: "musculoskeletal", preferredSections: ["근골격계질환 예방을 위한 작업방법"] },
  { test: /오래서서.*(?:부담|방법)/u, category: "musculoskeletal", preferredSections: ["근골격계질환 예방을 위한 작업방법"] },
  { test: /근골격계.*(?:휴식|쉬는시간)/u, category: "musculoskeletal", preferredSections: ["근골격계질환 예방을 위한 작업방법"] },

  // 도급 협의체·산업안전보건위원회
  { test: /(?:공사|용역업체).*선정.*안전보건/u, category: "contractor", preferredSections: ["중대재해처벌법 과제 9", "건설공사 계약 단계별 안전보건조치", "붙임2. 공통 자율점검 - 도급"] },
  { test: /도급업체.*안전보건서류/u, category: "contractor", preferredSections: ["건설공사 계약 단계별 안전보건조치", "중대재해처벌법 과제 9"] },
  { test: /도급협의체.*(?:누가|참여|구성)/u, category: "contractor", preferredSections: ["안전보건 도급 협의체의 구성과 운영"] },
  { test: /도급협의체.*(?:내용|협의|안건)/u, category: "contractor", preferredSections: ["도급 협의체에서 협의할 사항"] },
  { test: /(?:일시적|간헐적).*도급협의체/u, category: "contractor", preferredSections: ["일시적·간헐적 작업의 협의체 적용 제외 기준"] },
  { test: /도급협의체.*(?:결과|기록)/u, category: "contractor", preferredSections: ["도급 협의체 회의 진행과 기록"] },
  {
    test: /산업안전보건위원회.*(?:어떤기관|설치)/u,
    category: "organization",
    preferredSections: ["학교 산업안전보건위원회 설치 대상 판단", "교육서비스업 안전보건관리체제 적용범위", "산업안전보건위원회의 목적과 구성"],
    guide: {
      message: "교육서비스업에서는 해당 사업장 소속 현업업무종사자가 100명 이상이면 산업안전보건위원회 설치 대상입니다.",
      keyPoints: [
        "인원 산정에는 수급인 근로자를 포함하지 않습니다.",
        "위원회는 사업장의 안전과 보건에 관한 중요사항을 심의·의결합니다.",
        "학교가 독립된 사업장인지 여부는 인사·노무·회계와 의사결정의 독립성을 종합해 판단합니다.",
      ],
    },
  },
  { test: /산업안전보건위원회.*몇명/u, category: "organization", preferredSections: ["산업안전보건위원회의 목적과 구성"] },
  { test: /산업안전보건위원회.*(?:얼마나자주|개최)/u, category: "organization", preferredSections: ["정기·임시회의와 의결 정족수"] },
  { test: /산업안전보건위원회.*(?:심의|의결)/u, category: "organization", preferredSections: ["산업안전보건위원회의 주요 심의·의결 사항"] },

  // 계절 위험
  { test: /침수.*전기설비/u, category: "weather", preferredSections: ["침수·강풍·감전·붕괴 위험별 조치", "태풍 복구작업 추락·감전 예방"], focusTerms: ["전원", "차단", "전기설비"] },
];

const sources = [
  {
    title: manual.sourceTitle,
    publisher: undefined,
    date: manual.sourceDate,
    url: manual.sourceUrl as string | undefined,
    extraction: manual.extraction,
    pages: manual.pages,
  },
  {
    title: hazardPrevention.sourceTitle,
    publisher: undefined,
    date: hazardPrevention.sourceDate,
    url: hazardPrevention.sourceUrl ?? undefined,
    extraction: hazardPrevention.extraction,
    pages: hazardPrevention.pages,
  },
  {
    title: supervisorTraining.sourceTitle,
    publisher: supervisorTraining.sourcePublisher,
    date: supervisorTraining.sourceDate,
    url: supervisorTraining.sourceUrl ?? undefined,
    extraction: supervisorTraining.extraction,
    pages: supervisorTraining.pages,
  },
  {
    title: safetyHealthRegulation.sourceTitle,
    publisher: safetyHealthRegulation.sourcePublisher,
    date: safetyHealthRegulation.sourceDate,
    url: safetyHealthRegulation.sourceUrl ?? undefined,
    extraction: safetyHealthRegulation.extraction,
    pages: safetyHealthRegulation.pages,
  },
  {
    title: educationMinistryGuidance.sourceTitle,
    publisher: educationMinistryGuidance.sourcePublisher,
    date: educationMinistryGuidance.sourceDate,
    url: educationMinistryGuidance.sourceUrl ?? undefined,
    extraction: educationMinistryGuidance.extraction,
    pages: educationMinistryGuidance.pages,
  },
  {
    title: supervisorTraining2026.sourceTitle,
    publisher: supervisorTraining2026.sourcePublisher,
    date: supervisorTraining2026.sourceDate,
    url: supervisorTraining2026.sourceUrl ?? undefined,
    extraction: supervisorTraining2026.extraction,
    pages: supervisorTraining2026.pages,
  },
  {
    title: newEmployeeTraining.sourceTitle,
    publisher: newEmployeeTraining.sourcePublisher,
    date: newEmployeeTraining.sourceDate,
    url: newEmployeeTraining.sourceUrl ?? undefined,
    extraction: newEmployeeTraining.extraction,
    pages: newEmployeeTraining.pages,
  },
  {
    title: inspectionBestPractices.sourceTitle,
    publisher: inspectionBestPractices.sourcePublisher,
    date: inspectionBestPractices.sourceDate,
    url: inspectionBestPractices.sourceUrl,
    extraction: inspectionBestPractices.extraction,
    pages: inspectionBestPractices.pages,
  },
  {
    title: workerHealthSupport.sourceTitle,
    publisher: workerHealthSupport.sourcePublisher,
    date: workerHealthSupport.sourceDate,
    url: workerHealthSupport.sourceUrl,
    extraction: workerHealthSupport.extraction,
    pages: workerHealthSupport.pages,
  },
  {
    title: safetySiren2026.sourceTitle,
    publisher: safetySiren2026.sourcePublisher,
    date: safetySiren2026.sourceDate,
    url: safetySiren2026.sourceUrl,
    extraction: safetySiren2026.extraction,
    pages: safetySiren2026.pages,
  },
  {
    title: regularWorkerTrainingCurrent.sourceTitle,
    publisher: regularWorkerTrainingCurrent.sourcePublisher,
    date: regularWorkerTrainingCurrent.sourceDate,
    url: regularWorkerTrainingCurrent.sourceUrl,
    extraction: regularWorkerTrainingCurrent.extraction,
    pages: regularWorkerTrainingCurrent.pages,
  },
  {
    title: safetyHealthCommitteeCurrent.sourceTitle,
    publisher: safetyHealthCommitteeCurrent.sourcePublisher,
    date: safetyHealthCommitteeCurrent.sourceDate,
    url: safetyHealthCommitteeCurrent.sourceUrl,
    extraction: safetyHealthCommitteeCurrent.extraction,
    pages: safetyHealthCommitteeCurrent.pages,
  },
  {
    title: contractorCouncilGuidance.sourceTitle,
    publisher: contractorCouncilGuidance.sourcePublisher,
    date: contractorCouncilGuidance.sourceDate,
    url: contractorCouncilGuidance.sourceUrl ?? undefined,
    extraction: contractorCouncilGuidance.extraction,
    pages: contractorCouncilGuidance.pages,
  },
  {
    title: seriousAccidentResponseManual.sourceTitle,
    publisher: seriousAccidentResponseManual.sourcePublisher,
    date: seriousAccidentResponseManual.sourceDate,
    url: seriousAccidentResponseManual.sourceUrl ?? undefined,
    extraction: seriousAccidentResponseManual.extraction,
    pages: seriousAccidentResponseManual.pages,
  },
  {
    title: facilityHazardousWorkRules.sourceTitle,
    publisher: facilityHazardousWorkRules.sourcePublisher,
    date: facilityHazardousWorkRules.sourceDate,
    url: facilityHazardousWorkRules.sourceUrl ?? undefined,
    extraction: facilityHazardousWorkRules.extraction,
    pages: facilityHazardousWorkRules.pages,
  },
  {
    title: seriousAccidentPreventionGuide.sourceTitle,
    publisher: seriousAccidentPreventionGuide.sourcePublisher,
    date: seriousAccidentPreventionGuide.sourceDate,
    url: seriousAccidentPreventionGuide.sourceUrl ?? undefined,
    extraction: seriousAccidentPreventionGuide.extraction,
    pages: seriousAccidentPreventionGuide.pages,
  },
  {
    title: highRiskFactorResponseGuidePart1.sourceTitle,
    publisher: highRiskFactorResponseGuidePart1.sourcePublisher,
    date: highRiskFactorResponseGuidePart1.sourceDate,
    url: highRiskFactorResponseGuidePart1.sourceUrl ?? undefined,
    extraction: highRiskFactorResponseGuidePart1.extraction,
    pages: highRiskFactorResponseGuidePart1.pages,
  },
  {
    title: workerTrainingBigText2026.sourceTitle,
    publisher: workerTrainingBigText2026.sourcePublisher,
    date: workerTrainingBigText2026.sourceDate,
    url: workerTrainingBigText2026.sourceUrl,
    extraction: workerTrainingBigText2026.extraction,
    pages: workerTrainingBigText2026.pages,
  },
  {
    title: schoolWorkerChemicalSafety.sourceTitle,
    publisher: schoolWorkerChemicalSafety.sourcePublisher,
    date: schoolWorkerChemicalSafety.sourceDate,
    url: schoolWorkerChemicalSafety.sourceUrl,
    extraction: schoolWorkerChemicalSafety.extraction,
    pages: schoolWorkerChemicalSafety.pages,
  },
  {
    title: schoolWorkerGeneralSafety.sourceTitle,
    publisher: schoolWorkerGeneralSafety.sourcePublisher,
    date: schoolWorkerGeneralSafety.sourceDate,
    url: schoolWorkerGeneralSafety.sourceUrl,
    extraction: schoolWorkerGeneralSafety.extraction,
    pages: schoolWorkerGeneralSafety.pages,
  },
  {
    title: aerialWorkPlatformSafetyManual.sourceTitle,
    publisher: aerialWorkPlatformSafetyManual.sourcePublisher,
    date: aerialWorkPlatformSafetyManual.sourceDate,
    url: aerialWorkPlatformSafetyManual.sourceUrl,
    extraction: aerialWorkPlatformSafetyManual.extraction,
    pages: aerialWorkPlatformSafetyManual.pages,
  },
  {
    title: workplaceHealthManagement2024.sourceTitle,
    publisher: workplaceHealthManagement2024.sourcePublisher,
    date: workplaceHealthManagement2024.sourceDate,
    url: workplaceHealthManagement2024.sourceUrl,
    extraction: workplaceHealthManagement2024.extraction,
    pages: workplaceHealthManagement2024.pages,
  },
  {
    title: educationServiceSafetyHealthFaq.sourceTitle,
    publisher: educationServiceSafetyHealthFaq.sourcePublisher,
    date: educationServiceSafetyHealthFaq.sourceDate,
    url: educationServiceSafetyHealthFaq.sourceUrl,
    extraction: educationServiceSafetyHealthFaq.extraction,
    pages: educationServiceSafetyHealthFaq.pages,
  },
  {
    title: disinfectantSpraySafety.sourceTitle,
    publisher: disinfectantSpraySafety.sourcePublisher,
    date: disinfectantSpraySafety.sourceDate,
    url: disinfectantSpraySafety.sourceUrl,
    extraction: disinfectantSpraySafety.extraction,
    pages: disinfectantSpraySafety.pages,
  },
  {
    title: riskAssessmentTiming.sourceTitle,
    publisher: riskAssessmentTiming.sourcePublisher,
    date: riskAssessmentTiming.sourceDate,
    url: riskAssessmentTiming.sourceUrl,
    extraction: riskAssessmentTiming.extraction,
    pages: riskAssessmentTiming.pages,
  },
];

const indexedPages = sources.flatMap((source) => source.pages.map((page) => {
  const pageMetadata = page as typeof page & {
    sourceUrl?: string;
    sourceKind?: "web" | "pdf";
    sourceDate?: string;
  };
  const sourceUrl = pageMetadata.sourceUrl ?? source.url;

  return {
    ...page,
    referenceLabel: "referenceLabel" in page ? page.referenceLabel : undefined,
    sourceTitle: source.title,
    sourcePublisher: source.publisher,
    sourceDate: pageMetadata.sourceDate ?? source.date,
    sourceUrl,
    sourceKind: pageMetadata.sourceKind ?? (sourceUrl?.includes("/html/") || sourceUrl?.includes("/board/") ? "web" : "pdf"),
    isOcr: source.extraction.includes("OCR"),
  };
}));

const STOP_WORDS = new Set(["학교", "근로자", "어떻게", "무엇", "어떤", "해야", "하나요", "있나요", "관한", "관련", "대해", "경우", "우리", "에서", "위한", "확인"]);

function normalize(value: string): string {
  return value.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

function queryTerms(question: string): string[] {
  return normalize(question).split(/\s+/).filter((word) => word.length >= 2 && !STOP_WORDS.has(word)).map((word) => word.replace(/(하면|해서|했을|할지|할까|받아야|해야|하나요|인가요|습니까|나요|은|는|이|가|을|를|에|도|로|의|과|와|에서|에는|에게|마다|부터|까지)$/u, "")).filter((word) => word.length >= 2);
}

function detectCategory(question: string): string | undefined {
  const condensed = normalize(question).replaceAll(" ", "");
  let best: { category: string; length: number } | undefined;
  for (const [category, terms] of Object.entries(CATEGORY_TERMS)) {
    for (const term of terms) {
      if (condensed.includes(term.toLowerCase()) && term.length >= (best?.length ?? 0)) {
        best = { category, length: term.length };
      }
    }
  }
  return best?.category;
}

function detectSupervisorQuestion(question: string): number | undefined {
  const value = normalize(question).replaceAll(" ", "");
  if (/(수료증|이수증|보존)/u.test(value)) return 10;
  if (/(전출|인사발령|다른학교|학교이동)/u.test(value)) return 9;
  if (/(현업업무종사자|근로자정기교육|추가교육)/u.test(value)) return 8;
  if (/(우편통신|우편교육)/u.test(value)) return 6;
  if (/(학교안전사고교육|일반안전교육)/u.test(value)) return 5;
  if (/(원격과정|직무연수|재생시간|20시간)/u.test(value)) return 4;
  if (/(수강기간|미이수|이수하지못)/u.test(value)) return 3;
  if (/(자체교육|강사자격|직접교육)/u.test(value)) return 11;
  if (/(집합교육|비대면실시간)/u.test(value)) return 2;
  if (/(매년|과태료|필수교육)/u.test(value)) return 7;
  if (/(교육내용|법정교육시간|연간.*시간)/u.test(value)) return 1;
  return undefined;
}

function normalizeExtractedText(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/사\s+람/gu, "사람")
    .replace(/발견\s+자/gu, "발견자")
    .replace(/실시\s+한다/gu, "실시한다")
    .replace(/범\s+위/gu, "범위")
    .replace(/관\s+할/gu, "관할")
    .replace(/작\s+업/gu, "작업")
    .replace(/근로\s+자/gu, "근로자")
    .replace(/안전\s+보건/gu, "안전보건");
}

function cleanEvidenceLine(rawLine: string): string | undefined {
  const line = normalizeExtractedText(rawLine).replace(/[•◦▪]/g, "·").replace(/\s+/g, " ").trim();
  if (line.length < 8) return undefined;
  if (/[\u3400-\u4DBF\u4E00-\u9FFF\u3040-\u30FF]/u.test(line)) return undefined;

  const latinTokens = line.match(/[A-Za-z]+/g) ?? [];
  const allowedLatin = new Set(["MSDS", "TBM", "PDF", "KF", "MWFS"]);
  if (latinTokens.some((token) => !allowedLatin.has(token.toUpperCase()))) return undefined;
  if (/(제출 인내|신업안전보건지원)/u.test(line)) return undefined;

  const letters = [...line].filter((char) => /\p{L}/u.test(char));
  const hangul = letters.filter((char) => /[가-힣]/u.test(char)).length;
  if (hangul < 5 || (letters.length > 0 && hangul / letters.length < 0.72)) return undefined;

  const unusual = [...line].filter((char) => !/[가-힣A-Za-z0-9\s().,:%/+\-·〈〉]/u.test(char)).length;
  if (unusual > 2) return undefined;

  return line.replace(/^[0-9]+\s+/, "").replace(/\s+([.,:])/g, "$1");
}

function cleanMarkdownLine(rawLine: string): string | undefined {
  const withoutBold = normalizeExtractedText(rawLine).replace(/\*\*/g, "").trim();
  if (!withoutBold) return undefined;
  if (/^\|?(?:\s*:?-+:?\s*\|)+\s*$/u.test(withoutBold)) return undefined;

  if (withoutBold.includes("|")) {
    const cells = withoutBold
      .split("|")
      .map((cell) => cell.replace(/^[□■○◦▪·]+\s*/u, "").replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .filter((cell, index, all) => all.indexOf(cell) === index);
    if (!cells.length) return undefined;
    const compactCells = cells.join("").replace(/\s+/g, "");
    if (/자가진단항목.*(?:네|예).*아니요.*비고/u.test(compactCells)) return undefined;
    return cells.join(" · ");
  }

  return withoutBold.replace(/\s+/g, " ").replace(/\s+\d+\.\s*$/u, "").trim();
}

function excerptFor(text: string, isOcr: boolean): string {
  const paragraphs = text.split(/\n\s*\n/u).map((paragraph) => paragraph
    .split("\n")
    .map(cleanMarkdownLine)
    .filter((line): line is string => Boolean(line))
    .map((line) => isOcr ? cleanEvidenceLine(line) : line)
    .filter((line): line is string => Boolean(line))
    .join(" "))
    .filter(Boolean);
  if (!paragraphs.length) return "자동 문자 인식 품질이 낮은 페이지입니다. 표시된 PDF 쪽의 원문을 직접 확인해 주세요.";
  return paragraphs.join("\n\n");
}

function guideFromEvidence(pages: Array<{ text: string; isOcr: boolean }>, terms: string[], focusTerms: string[] = []): { message: string; keyPoints: string[] } | undefined {
  const statements = pages.flatMap((page) => {
    let text = excerptFor(page.text, page.isOcr);
    const answerAt = text.indexOf("답변:");
    if (answerAt >= 0) text = text.slice(answerAt + "답변:".length);
    return text
      .split(/\n{2,}|(?<=[.!?])\s+|(?=[○◦▪■□])/u)
      .map((statement) => statement.replace(/^[○◦▪■□·\-]+\s*/u, "").replace(/\s+/g, " ").trim())
      .filter((statement) => statement.length >= 8)
      .filter((statement) => !/[?？]$/u.test(statement) && !/^Q\d+[.)]/iu.test(statement))
      .filter((statement, index, all) => all.indexOf(statement) === index);
  });

  if (!statements.length) return undefined;
  const expandedTerms = terms.flatMap((term) => {
    if (term.includes("온라인")) return [term, "원격교육", "인터넷원격교육"];
    if (term.includes("부상자") || term.includes("환자")) return [term, "환자"];
    if (term.includes("보관")) return [term, "저장"];
    if (term.includes("보고")) return [term, "신고"];
    return [term];
  });
  const ordered = statements
    .map((statement, index) => {
      const normalizedStatement = normalize(statement).replaceAll(" ", "");
      const score = expandedTerms.filter((term) => normalizedStatement.includes(normalize(term).replaceAll(" ", ""))).length
        + focusTerms.filter((term) => normalizedStatement.includes(normalize(term).replaceAll(" ", ""))).length * 5;
      return { statement, index, score };
    })
    .sort((a, b) => b.score - a.score || a.index - b.index);
  const message = ordered[0].statement;
  const additional = ordered.slice(1, 5).map((entry) => entry.statement);
  return {
    message,
    keyPoints: additional.length ? additional : [message],
  };
}

export function searchManual(question: string, previousQuestion?: string): SearchResponse {
  const normalizedQuestion = normalize(question).replaceAll(" ", "");
  const questionRoute = QUESTION_ROUTES.find((route) => route.test.test(normalizedQuestion));
  const currentCategory = detectCategory(question);
  const newEmployeeTrainingQuestion = /(신규채용|채용시|신규.*현업|현업.*신규)/u.test(normalizedQuestion);
  const category = questionRoute?.category ?? (newEmployeeTrainingQuestion
    ? "education"
    : currentCategory ?? (previousQuestion && question.length <= 35 ? detectCategory(previousQuestion) : undefined));
  const terms = queryTerms(`${question} ${!currentCategory && category ? previousQuestion ?? "" : ""}`);
  const supervisorQuestion = category === "supervisor" ? detectSupervisorQuestion(question) : undefined;
  const supervisorDutyQuestion = category === "supervisor" && /(직무|업무|역할|임무)/u.test(normalize(question));
  const newEmployeeTrainingIntent = /(몇시간|교육시간|계약기간|일용|기간제)/u.test(normalizedQuestion)
    ? "hours"
    : /(수료증|이수증|제출|교육훈련비)/u.test(normalizedQuestion)
      ? "certificate"
      : /(진도율|시험|수료기준|이수기준)/u.test(normalizedQuestion)
      ? "completion"
      : /(어디|수강처|사이트|연수원|신청)/u.test(normalizedQuestion)
        ? "provider"
        : "general";
  const regularTrainingQuestion = !newEmployeeTrainingQuestion
    && category === "education"
    && /(정기교육|근로자정기|현업업무종사자정기|매반기|반기|과태료)/u.test(normalizedQuestion);
  const regularTrainingIntent = /(과태료|미실시|벌금)/u.test(normalizedQuestion)
    ? "fine"
    : /(몇시간|교육시간|반기|연간|집체|비대면|방법)/u.test(normalizedQuestion)
      ? "hours"
      : /(교육내용|무슨내용|무엇을배우)/u.test(normalizedQuestion)
        ? "content"
        : "general";
  const workerHealthQuestion = /(폐암|근로자건강센터|산업보건의|후드풍속|무료컨설팅)/u.test(normalizedQuestion);
  const committeeQuestion = /산업안전보건위원회/u.test(normalizedQuestion);
  const accidentResponseQuestion = category === "accident"
    && /(?:산업재해|사고).*(?:발생|났|나면).*(?:어떻게|대응|조치|처리|해야)|(?:어떻게|대응|조치|처리).*(?:산업재해|사고)/u.test(normalizedQuestion);
  const committeeIntent = /(몇명|구성|근로자위원|사용자위원)/u.test(normalizedQuestion)
    ? "composition"
    : /(회의|분기|개최|정족수|과반수|찬성)/u.test(normalizedQuestion)
      ? "meeting"
      : /(심의|의결|안건|사항)/u.test(normalizedQuestion)
        ? "agenda"
        : "general";
  const currentTrainingQuestion = category === "supervisor" && normalizedQuestion.includes("2026");
  const currentTrainingIntent = /(수료증|보관)/u.test(normalizedQuestion)
    ? "certificate"
    : /(수강|신청|기간|대상|신규과정)/u.test(normalizedQuestion)
      ? "enrollment"
      : "hours";
  const contractorActionQuestion = /(도급|용역|위탁)/u.test(normalizedQuestion) && /(확보조치|안전보건확보|평가기준|선정절차)/u.test(normalizedQuestion);
  const contractorCouncilQuestion = /(도급|수급인|수급업체)/u.test(normalizedQuestion) && /(협의체|회의|안건|협의|30일|60일|일시적|간헐적)/u.test(normalizedQuestion);
  const contractorCouncilIntent = /(30일|60일|일시적|간헐적|제외)/u.test(normalizedQuestion)
    ? "exemption"
    : /(구성|몇명|대리인|비대면|누가참여)/u.test(normalizedQuestion)
      ? "composition"
      : /(안건|협의사항|무엇을협의)/u.test(normalizedQuestion)
        ? "agenda"
        : /(회의순서|회의진행|서명|기록)/u.test(normalizedQuestion)
          ? "meeting"
          : "general";
  const fallback: SearchResponse = {
    status: "not_found",
    message: "이 질문과 충분히 관련된 매뉴얼 페이지를 찾지 못했습니다. 질문에 업무 분야나 핵심 용어를 더 넣어 주세요. 현재 자료만으로 답을 단정할 수 없습니다.",
    keyPoints: [],
    sourceTitle: manual.sourceTitle,
    sourceDate: manual.sourceDate,
    evidence: [],
  };
  if (!terms.length && !category) return fallback;

  const ranked = indexedPages.map((page) => {
    const searchTerms = "searchTerms" in page ? page.searchTerms : [];
    const normalized = normalize(`${page.section} ${page.text} ${searchTerms.join(" ")}`);
    const title = normalize(page.section);
    const matched = terms.filter((term) => normalized.includes(term));
    const titleHits = terms.filter((term) => title.includes(term)).length;
    const aliasHits = searchTerms.filter((alias) => {
      const normalizedAlias = normalize(alias);
      return terms.some((term) => normalizedAlias.includes(term) || term.includes(normalizedAlias));
    }).length;
    const supervisorBonus = !currentTrainingQuestion && page.sourceTitle === supervisorTraining.sourceTitle && page.pdfPage === supervisorQuestion ? 50 : 0;
    const supervisorDutyBonus = supervisorDutyQuestion && page.sourceTitle === safetyHealthRegulation.sourceTitle && page.section.includes("제7조") ? 30 : 0;
    const currentTrainingBonus = currentTrainingQuestion && page.sourceTitle === supervisorTraining2026.sourceTitle
      ? (currentTrainingIntent === "certificate" && page.section.includes("수료증 보관") ? 100
        : currentTrainingIntent === "enrollment" && page.section.includes("수강 대상") ? 100
          : currentTrainingIntent === "hours" && page.section.includes("시간 구성") ? 100
            : 10)
      : 0;
    const contractorActionBonus = contractorActionQuestion && page.sourceTitle === educationMinistryGuidance.sourceTitle && (page.section.includes("중대재해처벌법 과제 9") || page.section.includes("공통 자율점검 - 도급")) ? 100 : 0;
    const contractorCouncilBonus = contractorCouncilQuestion && page.sourceTitle === contractorCouncilGuidance.sourceTitle
      ? (contractorCouncilIntent === "exemption" && page.section.includes("적용 제외") ? 100
        : contractorCouncilIntent === "composition" && page.section.includes("구성과 운영") ? 100
          : contractorCouncilIntent === "agenda" && page.section.includes("협의할 사항") ? 100
            : contractorCouncilIntent === "meeting" && page.section.includes("진행과 기록") ? 100
              : 20)
      : 0;
    const newEmployeeTrainingBonus = newEmployeeTrainingQuestion && page.sourceTitle === newEmployeeTraining.sourceTitle
      ? (newEmployeeTrainingIntent === "hours" && page.section.includes("교육시간") ? 100
        : newEmployeeTrainingIntent === "certificate" && page.section.includes("수료증 제출") ? 100
          : newEmployeeTrainingIntent === "completion" && page.section.includes("수강신청·수료") ? 100
            : newEmployeeTrainingIntent === "provider" && page.section.includes("수강처") ? 100
              : 20)
      : 0;
    const regularTrainingBonus = regularTrainingQuestion && page.sourceTitle === regularWorkerTrainingCurrent.sourceTitle
      ? (regularTrainingIntent === "fine" && page.section.includes("과태료") ? 100
        : regularTrainingIntent === "hours" && page.section.includes("시간") ? 100
          : regularTrainingIntent === "content" && page.section.includes("교육내용") ? 100
            : 20)
      : 0;
    const workerHealthBonus = workerHealthQuestion && page.sourceTitle === workerHealthSupport.sourceTitle ? 80 : 0;
    const committeeBonus = committeeQuestion && page.sourceTitle === safetyHealthCommitteeCurrent.sourceTitle
      ? (committeeIntent === "composition" && page.section.includes("목적과 구성") ? 100
        : committeeIntent === "meeting" && page.section.includes("정족수") ? 100
          : committeeIntent === "agenda" && page.section.includes("심의·의결") ? 100
            : 20)
      : 0;
    const accidentResponseBonus = accidentResponseQuestion
      ? (page.section.includes("산업재해 비상대응체계") ? 110
        : page.section.includes("중대산업재해 최초 발견자의 즉시 조치") ? 105
          : page.section.includes("제29조(사고 발생 시 처리 절차)") ? 100
            : page.section.includes("산업재해 보고와 재발방지") ? 95
              : page.section.includes("산업재해 Q8") ? 90
                : 0)
      : 0;
    const routeIndex = questionRoute?.preferredSections.findIndex((section) => page.section.includes(section)) ?? -1;
    const routeBonus = routeIndex >= 0 ? 200 - routeIndex * 30 : 0;
    const score = matched.length * 2 + titleHits * 3 + aliasHits * 5 + (page.category === category ? 12 : 0) + supervisorBonus + supervisorDutyBonus + currentTrainingBonus + contractorActionBonus + contractorCouncilBonus + newEmployeeTrainingBonus + regularTrainingBonus + workerHealthBonus + committeeBonus + accidentResponseBonus + routeBonus;
    return { page, score, matched, routeBonus };
  }).filter((entry) => entry.score >= 4)
    .sort((a, b) => b.score - a.score || a.page.pdfPage - b.page.pdfPage);

  if (!ranked.length) return fallback;
  const best = ranked[0];
  if (!category && best.matched.length < 2 && best.score < 6) return fallback;
  const routed = questionRoute ? ranked.filter((entry) => entry.routeBonus > 0) : [];
  const selected = routed.length ? routed.slice(0, 3) : ranked.slice(0, 3);
  const selectedPages = new Set(selected.map((entry) => entry.page));
  const relatedThreshold = Math.max(8, Math.min(best.score - 4, Math.ceil(best.score * 0.55)));
  const related = ranked
    .filter((entry) => !selectedPages.has(entry.page))
    .filter((entry) => entry.score >= relatedThreshold && (!category || entry.page.category === category))
    .slice(0, 9);
  const evidenceGuide = questionRoute?.guide
    ?? (questionRoute ? guideFromEvidence(selected.map((entry) => entry.page), terms, questionRoute.focusTerms) : undefined);
  const guide = evidenceGuide ?? (category ? CATEGORY_GUIDES[category] : undefined);
  const toEvidence = ({ page }: (typeof ranked)[number]): Evidence => ({
    pdfPage: page.pdfPage,
    referenceLabel: page.referenceLabel,
    section: page.section,
    excerpt: excerptFor(page.text, page.isOcr),
    sourceTitle: page.sourceTitle,
    sourcePublisher: page.sourcePublisher,
    sourceDate: page.sourceDate,
    url: page.sourceUrl ? (page.sourceKind === "web" ? page.sourceUrl : `${page.sourceUrl}#page=${page.pdfPage}`) : undefined,
  });
  return {
    status: "found",
    message: guide?.message ?? "등록된 근거자료에서 질문과 관련된 내용을 찾았습니다. 아래 근거 항목을 함께 확인해 주세요.",
    keyPoints: guide?.keyPoints ?? [],
    sourceTitle: manual.sourceTitle,
    sourceDate: manual.sourceDate,
    evidence: selected.map(toEvidence),
    relatedEvidence: related.map(toEvidence),
    topic: category === "risk" || category === "msds" || category === "contractor" ? category : undefined,
  };
}
