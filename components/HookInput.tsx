import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from '@chakra-ui/input';
import React, { FC } from 'react';
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
  InputP?: InputProps;
  ControllerP?: ControllerProps;
  password?: boolean;
};

const HookInput: FC<P> = ({
  control,
  ControllerP,
  InputP,
  basicP,
  password,
}) => {
  return (
    <Controller
      {...ControllerP}
      render={({ field }) =>
        password ? (
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              // children={<PhoneIcon color="gray.300" />}
            />
            <Input {...field} {...InputP} placeholder={basicP.label} />
          </InputGroup>
        ) : (
          <Input {...field} {...InputP} />
        )
      }
      control={control}
      name={basicP.name}
    />
  );
};

export default HookInput;
