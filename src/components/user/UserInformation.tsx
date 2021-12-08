import useColorStore from '@/state/hooks/useColorStore'
import { useUser } from '@/state/swr/useUser'
import { Avatar } from '@chakra-ui/avatar'
import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/skeleton'
import { FC } from 'react'
import Button from '../common/button/Button'

const UserInformation: FC = () => {
  const { data: userData, error, isValidating, mutate } = useUser()

  console.log(isValidating, userData)

  return (
    <Skeleton width="full" isLoaded={!isValidating}>
      <Flex width="full" py="12px" height="92px">
        {userData ? (
          <>
            <Avatar
              size="lg"
              mr="1rem"
              name={userData.name}
              src="https://bit.ly/tioluwani-kolawole"
            />
            <VStack alignItems="start">
              <Text fontSize="2xl" fontWeight="600" color={useColorStore('textHigh')}>
                {userData.name}
              </Text>
              <Text fontSize="md" color={useColorStore('textMedium')}>
                {userData.email}
              </Text>
            </VStack>
          </>
        ) : (
          <Box width="full">
            <Button text="login" url="/user/login" />
          </Box>
        )}
      </Flex>
    </Skeleton>
  )
}

export default UserInformation
