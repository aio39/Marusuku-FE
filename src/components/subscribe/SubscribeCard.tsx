import useColorStore from '@/state/hooks/useColorStore'
import { qrcodeSelectedIdState } from '@/state/recoil/tempAtoms'
import { Subscribe } from '@/types/Subscribe'
import { Center, Flex, Heading, Text, VStack } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/react'
import { FC } from 'react'
import { useRecoilState } from 'recoil'

interface ISubscribeCardWrapper {
  data?: AtLeast<Subscribe, 'id' | 'menu' | 'shop'>[]
  onClick?: (...args: any[]) => void
  isLoading?: Boolean
}

interface ISubscribeCard {
  data: AtLeast<Subscribe, 'id' | 'menu' | 'shop'>
  onClick?: (...args: any[]) => void
}

const SubscribeCard: FC<ISubscribeCard> = ({ data, onClick }) => {
  const [selectedId, setSelectedId] = useRecoilState(qrcodeSelectedIdState)

  const { id, menu, shop, settlement_date, is_continue } = data

  return (
    <Flex
      width="100%"
      bgColor={useColorStore('background')}
      border="solid"
      borderColor={useColorStore('primary')}
      borderWidth={selectedId === id ? '2px' : '0px'}
      order={selectedId === id ? '-1' : '1'}
      p="16px"
      borderRadius="16px"
      boxSizing="border-box"
      onClick={() => {
        setSelectedId(id)
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        }
      }}
    >
      <VStack textAlign="start" alignItems="start">
        <Heading size="md">{shop.name}</Heading>
        <Text fontSize="lg">{menu.name}</Text>
        <Text fontSize="sm">{menu.cycle_month}개월 지속 상품</Text>
      </VStack>
      {/* {convertDate(data.settlement_date, 'YMDHM')}
      {convertDate(data.updated_at, 'YMDHM')} */}
    </Flex>
  )
}

const SubscribeCardWrapper: FC<ISubscribeCardWrapper> = ({ data, isLoading }) => {
  if (!data)
    return (
      <VStack width="full">
        <Skeleton width="full" height="88px" />
        <Skeleton width="full" height="88px" />
        <Skeleton width="full" height="88px" />
      </VStack>
    )

  return (
    <VStack width="100%" spacing="16px">
      {data.length === 0 ? (
        <Center height="120px" fontSize="lg">
          구독을 하고 있지 않습니다.
        </Center>
      ) : (
        data.map((data) => <SubscribeCard data={data} key={data.id} />)
      )}
    </VStack>
  )
}

export { SubscribeCard, SubscribeCardWrapper }
