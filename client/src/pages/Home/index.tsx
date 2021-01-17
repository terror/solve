import React from 'react';

import {
    Heading,
    Text,
    Center,
    Stack,
    Button,
    StackItem,
    AspectRatio,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

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
                    <Stack mt="10px">
                        <StackItem alignSelf="center" mb={20}>
                            <Heading as="h1" size="3xl" mb={2}>
                                Solve
                            </Heading>
                            <Text>
                                The fully featured competitive programming
                                workspace in the cloud.
                            </Text>
                            <Link to="/register">
                                <Button {...styles.button}>
                                    Create a free account
                                </Button>
                            </Link>
                        </StackItem>
                        <StackItem mb={20}>
                            <Center>
                                <Heading as="h1" size="2xl">
                                    Features
                                </Heading>
                            </Center>
                            <Center>
                                <Features />
                            </Center>
                        </StackItem>
                        <StackItem w="45%" alignSelf="center">
                            <Center>
                                <Heading mb={5} as="h1" size="2xl">
                                    Quick Demo
                                </Heading>
                            </Center>
                            <AspectRatio ratio={1}>
                                <iframe
                                    title="demo"
                                    src="https://www.youtube.com/embed/C8pcr6RcZ6U"
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
