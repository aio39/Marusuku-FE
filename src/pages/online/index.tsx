import DefaultLayout from '@/components/common/layouts/DefaultLayout'
import MobileNavigation from '@/components/common/layouts/mobileLayout/MobileLayout'
import { Button } from '@chakra-ui/button'

export default function Home() {
  return (
    <DefaultLayout>
      <Button>online</Button>
      <MobileNavigation></MobileNavigation>
    </DefaultLayout>
  )
}

// Home.getLayout = function getLayout(page: ReactElement) {
//   return <DefaultLayout>{page}</DefaultLayout>;
// };
