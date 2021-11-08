import { Form, FormItemProps, Input, InputProps } from 'antd';
import { FC } from 'react';
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
} from 'react-hook-form';

type P = {
  control: Control<FieldValues, object>;
  basicP: {
    label: string;
    name: string;
  };
  ItemP?: FormItemProps;
  InputP?: InputProps;
  ControllerP?: ControllerProps;
  password?: boolean;
};

const span24 = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const HookInput: FC<P> = ({
  control,
  ControllerP,
  InputP,
  ItemP,
  basicP,
  password,
}) => {
  return (
    <Form.Item {...ItemP} {...span24} label={basicP.label}>
      <Controller
        {...ControllerP}
        render={({ field }) =>
          password ? (
            <Input.Password {...field} {...InputP} />
          ) : (
            <Input {...field} {...InputP} />
          )
        }
        control={control}
        name={basicP.name}
      />
    </Form.Item>
  );
};

export default HookInput;
