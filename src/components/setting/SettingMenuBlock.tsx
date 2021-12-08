import { IconProps } from '@chakra-ui/icons'
import { Box, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/layout'
import { ComponentWithAs } from '@chakra-ui/system'
import Link from 'next/link'
import { FC } from 'react'
import { IconType } from 'react-icons'
interface ISettingMenuBlock {
  title: string
}

interface ISettingMenuItem {
  title: string
  url: string
  icon: ComponentWithAs<'svg', IconProps> | IconType
  color?: string
}

const SettingMenuBlockWrapper: FC = ({ children }) => {
  return (
    <Box width="100%" sx={{ '.SettingMenuBlock:not(:last-child)': { mb: '30px' } }}>
      {children}
    </Box>
  )
}

const SettingMenuBlock: FC<ISettingMenuBlock> = ({ title, children }) => {
  return (
    <VStack alignItems="start" className="SettingMenuBlock">
      <Text fontSize="xl" fontWeight="600" mb="5px">
        {title}
      </Text>
      <List spacing={3}>{children}</List>
    </VStack>
  )
}

const SettingMenuItem: FC<ISettingMenuItem> = ({ title, url, icon, color }) => {
  return (
    <Link href={url}>
      <ListItem fontSize="lg" fontWeight="400">
        <ListIcon as={icon} color={color || 'green.500'} />
        {title}
      </ListItem>
    </Link>
  )
}

export default SettingMenuBlock
export { SettingMenuItem, SettingMenuBlockWrapper }
