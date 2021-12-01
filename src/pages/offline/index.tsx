import { default as MobileDefaultLayout } from '@/components/common/layouts/mobileLayout/MobileLayout'
import { Button } from '@chakra-ui/button'
import Link from 'next/link'
export default function Home() {
  return (
    <MobileDefaultLayout boxProps={{ px: '0.5rem' }}>
      <Link href="offline/map">
        <Button>offline</Button>
      </Link>
    </MobileDefaultLayout>
  )
}
