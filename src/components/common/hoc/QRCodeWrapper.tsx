import useColorStore from '@/state/hooks/useColorStore'
import { Box, Center } from '@chakra-ui/layout'
import QRCode from 'qrcode.react'
import { FC } from 'react'

interface IQRCodeWrapper {
  qrCodeValue?: string
}

const QRCodeWrapper: FC<IQRCodeWrapper> = ({ qrCodeValue }) => {
  return (
    <Center
      p="10px"
      minW="full"
      minH="270px"
      borderColor={useColorStore('textMedium')}
      borderWidth="1px"
      border="solid"
    >
      {qrCodeValue ? (
        <QRCode value={qrCodeValue} size={250} includeMargin />
      ) : (
        <Box>사용할 구독을 선택해주세요</Box>
      )}
    </Center>
  )
}

export default QRCodeWrapper
