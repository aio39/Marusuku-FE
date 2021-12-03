import useColorStore from '@/state/hooks/useColorStore'
import useScrollDown from '@/state/hooks/useScrollDown'
import { Box, BoxProps, Center, FlexProps, HStack, StackProps, Text } from '@chakra-ui/layout'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { IconType } from 'react-icons'
import { BsBoxSeam } from 'react-icons/bs'
import { RiHome2Line, RiShoppingBasket2Fill, RiUser3Fill } from 'react-icons/ri'
import { Container } from '../Container'

interface MenuProps {
  url: string
  svg: IconType
}

const MotionBox = motion<BoxProps>(Box)

const MobileMenuButton: FC<MenuProps & { selected?: boolean }> = ({ url, svg, selected }) => {
  return (
    <Link href={url}>
      <Center position="relative">
        {svg({})}
        <Text fontSize="sm"></Text>
        {selected && (
          <MotionBox
            layoutId="mobileMenu"
            position="absolute"
            w="3rem"
            h="3rem"
            borderRadius="1"
            opacity="0.1"
            bgColor={useColorStore('primary')}
            initial={{ backgroundColor: '#39c5bb', opacity: '0.1' }}
            animate={{}}
            transition={{ type: 'spring', stiffness: '50' }}
          ></MotionBox>
        )}
      </Center>
    </Link>
  )
}

const MotionHStack = motion<StackProps>(HStack)

const MobileNavigation: FC = () => {
  const menuList: MenuProps[] = [
    { url: '/', svg: RiHome2Line },
    { url: '/offline', svg: RiShoppingBasket2Fill },
    { url: '/online', svg: BsBoxSeam },
    { url: '/setting', svg: RiUser3Fill },
  ]
  const router = useRouter()
  const topPath = router.pathname.split('/')[1] as string | undefined
  const scrollDown = useScrollDown()

  console.log(scrollDown)
  return (
    <MotionHStack
      h="4rem"
      bgColor="white"
      position="sticky"
      // visibility={scrollDown ? 'hidden' : 'visible'}
      width="100vw"
      bottom={scrollDown ? '-80px' : '0'}
      borderTop="2px"
      justifyContent="space-around"
      backgroundColor={useColorStore('surface')}
    >
      {menuList.map((data) => (
        <MobileMenuButton key={data.url} {...data} selected={data.url === (topPath || '/')} />
      ))}
    </MotionHStack>
  )
}

const MobileDefaultLayout: FC<{
  flexProps?: FlexProps
  boxProps?: BoxProps
}> = ({ flexProps, boxProps, children }) => {
  return (
    <Container {...flexProps}>
      <Box width="full" height="full" {...boxProps}>
        {children}
      </Box>
      <Box flexGrow="1"> </Box>
      <MobileNavigation />
    </Container>
  )
}

export default MobileDefaultLayout
