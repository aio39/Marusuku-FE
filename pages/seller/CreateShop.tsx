import { Button, Col, Divider, Form, message, Modal, Row } from 'antd';
import { Map } from 'leaflet';
import dynamic from 'next/dynamic';
import React, { ReactElement, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Address } from 'react-daum-postcode/lib/loadPostcode';
import { useForm } from 'react-hook-form';
import HookInput from '../../components/HookInput';
import DefaultLayout from '../../layouts/DefaultLayout';
import { axiosI } from '../../state/fetcher';

const CreateShop = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
        setIsModalVisible(false);
      })
      .catch((err) => {
        message.error('주소 등록 실패');
        console.error(err);
      });
  };

  console.log(watch());

  return (
    <div>
      <Row align="top" justify="center">
        <Col
          span={18}
          style={{ backgroundColor: 'white', padding: '1rem 3rem' }}
        >
          <Row align="top" justify="space-around">
            <Col span={24}>
              <Button
                type="primary"
                onClick={() => {
                  setIsModalVisible(true);
                }}
              >
                주소 찾기
              </Button>
            </Col>
            <Col span={24}>
              <Form>
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
                <Divider orientation="left">Percentage columns</Divider>

                <div>업종</div>
                <div>기타 정보</div>
              </Form>
            </Col>

            <Modal
              title="주소 검색"
              visible={isModalVisible}
              onOk={() => {
                setIsModalVisible(true);
              }}
              onCancel={() => {
                setIsModalVisible(false);
              }}
            >
              {/* 주소 찾기 완료 후 언마운팅 */}
              {isModalVisible && (
                <DaumPostcode
                  onComplete={handleComplete}
                  defaultQuery={getValues('address')}
                  autoClose={false}
                  style={{ width: '100%', height: 400 }}
                />
              )}
            </Modal>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

CreateShop.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default CreateShop;
