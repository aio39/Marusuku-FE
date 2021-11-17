export interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: '판매자',
    children: [
      {
        label: '가게 생성',
        subLabel: '가게를 생성합니다.',
        href: '/seller/create',
      },
      {
        label: '가게 정보',
        subLabel: '가게 정보를 표시합니다.',
        href: '/seller/shop',
      },
      {
        label: '스캔',
        subLabel: 'QR코드를 스캔합니다.',
        href: '/seller/scan',
      },
      {
        label: '메뉴 생성',
        subLabel: '메뉴를 추가합니다.',
        href: '/seller/menu',
      },
    ],
  },
  {
    label: '가게 리스트',
    href: '/shops/',
  },
  {
    label: '구매자',
    children: [
      {
        label: '유저 정보',
        subLabel: '유저 정보',
        href: '/user',
      },
      {
        label: '가게검색',
        subLabel: '가게 검색',
        href: '/user/search',
      },
      {
        label: '셋팅',
        subLabel: '셋팅',
        href: '/user/setting',
      },
      {
        label: 'QR코드 생성',
        subLabel: 'QR코드 생성',
        href: '/user/qrcode',
      },
    ],
  },
  {
    label: '테스트 메뉴',
    href: '/test',
  },
]
