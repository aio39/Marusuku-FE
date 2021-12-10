import convertDate from '@/helper/convertDate'
import useColorStore from '@/state/hooks/useColorStore'
import { UseHistory } from '@/types/UseHistory'
import { Center, Flex, Heading, Text, VStack } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/react'
import { FC } from 'react'

interface IUseHistoryCardWrapper {
  data?: UseHistory[]
  isLoading?: Boolean
}

interface IUseHistoryCard {
  data: UseHistory
}

const UseHistoryCard: FC<IUseHistoryCard> = ({ data }) => {
  const { id, updated_at, shop, menu } = data

  return (
    <Flex
      width="100%"
      bgColor={useColorStore('background')}
      border="solid"
      borderColor={useColorStore('primary')}
      p="16px"
      borderRadius="16px"
      boxSizing="border-box"
      onClick={() => {}}
    >
      <VStack h="5rem" width="100%" textAlign="start" alignItems="start">
        <Heading size="md">{shop.name}</Heading>
        <Text fontSize="lg">{menu.name}</Text>
        <Text fontSize="lg"> {convertDate(updated_at, 'YMDHMS')}</Text>
      </VStack>
    </Flex>
  )
}

const UseHistoryCardWrapper: FC<IUseHistoryCardWrapper> = ({ data, isLoading }) => {
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
        data.map((data) => <UseHistoryCard data={data} key={data.id} />)
      )}
    </VStack>
  )
}

export { UseHistoryCard, UseHistoryCardWrapper }
