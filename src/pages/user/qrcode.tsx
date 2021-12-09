import QRCodeWrapper from '@/components/common/hoc/QRCodeWrapper'
import MobileEmptyLayout from '@/components/common/layouts/mobileLayout/MobileEmptyLayout'
import TopHiddenByScrollBtn from '@/components/common/layouts/mobileLayout/TopHiddenByScrollBtn'
import { SubscribeCardWrapper } from '@/components/subscribe/SubscribeCard'
import UserInformation from '@/components/user/UserInformation'
import objectPick from '@/helper/objectPick'
import { axiosI } from '@/state/fetcher'
import useColorStore from '@/state/hooks/useColorStore'
import { qrcodeSelectedIdState } from '@/state/recoil/tempAtoms'
import { useSubscribes } from '@/state/swr/users/useSubscribe'
import { useUser } from '@/state/swr/useUser'
import { PayToken } from '@/types/PayToken'
import { Heading, Text, VStack } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/react'
import Echo from 'laravel-echo'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
// import Clock from 'react-live-clock'

export default function QRCodeClient() {
  const echoRef = useRef<Echo>()
  const { data: userData } = useUser()
  const toast = useToast()
  const [selectedId, setSelectedId] = useRecoilState(qrcodeSelectedIdState)
  const { data: subscribeData } = useSubscribes(
    userData ? { filter: [['user_id', userData.id]] } : undefined
  )
  const [token, setToken] = useState<PayToken>()

  // TODO socket 으로 실시간 완료
  // TODO 기간 만료시 갱신 버튼 뜨기

  useEffect(() => {
    if (selectedId && userData) {
      console.log('실행됨')
      axiosI
        .post<PayToken>(`api/users/${userData.id}/pay_tokens`, {
          subscribe_id: selectedId,
        })
        .then((data) => {
          setToken(data.data)
        })
    }
  }, [userData, selectedId])

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
      setSelectedId(undefined)
    })
  }, [token])

  const qrCodeValue = useMemo(() => {
    if (!token) return undefined
    const { created_at, ...rest } = token
    return JSON.stringify(rest)
  }, [token])

  return (
    <MobileEmptyLayout>
      <TopHiddenByScrollBtn>
        <Text flexGrow="2">QR 코드</Text>
      </TopHiddenByScrollBtn>
      <VStack
        width="100vw"
        height="full"
        flexGrow="1"
        mt="0"
        px="8px"
        bgColor={useColorStore('surface')}
      >
        <UserInformation />
        <QRCodeWrapper qrCodeValue={qrCodeValue} />
        <Text as="h2" fontSize="3xl">
          {/* <Clock format="HH:mm:ss" interval={1000} ticking={true} /> */}
        </Text>

        <Heading size="md" width="full">
          나의 구독
        </Heading>
        <SubscribeCardWrapper
          data={
            subscribeData &&
            subscribeData.data.map((data) =>
              objectPick(data, 'id', 'menu', 'shop', 'settlement_date', 'is_continue')
            )
          }
        />
      </VStack>
    </MobileEmptyLayout>
  )
}
