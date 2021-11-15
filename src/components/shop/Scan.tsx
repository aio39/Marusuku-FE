import DefaultLayout from '@/components/common/layouts/DefaultLayout'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import QrReader from 'react-qr-reader'

const Scan = () => {
  const [qr, setQr] = useState()

  const handleScan = (data: any) => {
    if (data) {
      setQr(data)
      console.log(JSON.parse(data))
    }
  }
  const handleError = (err: any) => {
    console.error(err)
  }

  return <QrReader delay={300} onError={handleError} onScan={handleScan} />
}

export default Scan
