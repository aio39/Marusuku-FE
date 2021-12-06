import MobileDefaultLayout from '@/components/common/layouts/mobileLayout/MobileLayout'
import { axiosI } from '@/state/fetcher'
import { useSubscribe } from '@/state/swr/users/useSubscribe'
import { useUser } from '@/state/swr/useUser'
import { PayToken } from '@/types/PayToken'
import { Box, Text } from '@chakra-ui/layout'
import QRCode from 'qrcode.react'
import React, { useEffect, useMemo, useState } from 'react'
import Clock from 'react-live-clock'

export default function Home() {
  const { data: userData } = useUser()
  const [subscribeId, setSubscribeId] = useState<number>()
  const { data: subscribeData } = useSubscribe(
    userData ? { filter: [['user_id', userData.id]] } : undefined
  )
  const [token, setToken] = useState<PayToken>()

  const data = JSON.stringify({
    id: 'aaa',
    created_at: Date.now(),
    menu_name: 'menu name',
  })

  // TODO socket 으로 실시간 완료
  // TODO 기간 만료시 갱신 버튼 뜨기

  useEffect(() => {
    if (token) return
    if (subscribeId && userData) {
      console.log('실행됨')
      axiosI
        .post<PayToken>(`api/users/${userData.id}/pay_tokens`, {
          subscribe_id: subscribeId,
        })
        .then((data) => {
          setToken(data.data)
        })
    }
  }, [userData, subscribeId])

  const qrCodeValue = useMemo(() => {
    if (!token) return undefined
    const { create_at, ...rest } = token
    return JSON.stringify(rest)
  }, [token])

  return (
    <MobileDefaultLayout>
      {qrCodeValue ? <QRCode value={qrCodeValue} size={300} /> : <Box>loading</Box>}

      <Text as="h2" fontSize="4xl">
        <Clock format="HH:mm:ss" interval={1000} ticking={true} />
      </Text>
      {userData?.email}
      {subscribeData?.data.map((data) => (
        <Box
          onClick={() => {
            setSubscribeId(data.id)
          }}
        >
          {data.menu.name}
          <Text>{data.shop.name}</Text>
          <Text>{data.continue}</Text>
          <Text>{data.end_date} 끝나는 날 </Text>
          <Text>{data.settlement_date} 다음 결제일</Text>
        </Box>
      ))}
    </MobileDefaultLayout>
  )
}
