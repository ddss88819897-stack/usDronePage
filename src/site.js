// 사이트 전체에서 쓰는 연락처·주소. 바뀌면 여기만 고치면 됩니다.
export const SITE = {
  name: '울산드론아카데미',
  phone: '0507-1496-3541',
  kakao: 'http://pf.kakao.com/_ZaxiFX',
  address: '울산 울주군 범서읍 서사별빛1로 34',
};

export const NAV = [
  { to: '/curriculum', label: '국가자격 과정' },
  { to: '/event', label: '출강·행사' },
  { to: '/about', label: '강사 소개' },
  { to: '/gallery', label: '현장 갤러리' },
  { to: '/location', label: '오시는 길' },
];

// use: 쉬운 말로 어떤 기체·일에 필요한지. includes·period: 원장님 확인 후 채우면 교육비 표에 자동으로 표시됩니다.
export const COURSES = [
  { name: '1종 정규반', short: '1종', hours: 20, price: 2000000, note: '최대이륙중량 25kg 초과 ~ 150kg 이하', use: '농약 방제용 같은 대형 기체', includes: '', period: '' },
  { name: '2종 정규반', short: '2종', hours: 10, price: 1500000, note: '최대이륙중량 7kg 초과 ~ 25kg 이하', use: '측량·산업 촬영용 중형 기체', includes: '', period: '' },
  { name: '3종 정규반', short: '3종', hours: 6, price: 500000, note: '최대이륙중량 2kg 초과 ~ 7kg 이하', use: '촬영용 소형 기체', includes: '', period: '' },
  { name: '지도조종자(교관)', short: '교관', hours: 100, price: 3000000, note: '1종 취득 후, 교육생을 가르치는 교관 자격', use: '드론 교육원 강사로 일하려는 분', includes: '', period: '' },
  { name: '실기평가조종자', short: '평가조종자', hours: 150, price: 5000000, note: '지도조종자 취득 후, 실기시험을 평가하는 자격', use: '실기시험 평가까지 맡으려는 교관', includes: '', period: '' },
];

// 교육비 아래 자주 묻는 질문. answer가 빈 항목은 화면에 나오지 않습니다 (원장님 확인 후 채우기).
export const FAQ = [
  {
    q: '어떤 종을 따야 하나요?',
    a: '쓰려는 기체의 최대이륙중량으로 정해집니다. 방제용 대형 기체는 1종, 중형 산업용 기체는 2종, 소형 촬영용 기체는 3종이 필요합니다. 상위 종을 따면 그 아래 종 기체도 조종할 수 있습니다.',
  },
  {
    q: '시험은 어디서 보나요?',
    a: '학과시험과 실기시험 모두 한국교통안전공단이 주관합니다. 실기시험 준비는 교육원에서 1:1로 진행합니다.',
  },
  {
    q: '교관·평가조종자가 되려면 무엇이 필요한가요?',
    a: '지도조종자(교관)는 1종 자격과 비행경력 100시간, 실기평가조종자는 지도조종자 자격과 비행경력 150시간이 필요합니다.',
  },
  {
    q: '수업 일정은 어떻게 정하나요?',
    a: '1:1 수업이라 수강생마다 일정을 따로 잡습니다. 원하는 요일과 시간을 상담 때 알려주세요.',
  },
  // TODO(원장님 확인): 답을 채우면 바로 표시됩니다.
  { q: '교육비에 응시료와 기체 대여가 포함되나요?', a: '' },
  { q: '환불 기준은 어떻게 되나요?', a: '' },
];

export const won = (n) => n.toLocaleString('ko-KR');
