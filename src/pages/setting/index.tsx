import DividerDefault from '@/components/common/DivderDefault'
import MobileDefaultLayout from '@/components/common/layouts/mobileLayout/MobileLayout'
import SettingMenuBlock, {
  SettingMenuBlockWrapper,
  SettingMenuItem,
} from '@/components/setting/SettingMenuBlock'
import { CheckCircleIcon } from '@chakra-ui/icons'

export default function Home() {
  return (
    <MobileDefaultLayout boxProps={{ px: '0.5rem' }}>
      <SettingMenuBlockWrapper>
        <SettingMenuBlock title="메뉴">
          <SettingMenuItem icon={CheckCircleIcon} title="주소 관리" url="/" />
          <SettingMenuItem icon={CheckCircleIcon} title="결제 관리" url="/" />
          <SettingMenuItem icon={CheckCircleIcon} title="구독중" url="/" />
        </SettingMenuBlock>
        <SettingMenuBlock title="메뉴">
          <SettingMenuItem icon={CheckCircleIcon} title="주소 관리" url="/" />
          <SettingMenuItem icon={CheckCircleIcon} title="결제 관리" url="/" />
          <SettingMenuItem icon={CheckCircleIcon} title="구독중" url="/" />
        </SettingMenuBlock>
        <DividerDefault />
        <SettingMenuBlock title="메뉴">
          <SettingMenuItem icon={CheckCircleIcon} title="주소 관리" url="/" />
          <SettingMenuItem icon={CheckCircleIcon} title="결제 관리" url="/" />
          <SettingMenuItem icon={CheckCircleIcon} title="구독중" url="/" />
        </SettingMenuBlock>
      </SettingMenuBlockWrapper>
    </MobileDefaultLayout>
  )
}
