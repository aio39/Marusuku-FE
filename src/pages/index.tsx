import MobileLayout from '@/components/common/layouts/mobileLayout/MobileLayout'
import { Button } from '@chakra-ui/button'
import DefaultLayout from '../components/common/layouts/DefaultLayout'

export default function Home() {
  return (
    <DefaultLayout>
      <Button>aaa</Button>
      <MobileLayout></MobileLayout>
    </DefaultLayout>
  )
}

// Home.getLayout = function getLayout(page: ReactElement) {
//   return <DefaultLayout>{page}</DefaultLayout>;
// };
