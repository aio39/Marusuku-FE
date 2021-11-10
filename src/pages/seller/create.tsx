import { Button } from '@chakra-ui/button';
import {
  Box,
  Divider,
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
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  InputWrapper,
  SelectWrapper,
} from '../../components/common/inputs/HookInput';
import DefaultLayout from '../../components/common/layouts/DefaultLayout';
import { axiosI } from '../../state/fetcher';

interface FormInputs {
  name: string;
  zonecode: string;
  address: string;
  address2: string;
  category: string;
  desc: string;
  phone: number;
  homepage: string;
  lat: number;
  lng: number;
}

const categoryArray = ['식당', '카페', '마트'];

const CreateShop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [map, setMap] = useState<Map>();
  const toast = useToast();

  const {
    handleSubmit,
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
        setValue('lat', res.data.lat, { shouldDirty: true });
        setValue('lng', res.data.lng, { shouldDirty: true });
        map?.setView([res.data.lat, res.data.lng], 16);
      })
      .catch((err) => {
        // Todo 기능 추가
        toast({ description: 1000, title: '주소 등록 실패' });
        console.error(err);
      });
  };

  const onSubmit: SubmitHandler<FormInputs> = async (inputData) => {
    const { data } = await axiosI.post('/api/shops', inputData);
    console.log(data); // TODO
  };

  useEffect(() => {
    register('lat', { required: '' });
    register('lng', { required: '' });
    return () => {};
  }, [register]);

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
              data={['가게 이름', '상호명']}
            />
            <InputWrapper
              registerReturn={register('desc')}
              error={errors.desc}
              data={['설명', '가게에 대한 설명']}
            />

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
