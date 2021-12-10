import DividerDefault from '@/components/common/DividerDefault'
import MobileDefaultLayout from '@/components/common/layouts/mobileLayout/MobileLayout'
import H1Text from '@/components/common/textView/H1Text'
import SettingMenuBlock, {
  SettingMenuBlockWrapper,
  SettingMenuItem,
} from '@/components/setting/SettingMenuBlock'
import UserInformation from '@/components/user/UserInformation'
import useColorStore from '@/state/hooks/useColorStore'
import { Badge } from '@chakra-ui/layout'
import { AiOutlineCreditCard, AiOutlineNotification } from 'react-icons/ai'
import { FaQuestion } from 'react-icons/fa'
import {
  MdCalendarToday,
  MdEditNotifications,
  MdEventNote,
  MdNotificationsNone,
  MdOutlineCancel,
  MdOutlineHistory,
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
    <MobileDefaultLayout
      boxProps={{ px: '0.5rem', alignItems: 'start' }}
      flexProps={{ bg: useColorStore('surface') }}
    >
      {/* 사용자 정보 요약 컴포넌트 */}
      <H1Text>메뉴</H1Text>
      <UserInformation></UserInformation>
      <SettingMenuBlockWrapper>
        <SettingMenuBlock title="내 정보">
          <SettingMenuItem icon={RiBookletLine} title="주소 관리" url="/" color="red.700" />
          <SettingMenuItem icon={AiOutlineCreditCard} title="카드 관리" url="/" color="blue.500" />
          <SettingMenuItem
            icon={RiMoneyDollarCircleLine}
            title="결제 관리"
            url="/"
            color="yellow.500"
          />
          <SettingMenuItem
            icon={MdOutlineHistory}
            title="사용 내역"
            url="/setting/use-history"
            color="purple.500"
          />
          <SettingMenuItem icon={RiCoupon3Line} title="쿠폰 " url="/" color="red.500">
            <Badge colorScheme="red" borderRadius="4px">
              12
            </Badge>
          </SettingMenuItem>
          <SettingMenuItem
            icon={MdOutlineRateReview}
            title="리뷰 관리 "
            url="/setting/reviews"
            color="yellow.400"
          >
            <Badge colorScheme="yellow" borderRadius="4px">
              작성 가능
            </Badge>
          </SettingMenuItem>
          <SettingMenuItem
            icon={MdOutlineTipsAndUpdates}
            title="정보 수정 "
            url="/"
            color="green.500"
          />
          <SettingMenuItem icon={MdNotificationsNone} title="알림 " url="/" color="yellow.500">
            <Badge colorScheme="orange" borderRadius="4px">
              4
            </Badge>
          </SettingMenuItem>
        </SettingMenuBlock>
        <DividerDefault />
        <SettingMenuBlock title="내 구독">
          {/* 리스트 / 캘린더 형식  */}
          <SettingMenuItem
            icon={MdOutlineViewAgenda}
            title="구독 모아보기"
            url="/"
            color="cyan.400"
          />
          <SettingMenuItem
            icon={MdCalendarToday}
            title="구독 일정"
            url="/setting/subscribe-cal"
            color="blue.400"
          />
          <SettingMenuItem icon={RiHeartLine} title="관심 구독" url="/" color="red.500" />
          <SettingMenuItem icon={MdOutlineCancel} title="구독 해지" url="/" color="red.800" />
        </SettingMenuBlock>
        <DividerDefault />
        <SettingMenuBlock title="설정 및 정보">
          <SettingMenuItem
            icon={MdEditNotifications}
            title="알림 설정"
            url="/"
            color="yellow.500"
          />
          {/* <SettingMenuItem icon={CheckCircleIcon} title="버전 정보" url="/" color="green.500"  /> */}
          <SettingMenuItem icon={AiOutlineNotification} title="공지 사항" url="/" color="red.500" />
          <SettingMenuItem icon={MdEventNote} title="이벤트 정보" url="/" color="green.500" />
        </SettingMenuBlock>
        <SettingMenuBlock title="문의">
          <SettingMenuItem
            icon={FaQuestion}
            title="FAQ센터"
            subText="뭐든지  물어보세요!"
            url="/"
            color="red.500"
          ></SettingMenuItem>
          <SettingMenuItem icon={RiInformationLine} title="버전 정보" url="/" color="green.500" />
          <SettingMenuItem
            icon={MdOutlineTextSnippet}
            title="약관 및 동의"
            url="/"
            color="purple.600"
          ></SettingMenuItem>
        </SettingMenuBlock>
      </SettingMenuBlockWrapper>
    </MobileDefaultLayout>
  )
}
