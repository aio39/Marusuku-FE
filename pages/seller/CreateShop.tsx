import { Button } from '@chakra-ui/button';
import {
  Box,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Map } from 'leaflet';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Address } from 'react-daum-postcode/lib/loadPostcode';
import { useForm } from 'react-hook-form';
import { InputWrapper, SelectWrapper } from '../../components/HookInput';
import DefaultLayout from '../../layouts/DefaultLayout';
import { axiosI } from '../../state/fetcher';

interface FormInputs {
  name: string;
  zonecode: string;
  address: string;
  address2: string;
  category: string;
  desc: string;
  phone: number;
  lat: number;
  lng: number;
}

const categoryArray = ['식당', '카페', '마트'];

// const checkArray = [
//   'チェックボックス1',
//   'チェックボックス2',
//   'チェックボックス3',
// ];

const CreateShop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [map, setMap] = useState<Map>();
  const toast = useToast();

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    register,
    getValues,
    formState: { isSubmitting, errors, isValid },
  } = useForm<FormInputs>({
    mode: 'all',
  });

  const Map = React.useMemo(
    () =>
      dynamic(() => import('../../components/leaflet/mapMini'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  const handleComplete = (data: Address) => {
    setValue('address', data.address, { shouldDirty: true });
    setValue('zonecode', data.zonecode, { shouldDirty: true });
    onClose();
    axiosI
      .get<{ lat: number; lng: number }>(
        `/api/geocode?address=${encodeURIComponent(data.address)}`
      )
      .then((res) => {
        reset({ address: '' });
        setValue('lat', res.data.lat, { shouldDirty: true });
        setValue('lng', res.data.lng, { shouldDirty: true });
        map?.setView([res.data.lat, res.data.lng], 16);
      })
      .catch((err) => {
        // message.error('주소 등록 실패');
        // Todo 기능 추가
        toast({ description: 1000, title: '주소 등록 실패' });
        console.error(err);
      });
  };

  const onSubmit = () => {
    return null;
  };

  useEffect(() => {
    register('lat', { required: '' });
    register('lng', { required: '' });
    return () => {};
  }, [register]);

  console.info(watch());
  console.log(errors);
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
            <FormControl
              id="name"
              isRequired
              isInvalid={errors.name ? true : false}
              position="relative"
            >
              <FormLabel htmlFor="name">가게 이름</FormLabel>
              <Input
                placeholder="가게 이름"
                {...register('name', {
                  required: '입력이 필요합니다.',
                  maxLength: { message: '20자 이하로 입력하세요', value: 20 },
                })}
              />
              <FormErrorMessage position="absolute">
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              id="desc"
              isRequired
              isInvalid={errors.desc ? true : false}
              position="relative"
            >
              <FormLabel htmlFor="desc">설명</FormLabel>
              <Input
                placeholder="설명"
                {...register('desc', { required: '입력이 필요합니다.' })}
              />
              <FormErrorMessage position="absolute">
                {errors.desc && errors.desc.message}
              </FormErrorMessage>
            </FormControl>
            <Divider />
            <Box w="100%">
              <Map setMap={setMap} />
              <Button onClick={onOpen}>주소 찾기</Button>
            </Box>
            <InputWrapper
              registerReturn={register('address')}
              error={errors.address}
              data={['주소', '기본 주소']}
            />
            <InputWrapper
              registerReturn={register('address2')}
              error={errors.address2}
              data={['주소2', '주소2']}
              isNotRequired
            />
            <InputWrapper
              registerReturn={register('zonecode')}
              error={errors.zonecode}
              data={['우편 번호', 'zipcode']}
            />
            <Divider />
            <InputWrapper
              registerReturn={register('phone', {
                required: '전화번호는 필수입니다.',
                minLength: {
                  value: 10,
                  message: '10자 이상입니다.',
                },
                maxLength: {
                  value: 11,
                  message: '11자 이하입니다.',
                },
              })}
              error={errors.phone}
              data={['전화번호', ' - 없이 입력']}
              inputP={{ maxLength: 11 }}
            />
            <SelectWrapper
              registerReturn={register('category', {
                required: '필수 선택입니다.',
              })}
              error={errors.category}
              data={['업종', undefined]}
              selectList={categoryArray}
            />
            <div>기타 정보</div>
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

        <Modal isOpen={isOpen} onClose={onClose}>
          {/* 주소 찾기 완료 후 언마운팅 */}

          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {isOpen && (
                <DaumPostcode
                  onComplete={handleComplete}
                  defaultQuery={getValues('address')}
                  autoClose={false}
                  style={{ width: '100%', height: 400 }}
                />
              )}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </DefaultLayout>
  );
};

export default CreateShop;
