import useColorStore from '@/state/hooks/useColorStore'
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
  subText?: string
  url: string
  icon: ComponentWithAs<'svg', IconProps> | IconType
  color: string
}

const SettingMenuBlockWrapper: FC = ({ children }) => {
  return (
    <Box
      width="100%"
      px="8px"
      sx={{
        '.SettingMenuBlock:not(:last-child)': { mb: '30px' },
        li: {
          display: 'flex',
          alignItems: 'center',
        },
        svg: {
          mt: '3px',
        },
      }}
    >
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
      <List spacing={3} width="full">
        {children}
      </List>
    </VStack>
  )
}

const SettingMenuItem: FC<ISettingMenuItem> = ({ title, subText, url, icon, color, children }) => {
  return (
    <Box position="relative" width="100%">
      <Link href={url}>
        <ListItem fontSize="lg" fontWeight="400">
          <ListIcon as={icon} color={color || 'green.500'} />
          <Box display="flex" flexDirection="column">
            <Text color={useColorStore('textHigh')}>{title}</Text>
            {subText && (
              <Text fontSize="sm" color={useColorStore('textMedium')}>
                {subText}
              </Text>
            )}
          </Box>
          {children && (
            <>
              <Box flexGrow="1"></Box>
              {children}
            </>
          )}
        </ListItem>
      </Link>
    </Box>
  )
}

export default SettingMenuBlock
export { SettingMenuItem, SettingMenuBlockWrapper }
