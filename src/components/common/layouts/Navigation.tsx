import useColorStore from '@/state/hooks/useColorStore'
import { useLogOut, useUser } from '@/state/swr/useUser'
import { ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { default as NextLink } from 'next/link'
import React, { FC, Fragment } from 'react'
import { NavItem, NAV_ITEMS } from './NAV_ITEMS'
const LoginStack = () => {
  const { data: userData, error, isValidating, mutate } = useUser()

  return (
    <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
      {userData ? (
        <Stack direction={'row'} spacing={4}>
          <Text fontSize="md">{userData.email}</Text>
          <Button
            fontSize={'sm'}
            fontWeight={400}
            onClick={async () => {
              console.info('๋ก๊ทธ์์')
              await useLogOut()
              mutate(undefined)
            }}
          >
            Logout
          </Button>
        </Stack>
      ) : isValidating ? (
        <Spinner size="xs" />
      ) : (
        <Fragment>
          <NextLink href="/user/login" passHref>
            <Button
              as={'a'}
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}
              // href={'#'}
            >
              Sign In
            </Button>
          </NextLink>
          <NextLink href="/user/register" passHref>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'pink.400'}
              // href={'#'}
              _hover={{
                bg: 'pink.300',
              }}
            >
              Sign Up
            </Button>
          </NextLink>
        </Fragment>
      )}
    </Stack>
  )
}

const MobileNavigationToggleBtn: FC<{ isOpen: boolean; onToggle: () => void }> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
      <IconButton
        onClick={onToggle}
        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
        variant={'ghost'}
        aria-label={'Toggle Navigation'}
      />
    </Flex>
  )
}

export default function Navigation() {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box w="100%" mb="1rem">
      <Flex
        bg={useColorStore('surface')}
        color={useColorStore('textMedium')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorStore('surface')}
        align={'center'}
      >
        <MobileNavigationToggleBtn isOpen={isOpen} onToggle={onToggle} />
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            // textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorStore('textHigh')}
          >
            Logo
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <LoginStack />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = useColorStore('textMedium')
  const linkHoverColor = useColorStore('textHigh')

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <div>
                <NextLink href={navItem.href ?? '#'} passHref>
                  <Link
                    p={2}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={linkColor}
                    width="full"
                    height="full"
                    _hover={{
                      textDecoration: 'none',
                      color: linkHoverColor,
                    }}
                  >
                    {navItem.label}
                  </Link>
                </NextLink>
              </div>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                zIndex="10000"
                // border={0}
                // boxShadow={'xl'}
                // bg={popoverContentBgColor}
                // p={4}
                // rounded={'xl'}
                // minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <NextLink href={href ?? '#'}>
      <Link
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorStore('weekPrimary') }}
      >
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}
          >
            <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    </NextLink>
  )
}

const MobileNav = () => {
  return (
    <Stack bg={useColorStore('surface')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600} color={useColorStore('textMedium')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorStore('weekGray')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}
