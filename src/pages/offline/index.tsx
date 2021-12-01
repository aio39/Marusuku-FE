import { CustomBlockBtn, CustomBlockBtnWrapper } from '@/components/common/button/CustomBlockBtn'
import { default as MobileDefaultLayout } from '@/components/common/layouts/mobileLayout/MobileLayout'
export default function Home() {
  return (
    <MobileDefaultLayout boxProps={{ px: '8px', pt: '30px' }}>
      <CustomBlockBtnWrapper>
        <CustomBlockBtn
          url="/offline/map"
          gridItemProps={{
            'aria-details': '지도에서 찾기',
            backgroundImage: "url('/icon/block/map.png')",
            backgroundSize: '90px 90px',
            backgroundPosition: 'bottom 50% right 10px',
          }}
          colSize={2}
          rowSize={2}
          title="지도에서 찾기"
          subTitle="주변 가게"
        />
        <CustomBlockBtn
          url="/"
          gridItemProps={{
            'aria-details': '세일 상품',
            backgroundImage: "url('/icon/block/sale.gif')",
            backgroundSize: '150px 150px',
            backgroundPosition: 'bottom -20px right 10px',
          }}
          colSize={1}
          rowSize={4}
          title="세일 상품"
          subTitle="득템 찬스!!"
        />
        <CustomBlockBtn
          url="/"
          gridItemProps={{
            'aria-details': '검색 하기',
            backgroundImage: "url('/icon/block/search.png')",
            backgroundSize: '90px 90px',
            backgroundPosition: 'bottom 10px right 10px',
          }}
          colSize={1}
          rowSize={4}
          title="검색해서 찾기"
        />
        <CustomBlockBtn
          url="/"
          gridItemProps={{ 'aria-details': '' }}
          colSize={1}
          rowSize={2}
          title="title"
        />
      </CustomBlockBtnWrapper>
    </MobileDefaultLayout>
  )
}
