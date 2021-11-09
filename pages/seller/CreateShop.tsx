import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Map } from 'leaflet';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Address } from 'react-daum-postcode/lib/loadPostcode';
import { useForm } from 'react-hook-form';
import HookInput from '../../components/HookInput';
import DefaultLayout from '../../layouts/DefaultLayout';
import { axiosI } from '../../state/fetcher';

const CreateShop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [map, setMap] = useState<Map>();

  const { handleSubmit, control, reset, watch, setValue, register, getValues } =
    useForm();

  const Map = React.useMemo(
    () =>
      dynamic(() => import('../../components/leaflet/mapMini'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  const handleComplete = (data: Address) => {
    axiosI
      .get<{ lat: number; lng: number }>(
        `/api/geocode?address=${encodeURIComponent(data.address)}`
      )
      .then((res) => {
        reset({ address: '' });
        setValue('lat', res.data.lat, { shouldDirty: true });
        setValue('lng', res.data.lng, { shouldDirty: true });
        setValue('address', data.address, { shouldDirty: true });
        setValue('zonecode', data.zonecode, { shouldDirty: true });
        map?.setView([res.data.lat, res.data.lng], 16);
        onClose();
      })
      .catch((err) => {
        // message.error('주소 등록 실패');
        console.error(err);
      });
  };

  console.log(watch());

  return (
    <DefaultLayout>
      <Flex direction="column">
        <Button onClick={onOpen}>주소 찾기</Button>
        <form>
          <HookInput
            control={control}
            basicP={{ label: '가게명', name: 'name' }}
          />
          <HookInput
            control={control}
            basicP={{ label: '우편번호', name: 'zonecode' }}
          />
          <HookInput
            control={control}
            basicP={{ label: '주소', name: 'address' }}
          />
          <Map setMap={setMap} />
          <HookInput
            control={control}
            basicP={{ label: '상세 주소', name: 'address2' }}
          />
          <HookInput
            control={control}
            basicP={{ label: '설명명', name: 'desc' }}
          />

          <div>업종</div>
          <div>기타 정보</div>
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
      </Flex>
    </DefaultLayout>
  );
};

export default CreateShop;
