import DefaultLayout from '@/components/common/layouts/DefaultLayout'
import { axiosI } from '@/state/fetcher'
import { useMenu } from '@/state/swr/shops/menus/useMenus'
import { useUser } from '@/state/swr/useUser'
import { Subscribe } from '@/types/Subscribe'
import { Button } from '@chakra-ui/button'
import { Text, VStack } from '@chakra-ui/layout'
import { toast, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MouseEventHandler } from 'react'

const Menu = () => {
  const router = useRouter()
  const { shop_id, menu_id } = router.query
  const { data: ShopData } = useMenu({
    shop_id: parseInt(shop_id as string),
    menu_id: parseInt(menu_id as string),
  })
  const { data: userData } = useUser()
  console.log(ShopData)
  const toast = useToast()
  const subscribeHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const { data } = await axiosI.post<Subscribe>(`/api/users/${userData?.id}/subscribes`, {
      menu_id,
    })
    toast({ title: 'success' })
  }

  return (
    <DefaultLayout>
      <VStack>
        <Text fontSize="lg">{ShopData?.cycle_month}</Text>
        <Text fontSize="lg">{ShopData?.price}</Text>

        <Button onClick={subscribeHandler}>구독하기</Button>
      </VStack>
    </DefaultLayout>
  )
}

export default Menu
