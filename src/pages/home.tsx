import { CustomBlockBtn, CustomBlockBtnWrapper } from '@/components/common/button/CustomBlockBtn'
import { default as MobileDefaultLayout } from '@/components/common/layouts/mobileLayout/MobileLayout'

export default function Home() {
  return (
    <MobileDefaultLayout boxProps={{ px: '8px', pt: '30px' }}>
      <CustomBlockBtnWrapper>
        <CustomBlockBtn
          url="/user/qrcode"
          gridItemProps={{
            'aria-details': 'QR코드 열기',
            backgroundImage: "url('/icon/block/qrcode.png')",
            backgroundSize: '90px 90px',
            backgroundPosition: 'bottom 50% right 10px',
          }}
          colSize={2}
          rowSize={2}
          title="QR코드 열기"
        />
      </CustomBlockBtnWrapper>
      {/* <Text>결제 내역</Text> */}
      <CustomBlockBtnWrapper>
        <CustomBlockBtn url="/user/subscribe" colSize={2} rowSize={2} subTitle="나의 구독" />
        <CustomBlockBtn url="/" colSize={1} rowSize={2} subTitle="최근 결제" />
        <CustomBlockBtn url="/" colSize={1} rowSize={2} subTitle="다음 결제" />
      </CustomBlockBtnWrapper>
      {/* <MobileNavigation></MobileNavigation> */}

      {/* 이번다  결제 완료 금액 / 지출 금액 */}
      {/*  할인 시스템  */}
      {/*  광고 배너 시스템 */}
      {/*  내 동네 리뷰 시스템 */}
      {/* 회원 레벨? 시스템 */}
    </MobileDefaultLayout>
  )
}
