import React from 'react';
import { Button, Center, Text } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../providers/AuthProvider';

const GoogleButton = () => {
  const { loginWithGoogle }: any = useAuth();

  const handleClick = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Center>
      <Button
        w={'full'}
        maxW={'md'}
        variant={'outline'}
        leftIcon={<FcGoogle />}
        onClick={handleClick}
      >
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Center>
  );
};

export default GoogleButton;
