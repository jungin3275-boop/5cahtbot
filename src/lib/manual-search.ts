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
    message: "매뉴얼은 신규 채용 근로자의 고용 형태에 따라 채용 시 교육시간을 구분하고, 실시 기록을 보존하도록 안내합니다.",
    keyPoints: [
      "현업업무종사자(조리·시설관리·청소 등)는 채용 시 8시간 교육을 실시합니다.",
      "일용근로자는 근로기간이 1주일 이하이면 1시간, 1주일 초과 1개월 이하이면 4시간으로 안내되어 있습니다.",
      "교육은 현장·온라인·집체 방식으로 실시할 수 있으며, 교육일지와 이수증 등은 3년간 보존합니다.",
      "현업업무종사자의 정기교육은 반기별 12시간입니다.",
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
  musculoskeletal: ["근골격계", "부담작업", "유해요인조사"],
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

function cleanEvidenceLine(rawLine: string): string | undefined {
  const line = rawLine.normalize("NFKC").replace(/[•◦▪]/g, "·").replace(/\s+/g, " ").trim();
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

function excerptFor(text: string, isOcr: boolean): string {
  const paragraphs = text.split(/\n\s*\n/u).map((paragraph) => paragraph
    .split("\n")
    .map((line) => isOcr ? cleanEvidenceLine(line) : line.replace(/\*\*/g, "").replace(/\s+/g, " ").trim())
    .filter((line): line is string => Boolean(line))
    .join(" "))
    .filter(Boolean);
  if (!paragraphs.length) return "자동 문자 인식 품질이 낮은 페이지입니다. 표시된 PDF 쪽의 원문을 직접 확인해 주세요.";
  return paragraphs.join("\n\n");
}

export function searchManual(question: string, previousQuestion?: string): SearchResponse {
  const currentCategory = detectCategory(question);
  const normalizedQuestion = normalize(question).replaceAll(" ", "");
  const newEmployeeTrainingQuestion = /(신규채용|채용시|신규.*현업|현업.*신규)/u.test(normalizedQuestion);
  const category = newEmployeeTrainingQuestion
    ? "education"
    : currentCategory ?? (previousQuestion && question.length <= 35 ? detectCategory(previousQuestion) : undefined);
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
    const score = matched.length * 2 + titleHits * 3 + aliasHits * 5 + (page.category === category ? 12 : 0) + supervisorBonus + supervisorDutyBonus + currentTrainingBonus + contractorActionBonus + contractorCouncilBonus + newEmployeeTrainingBonus + regularTrainingBonus + workerHealthBonus + committeeBonus + accidentResponseBonus;
    return { page, score, matched };
  }).filter((entry) => entry.score >= 4)
    .sort((a, b) => b.score - a.score || a.page.pdfPage - b.page.pdfPage);

  if (!ranked.length) return fallback;
  const best = ranked[0];
  if (!category && best.matched.length < 2 && best.score < 6) return fallback;
  const selected = ranked.slice(0, accidentResponseQuestion ? 5 : 3);
  const guide = category ? CATEGORY_GUIDES[category] : undefined;
  return {
    status: "found",
    message: guide?.message ?? "등록된 근거자료에서 질문과 관련된 내용을 찾았습니다. 아래 근거 항목을 함께 확인해 주세요.",
    keyPoints: guide?.keyPoints ?? [],
    sourceTitle: manual.sourceTitle,
    sourceDate: manual.sourceDate,
    evidence: selected.map(({ page }) => ({
      pdfPage: page.pdfPage,
      referenceLabel: page.referenceLabel,
      section: page.section,
      excerpt: excerptFor(page.text, page.isOcr),
      sourceTitle: page.sourceTitle,
      sourcePublisher: page.sourcePublisher,
      sourceDate: page.sourceDate,
      url: page.sourceUrl ? (page.sourceKind === "web" ? page.sourceUrl : `${page.sourceUrl}#page=${page.pdfPage}`) : undefined,
    })),
    topic: category === "risk" || category === "msds" || category === "contractor" ? category : undefined,
  };
}
