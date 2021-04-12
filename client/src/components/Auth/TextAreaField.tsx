import React from 'react';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react';

import { FormikProps } from '../../ts/interfaces';

const TextAreaField: React.FC<FormikProps> = (props) => {
  return (
    <div style={{ marginBottom: '5px' }}>
      <FormControl isInvalid={props.errors && props.touched}>
        <FormLabel htmlFor={props.name}>{props.name}</FormLabel>
        <Textarea
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

export default TextAreaField;
