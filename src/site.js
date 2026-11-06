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

export const COURSES = [
  { name: '1종 정규반', hours: 20, price: 2000000, note: '최대이륙중량 25kg 초과 ~ 150kg 이하' },
  { name: '2종 정규반', hours: 10, price: 1500000, note: '최대이륙중량 7kg 초과 ~ 25kg 이하' },
  { name: '3종 정규반', hours: 6, price: 500000, note: '최대이륙중량 2kg 초과 ~ 7kg 이하' },
  { name: '지도조종자(교관)', hours: 100, price: 3000000, note: '1종 취득 후, 교육생을 가르치는 교관 자격' },
  { name: '실기평가조종자', hours: 150, price: 5000000, note: '지도조종자 취득 후, 실기시험을 평가하는 자격' },
];

export const won = (n) => n.toLocaleString('ko-KR');

// 첫 화면·지표 띠에 쓰는 숫자 (모두 사실 기반)
export const STATS = [
  { value: 5, unit: '개', label: '정규 국가자격 과정' },
  { value: 150, unit: '시간', label: '최장 비행교육 과정' },
  { value: 10, unit: '곳+', label: '출강한 기관·학교' },
  { value: 2017, unit: '년', label: '드론 활동 시작', from: 2000 },
];
