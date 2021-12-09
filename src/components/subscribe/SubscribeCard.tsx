import useColorStore from '@/state/hooks/useColorStore'
import { Subscribe } from '@/types/Subscribe'
import { Center, Flex, Text, VStack } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/react'
import { FC } from 'react'

interface ISubscribeCardWrapper {
  data?: AtLeast<Subscribe, 'id' | 'menu' | 'shop'>[]
  onClick: (...args: any[]) => void
  isLoading?: Boolean
}

interface ISubscribeCard {
  data: AtLeast<Subscribe, 'id' | 'menu' | 'shop'>
  onClick: (...args: any[]) => void
}

const SubscribeCard: FC<ISubscribeCard> = ({ data, onClick }) => {
  const { id, menu, shop, settlement_date, is_continue } = data

  return (
    <Flex
      width="100%"
      bgColor={useColorStore('background')}
      p="16px"
      borderRadius="16px"
      onClick={() => {
        onClick(id)
      }}
    >
      <VStack>
        <Text fontSize="lg">{menu.name}</Text>
        <Text fontSize="sm">{menu.cycle_month}개월 마다 결제</Text>
      </VStack>
      {/* {convertDate(data.settlement_date, 'YMDHM')}
      {convertDate(data.updated_at, 'YMDHM')} */}
    </Flex>
  )
}

const SubscribeCardWrapper: FC<ISubscribeCardWrapper> = ({ data, onClick, isLoading }) => {
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
        data.map((data) => <SubscribeCard data={data} key={data.id} onClick={onClick} />)
      )}
    </VStack>
  )
}

export { SubscribeCard, SubscribeCardWrapper }
