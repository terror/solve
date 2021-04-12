import React from 'react';

import {
  Heading,
  Text,
  Center,
  Stack,
  Button,
  StackItem,
  Icon,
  Divider,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { AiOutlineLogin } from 'react-icons/ai';

import Navbar from '../../components/Navbar';
import Landing from '../../components/Customer/Landing';
import Features from './Features';
import Wave from 'react-wavify';

interface HomeProps {}

const styles = {
  button: {
    variant: 'outline',
    size: 'lg',
    colorScheme: 'blue',
    mt: '10px',
  },
};

const Home: React.FC<HomeProps> = () => {
  const { currentUser }: any = useAuth();
  return (
    <>
      <Navbar />
      <Center>
        {!currentUser ? (
          <Stack mt='10px' textAlign='center'>
            <StackItem alignSelf='center' mb={20} w='50%'>
              <Heading as='h1' size='xl' mb={3}>
                The Competitive Programming Workspace.
              </Heading>
              <Text mb={3}>
                Solve let's you quickly spin up a programming workspace so you
                can focus on solving that problem and winning that contest.
              </Text>
              <Center>
                <Link to='/register'>
                  <Button {...styles.button}>
                    Create a free account
                    <Icon ml={2} as={AiOutlineLogin} />
                  </Button>
                </Link>
              </Center>
            </StackItem>
            <Divider w='80%' alignSelf='center' mb={10} />
            <StackItem mb={20}>
              <Center>
                <Features />
              </Center>
            </StackItem>
            <Wave
              fill='#2b6cb0'
              paused={false}
              options={{
                height: 1,
                amplitude: 20,
                speed: 0.3,
                points: 5,
              }}
              style={{ position: 'fixed', bottom: -100 }}
            />
          </Stack>
        ) : (
          <Landing />
        )}
      </Center>
    </>
  );
};

export default Home;
