import { Box, BoxProps, Center, HStack, Text } from '@chakra-ui/layout'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { IconType } from 'react-icons'
import { BsBoxSeam } from 'react-icons/bs'
import { RiHome2Line, RiShoppingBasket2Fill, RiUser3Fill } from 'react-icons/ri'

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
            bgColor="#39c5bb"
            initial={{ backgroundColor: '#39c5bb', opacity: '0.1' }}
            animate={{}}
            transition={{ type: 'spring', stiffness: '50' }}
          ></MotionBox>
        )}
      </Center>
    </Link>
  )
}

const MobileLayout: FC = () => {
  const menuList: MenuProps[] = [
    { url: '/', svg: RiHome2Line },
    { url: 'offline', svg: BsBoxSeam },
    { url: 'online', svg: RiShoppingBasket2Fill },
    { url: 'setting', svg: RiUser3Fill },
  ]
  const router = useRouter()
  const topPath = router.pathname.split('/')[1] as string | undefined
  console.log()

  return (
    <HStack
      h="4rem"
      bgColor="white"
      width="100vw"
      position="fixed"
      bottom="0"
      borderTop="2px"
      justifyContent="space-around"
    >
      {menuList.map((data) => (
        <MobileMenuButton {...data} selected={data.url === (topPath || '/')} />
      ))}
    </HStack>
  )
}

export default MobileLayout
