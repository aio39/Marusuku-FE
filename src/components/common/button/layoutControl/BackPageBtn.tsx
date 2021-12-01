import useColorStore from '@/state/hooks/useColorStore'
import { IconButton, IconButtonProps } from '@chakra-ui/button'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { FC } from 'react'

const BackPageBtn: FC<Partial<IconButtonProps>> = (props) => {
  const router = useRouter()
  return (
    <IconButton
      {...props}
      size="md"
      onClick={() => router.back()}
      aria-label="뒤로가기"
      colorScheme="red"
      backgroundColor={useColorStore('surface')}
      color={useColorStore('textHigh')}
      icon={<ArrowBackIcon />}
    />
  )
}

export default BackPageBtn
