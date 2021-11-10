import { Input } from '@chakra-ui/input';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import React, { FC } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type placeholder = string;
type label = string | undefined;

type necessary = [label, placeholder];

type P = {
  registerReturn: UseFormRegisterReturn;
  error: FieldError | undefined;
  data: necessary;
  isNotRequired?: boolean;
};

const InputWrapper: FC<P> = ({
  registerReturn,
  error,
  data: [label, placeholder],
  isNotRequired = false,
}) => {
  const name = registerReturn.name;
  return (
    <FormControl
      id={name}
      isRequired={!isNotRequired}
      isInvalid={error ? true : false}
      position="relative"
    >
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input placeholder={placeholder} {...registerReturn} />
      <FormErrorMessage position="absolute">
        {error && error.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default InputWrapper;
