import { Text } from '@chakra-ui/layout'
import QRCode from 'qrcode.react'
import React, { useState } from 'react'
import Clock from 'react-live-clock'
import DefaultLayout from '../../components/common/layouts/DefaultLayout'
import { useUser } from '../../state/swr/useUser'

export default function Home() {
  const { data: userData } = useUser()

  const data = JSON.stringify({
    id: 'aaa',
    created_at: Date.now(),
    menu_name: 'menu name',
  })

  const [key, setKey] = useState(data)

  // TODO socket 으로 실시간 완료
  // TODO 기간 만료시 갱신 버튼 뜨기

  return (
    <DefaultLayout>
      <QRCode value={key} size={300} />
      <Text as="h2" fontSize="4xl">
        <Clock format="HH:mm:ss" interval={1000} ticking={true} />
      </Text>
      {userData?.email}
    </DefaultLayout>
  )
}
