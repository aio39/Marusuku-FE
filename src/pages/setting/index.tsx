import DividerDefault from '@/components/common/DividerDefault'
import MobileDefaultLayout from '@/components/common/layouts/mobileLayout/MobileLayout'
import SettingMenuBlock, {
  SettingMenuBlockWrapper,
  SettingMenuItem,
} from '@/components/setting/SettingMenuBlock'
import useColorStore from '@/state/hooks/useColorStore'
import { AiOutlineCreditCard, AiOutlineNotification } from 'react-icons/ai'
import { FaQuestion } from 'react-icons/fa'
import {
  MdCalendarToday,
  MdEditNotifications,
  MdEventNote,
  MdNotificationsNone,
  MdOutlineCancel,
  MdOutlineRateReview,
  MdOutlineTextSnippet,
  MdOutlineTipsAndUpdates,
  MdOutlineViewAgenda,
} from 'react-icons/md'
import {
  RiBookletLine,
  RiCoupon3Line,
  RiHeartLine,
  RiInformationLine,
  RiMoneyDollarCircleLine,
} from 'react-icons/ri'

export default function Home() {
  return (
    <MobileDefaultLayout boxProps={{ px: '0.5rem' }} flexProps={{ bg: useColorStore('surface') }}>
      {/* 사용자 정보 요약 컴포넌트 */}
      <SettingMenuBlockWrapper>
        <SettingMenuBlock title="내 정보">
          <SettingMenuItem icon={RiBookletLine} title="주소 관리" url="/" />
          <SettingMenuItem icon={AiOutlineCreditCard} title="카드 관리" url="/" />
          <SettingMenuItem icon={RiMoneyDollarCircleLine} title="결제 관리" url="/" />
          <SettingMenuItem icon={RiCoupon3Line} title="쿠폰 " url="/" />
          <SettingMenuItem icon={MdOutlineRateReview} title="리뷰 관리 " url="/" />
          <SettingMenuItem icon={MdOutlineTipsAndUpdates} title="정보 수정 " url="/" />
          <SettingMenuItem icon={MdNotificationsNone} title="알림 " url="/" />
        </SettingMenuBlock>
        <SettingMenuBlock title="내 구독">
          {/* 리스트 / 캘린더 형식  */}
          <SettingMenuItem icon={MdOutlineViewAgenda} title="구독 모아보기" url="/" />
          <SettingMenuItem icon={MdCalendarToday} title="구독 일정" url="/" />
          <SettingMenuItem icon={MdOutlineCancel} title="구독 해지" url="/" />
          <SettingMenuItem icon={RiHeartLine} title="관심 구독" url="/" />
        </SettingMenuBlock>
        <DividerDefault />
        <SettingMenuBlock title="설정 및 정보">
          <SettingMenuItem icon={MdEditNotifications} title="알림 설정" url="/" />
          {/* <SettingMenuItem icon={CheckCircleIcon} title="버전 정보" url="/" /> */}
          <SettingMenuItem icon={AiOutlineNotification} title="공지 사항" url="/" />
          <SettingMenuItem icon={MdEventNote} title="이벤트 정보" url="/" />
        </SettingMenuBlock>
        <SettingMenuBlock title="문의">
          <SettingMenuItem icon={FaQuestion} title="FAQ센터" url="/" />
          <SettingMenuItem icon={RiInformationLine} title="버전 정보" url="/" />
          <SettingMenuItem icon={MdOutlineTextSnippet} title="약관 및 동의" url="/" />
        </SettingMenuBlock>
      </SettingMenuBlockWrapper>
    </MobileDefaultLayout>
  )
}
