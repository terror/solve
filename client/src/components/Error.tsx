import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';

interface ErrorProps {
  msg: string;
}

const Error: React.FC<ErrorProps> = (props) => {
  return (
    <div>
      <Alert status='error'>
        <AlertIcon />
        {props.msg}
      </Alert>
    </div>
  );
};

export default Error;
