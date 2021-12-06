import MobileDefaultLayout from '@/components/common/layouts/mobileLayout/MobileLayout'
import { axiosI } from '@/state/fetcher'
import { useSubscribe } from '@/state/swr/users/useSubscribe'
import { useUser } from '@/state/swr/useUser'
import { PayToken } from '@/types/PayToken'
import { Box, Text } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/react'
import Echo from 'laravel-echo'
import QRCode from 'qrcode.react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Clock from 'react-live-clock'

export default function QRCodeClient() {
  const echoRef = useRef<Echo>()
  const { data: userData } = useUser()
  const toast = useToast()
  const [subscribeId, setSubscribeId] = useState<number>()
  const { data: subscribeData } = useSubscribe(
    userData ? { filter: [['user_id', userData.id]] } : undefined
  )
  const [token, setToken] = useState<PayToken>()

  // TODO socket 으로 실시간 완료
  // TODO 기간 만료시 갱신 버튼 뜨기

  useEffect(() => {
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

  useEffect(() => {
    if (!token) return
    if (!echoRef.current) {
      echoRef.current = new Echo({
        broadcaster: 'pusher',
        key: 'local',
        wsHost: '127.0.0.1', //window.location.hostname
        wsPort: 6001,
        // cluster: 'mt1',
        forceTLS: false, // SSL 쓴다면 설정해야함.
        disableStates: false,
        // authEndpoint: '/broadcast/auth ', 기본 엔드포인트 인증증
      })
    }

    // echo.channel('name').listen('.Nmaespace\\Event\\Class')
    echoRef.current.listen(`QRCodeUsed.${token.uuid}`, '.QRCodeUsed', (e: any) => {
      console.log(e.update)
      toast({
        title: '사용 되었습니다..',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    })
  }, [token])

  const qrCodeValue = useMemo(() => {
    if (!token) return undefined
    const { create_at, ...rest } = token
    return JSON.stringify(rest)
  }, [token])

  return (
    <MobileDefaultLayout>
      {qrCodeValue ? (
        <QRCode value={qrCodeValue} size={300} />
      ) : (
        <Box>사용할 구독을 선택해주세요</Box>
      )}

      <Text as="h2" fontSize="4xl">
        <Clock format="HH:mm:ss" interval={1000} ticking={true} />
      </Text>
      {userData?.email}
      {subscribeData?.data.map((data) => (
        <Box
          key={data.id}
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
