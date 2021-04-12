import React from 'react';

import {
  Heading,
  Text,
  Center,
  Stack,
  Button,
  StackItem,
  AspectRatio,
  Icon,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { AiOutlineLogin } from 'react-icons/ai';

import Navbar from '../../components/Navbar';
import Landing from '../../components/Customer/Landing';
import Features from './Features';

interface HomeProps {}

const styles = {
  button: {
    variant: 'outline',
    size: 'lg',
    colorScheme: 'green',
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
              <Link to='/register'>
                <Button {...styles.button}>
                  Create a free account
                  <Icon ml={2} as={AiOutlineLogin} />
                </Button>
              </Link>
            </StackItem>
            <StackItem mb={20}>
              <Center>
                <Heading as='h1' size='xl'>
                  Features
                </Heading>
              </Center>
              <Center>
                <Features />
              </Center>
            </StackItem>
            <StackItem w='45%' alignSelf='center'>
              <Center>
                <Heading mb={5} as='h1' size='xl'>
                  Quick Demo
                </Heading>
              </Center>
              <AspectRatio ratio={1}>
                <iframe
                  title='demo'
                  src='https://www.youtube.com/embed/C8pcr6RcZ6U'
                  allowFullScreen
                />
              </AspectRatio>
            </StackItem>
          </Stack>
        ) : (
          <Landing />
        )}
      </Center>
    </>
  );
};

export default Home;
