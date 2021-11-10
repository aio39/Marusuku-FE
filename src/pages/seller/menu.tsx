import { Button } from '@chakra-ui/button';
import { Box, Divider, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  InputWrapper,
  NumberInputWrapper,
} from '../../components/common/inputs/HookInput';
import DefaultLayout from '../../components/common/layouts/DefaultLayout';
import { axiosI } from '../../state/fetcher';
import { MenuInputs } from '../../types/Menu';

export default function Home() {
  const {
    handleSubmit,
    watch,
    setValue,
    register,
    getValues,
    formState: { isSubmitting, errors, isValid },
  } = useForm<MenuInputs>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<MenuInputs> = async (inputData) => {
    const { data } = await axiosI.post('/api/shops/menus', inputData);
    console.log(data); // TODO
  };

  return (
    <DefaultLayout>
      <Box
        borderRadius="md"
        shadow="md"
        direction="column"
        maxW="container.xl"
        w="full"
        p="4"
        bg={useColorModeValue('white', 'gray.800')}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <VStack spacing="10">
            <InputWrapper
              registerReturn={register('name')}
              error={errors.name}
              data={['메뉴 이름', '상호명']}
            />
            <InputWrapper
              registerReturn={register('desc')}
              error={errors.desc}
              data={['설명', '메뉴에 대한 설명']}
            />
            <Divider />
            <NumberInputWrapper
              registerReturn={register('cycle_month')}
              error={errors.desc}
              data={['결제 주기 월', '메뉴에 대한 설명']}
            />
          </VStack>

          <Button
            type="submit"
            colorScheme="blue"
            mt={4}
            mb={12}
            disabled={!isValid}
            isLoading={isSubmitting}
          >
            가게 생성
          </Button>
        </form>
      </Box>
    </DefaultLayout>
  );
}
