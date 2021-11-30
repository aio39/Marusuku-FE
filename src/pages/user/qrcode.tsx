import DefaultLayout from '@/components/common/layouts/DefaultLayout'
import { axiosI } from '@/state/fetcher'
import { useUser } from '@/state/swr/useUser'
import { PayToken } from '@/types/PayToken'
import { Box, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/router'
import QRCode from 'qrcode.react'
import React, { useEffect, useMemo, useState } from 'react'
import Clock from 'react-live-clock'

export default function Home() {
  const { data: userData } = useUser()

  const data = JSON.stringify({
    id: 'aaa',
    created_at: Date.now(),
    menu_name: 'menu name',
  })

  const [token, setToken] = useState<PayToken>()
  const router = useRouter()
  console.log(router.query)
  // TODO socket 으로 실시간 완료
  // TODO 기간 만료시 갱신 버튼 뜨기

  useEffect(() => {
    if (token) return
    if (router.query.subscribe_id && userData) {
      console.log('실행됨')
      axiosI
        .post<PayToken>(`api/users/${userData.id}/pay_tokens`, {
          subscribe_id: router.query.subscribe_id,
        })
        .then((data) => {
          setToken(data.data)
        })
    }
  }, [router.isReady, userData])

  const qrCodeValue = useMemo(() => {
    if (!token) return undefined
    const { create_at, ...rest } = token
    return JSON.stringify(rest)
  }, [token])

  return (
    <DefaultLayout>
      {qrCodeValue ? <QRCode value={qrCodeValue} size={300} /> : <Box>loading</Box>}

      <Text as="h2" fontSize="4xl">
        <Clock format="HH:mm:ss" interval={1000} ticking={true} />
      </Text>
      {userData?.email}
    </DefaultLayout>
  )
}
