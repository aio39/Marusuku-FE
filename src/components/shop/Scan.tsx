import { axiosI } from '@/state/fetcher'
import { useUser } from '@/state/swr/useUser'
import { PayToken } from '@/types/PayToken'
import { UseHistory } from '@/types/UseHistory'
import React, { useEffect, useState } from 'react'
import QrReader from 'react-qr-reader'

const Time3m = 3 * 60 * 1000

const getPostData = (token: PayToken) => ({
  paytoken_id: token.id,
  shop_id: token.shop_id,
  uuid: token.uuid,
})

const Scan = () => {
  const [token, setToken] = useState<PayToken>()
  const { data: userData } = useUser()

  const handleScan = (scannedData: any) => {
    if (scannedData && !token) {
      setToken(JSON.parse(scannedData) as PayToken)
      console.log(JSON.parse(scannedData))
    }
  }
  const handleError = (err: any) => {
    console.error(err)
  }

  if (token) {
    console.log(Date.parse(token.create_at))
  }

  useEffect(() => {
    if (token) {
      axiosI
        .post<UseHistory>(`/api/users/${userData?.id}/use_histories`, getPostData(token))
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [token])

  return <QrReader delay={300} onError={handleError} onScan={handleScan} />
}

export default Scan
