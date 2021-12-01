import { Divider } from '@chakra-ui/layout'
import { FC } from 'react'

const DividerDefault: FC<{ my?: string }> = ({ my = '10px' }) => {
  return <Divider size="1px" my={my} />
}

export default DividerDefault
