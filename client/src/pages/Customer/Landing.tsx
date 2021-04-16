import React from 'react';

import { Center, Heading, Stack, StackItem } from '@chakra-ui/react';

import Contests from '../../components/Customer/Landing/Contests';
import Workspaces from '../../components/Customer/Landing/Workspaces';

interface LandingProps {}

const Landing: React.FC<LandingProps> = () => {
  return (
    <Stack h={1000}>
      <StackItem alignSelf='center'>
        <Heading mb={5} as='h3' size='lg'>
          Upcoming contests
        </Heading>
      </StackItem>
      <Contests />
      <Center>
        <Workspaces />
      </Center>
    </Stack>
  );
};

export default Landing;
