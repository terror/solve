import React from 'react';

import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';

import { FormikProps } from '../../ts/interfaces';

const TextField: React.FC<FormikProps> = (props) => {
  return (
    <div style={{ marginBottom: '5px' }}>
      <FormControl isInvalid={props.errors && props.touched}>
        <FormLabel htmlFor={props.name}>{props.name}</FormLabel>
        <Input
          {...props.field}
          id={props.name}
          placeholder={props.name}
          type={props.name}
        />
        <FormErrorMessage>{props.errors}</FormErrorMessage>
      </FormControl>
    </div>
  );
};

export default TextField;
