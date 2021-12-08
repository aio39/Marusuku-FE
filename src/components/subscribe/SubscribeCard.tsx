import useColorStore from '@/state/hooks/useColorStore'
import { Subscribe } from '@/types/Subscribe'
import { Flex, Text, VStack } from '@chakra-ui/layout'
import { FC } from 'react'

interface ISubscribeCardWrapper {
  data: AtLeast<Subscribe, 'id' | 'menu' | 'shop'>[]
  onClick: (...args: any[]) => void
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

const SubscribeCardWrapper: FC<ISubscribeCardWrapper> = ({ data, onClick }) => {
  return (
    <VStack width="100%" spacing="16px">
      {data.map((data) => (
        <SubscribeCard data={data} key={data.id} onClick={onClick} />
      ))}
    </VStack>
  )
}

export { SubscribeCard, SubscribeCardWrapper }
