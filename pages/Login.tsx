import styled from '@emotion/styled';
import { Button, Col, Form, Row } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MdSubscriptions } from 'react-icons/md';
import HookInput from '../components/HookInput';
import { useLogin, useUser } from '../state/swr/useUser';

const Wrapper = styled(Row)`
  background-color: #39c5bb44;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .ant-form {
  }
  .login-form {
    background-color: white;
    max-width: 640px;
    padding: 3rem 3rem;
    border-radius: 1rem;
  }
`;

const LoginPage = () => {
  const { handleSubmit, control, reset, watch, setValue, register, getValues } =
    useForm();
  const { data: userData, error: userError } = useUser();
  const router = useRouter();

  const onFinish = async (data: any) => {
    const result = await useLogin(data);
    if (result) {
      router.push('/');
    }
  };

  if (userData && !userError) {
    router.push('/');
  }

  console.info(watch());
  return (
    <Wrapper>
      <Col sm={20} className="login-form">
        <MdSubscriptions />
        <Form>
          <HookInput
            control={control}
            basicP={{ label: '이메일', name: 'email' }}
          />
          <HookInput
            control={control}
            basicP={{ label: '비밀번호', name: 'password' }}
            password
          />
          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleSubmit(onFinish)}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Wrapper>
  );
};

// LoginPage.getLayout = function getLayout(page: ReactElement) {
//   return <DefaultLayout>{page}</DefaultLayout>;
// };

export default LoginPage;
