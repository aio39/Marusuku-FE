import DefaultLayout from '@/components/common/layouts/DefaultLayout'
import MobileLayout from '@/components/common/layouts/mobileLayout/MobileLayout'
import { Button } from '@chakra-ui/button'

export default function Home() {
  return (
    <DefaultLayout>
      <Button>offline</Button>
      <MobileLayout></MobileLayout>
    </DefaultLayout>
  )
}

// Home.getLayout = function getLayout(page: ReactElement) {
//   return <DefaultLayout>{page}</DefaultLayout>;
// };
