import convertDate from '@/helper/convertDate'
import { axiosI } from '@/state/fetcher'
import useColorStore from '@/state/hooks/useColorStore'
import { Pagination } from '@/types/common'
import { Review } from '@/types/Review'
import { Center, Heading, HStack, Text, VStack } from '@chakra-ui/layout'
import { Button, Skeleton, Textarea, useDisclosure } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC, useRef, useState } from 'react'
import { useSWRConfig } from 'swr'
import ModalWrapper from '../common/ModalWrapper'
import Rating from '../common/StarRating'
import StarRatingDisplay from '../common/StarRatingDisplay'

type IReview = {
  data: Review
}

type IReviewWrapper = {
  reviews?: Review[]
  isValidating: boolean
  type: string
}

// const CustomControlsExample: FC = () => {
//   /* Here's a custom control */
//   function EditableControls() {
//     const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } =
//       useEditableControls()

//     return isEditing ? (
//       <ButtonGroup justifyContent="center" size="sm">
//         <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
//         <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
//       </ButtonGroup>
//     ) : (
//       <Flex justifyContent="center">
//         <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
//       </Flex>
//     )
//   }

//   return (
//     <Editable
//       textAlign="center"
//       defaultValue="Rasengan ⚡️"
//       fontSize="2xl"
//       isPreviewFocusable={false}
//     >
//       <EditablePreview />
//       <EditableInput />
//       <EditableControls />
//     </Editable>
//   )
// }

const EditableReview: FC<IReview> = ({ data }) => {
  const { content, created_at, score, user, id, menu, shop, shop_id, menu_id } = data
  const { mutate } = useSWRConfig()
  const ratingRef = useRef<HTMLInputElement>()
  const [editedContent, setEditedContent] = useState(content)
  const useDisclosureReturn = useDisclosure()

  const onConfirmHandler = async () => {
    mutate<Pagination<Review>>(
      `/api/reviews?filter=user_id%3A${user.id}&with=user%2Cmenu%2Cshop&`,
      async (data) => {
        const { data: review } = await axiosI.put<Review>('api/reviews/' + id, {
          score: ratingRef.current?.value,
          content: editedContent,
        })
        useDisclosureReturn.onClose()

        if (!data) return data

        const filtered = data.data.filter((review) => review.id !== id)
        data.data = [review, ...filtered]
        return data
      },
      false
    )
  }

  const deleteHandler = async () => {
    await axiosI.delete('api/reviews/' + id)
    mutate<Pagination<Review>>(
      `/api/reviews?filter=user_id%3A${user.id}&with=user%2Cmenu%2Cshop&`,
      async (data) => {
        if (!data) return data
        const filtered = data.data.filter((review) => review.id !== id)
        data.data = [...filtered]
        return data
      },
      false
    )
  }

  return (
    <VStack width="100%" alignItems="start" position="relative">
      <NextLink href={`/shops/${shop_id}`}>
        <Heading cursor="pointer" size="md">
          {shop.name}
        </Heading>
      </NextLink>
      <NextLink href={`/shops/${shop_id}/menus/${menu_id}`}>
        <Heading cursor="pointer" size="sm">
          {menu.name}
        </Heading>
      </NextLink>
      <StarRatingDisplay score={score} />
      <Text>{content}</Text>
      <HStack position="absolute" right="0" top="0">
        <Button onClick={() => useDisclosureReturn.onOpen()}>Edit</Button>
        <Button onClick={deleteHandler}>삭제</Button>
      </HStack>

      <Text>{convertDate(created_at, 'YMDHM')}</Text>
      <ModalWrapper
        viewBtn={false}
        useDisclosureReturn={useDisclosureReturn}
        text={{ title: '리뷰 수정', close: '취소', confirm: '확인' }}
        onConfirm={onConfirmHandler}
      >
        <>
          <Rating init={score} ref={ratingRef} />
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            size="sm"
          />
        </>
      </ModalWrapper>
    </VStack>
  )
}

const ReviewView: FC<IReview> = ({ data }) => {
  const { content, created_at, score, user } = data
  return (
    <VStack width="100%" alignItems="start">
      <StarRatingDisplay score={score} />
      <Text>{content}</Text>

      <Text> - {user.name}</Text>
      <Text>{convertDate(created_at)}</Text>
    </VStack>
  )
}

const ReviewWrapper: FC<IReviewWrapper> = ({ reviews, isValidating, type }) => {
  if ((!reviews && !isValidating) || reviews?.length == 0)
    return (
      <Center height="100px" fontSize="xl">
        작성한 리뷰가 없습니다.
      </Center>
    )

  if (!reviews) return <Skeleton width="full" height="50vh"></Skeleton>

  const getComponent = (data: Review) => {
    switch (type) {
      case 'edit':
        return <EditableReview data={data} />
      default:
        return <ReviewView data={data} />
    }
  }

  return (
    <VStack
      width="100%"
      alignItems="start"
      p="8px"
      spacing="2rem"
      backgroundColor={useColorStore('surface')}
    >
      {reviews.map((data) => getComponent(data))}
    </VStack>
  )
}

export default ReviewWrapper
