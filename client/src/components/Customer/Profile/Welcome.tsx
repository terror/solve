import React from 'react';

import { useAuth } from '../../../providers/AuthProvider';
import { Heading, Center, Image, Stack, StackItem } from '@chakra-ui/react';

interface WelcomeProps {}

const Welcome: React.FC<WelcomeProps> = () => {
    const { currentUser }: any = useAuth();
    return (
        <Center>
            <Stack>
                <StackItem alignSelf="center" mb={2}>
                    <Heading as="h2" size="md">
                        {currentUser.displayName || currentUser.email}
                    </Heading>
                </StackItem>
                <StackItem alignSelf="center">
                    <Image
                        borderRadius="full"
                        boxSize="150px"
                        src={
                            currentUser.photoURL ||
                            'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?b=1&k=6&m=1214428300&s=612x612&w=0&h=kMXMpWVL6mkLu0TN-9MJcEUx1oSWgUq8-Ny6Wszv_ms='
                        }
                        alt="User Image"
                    />
                </StackItem>
            </Stack>
        </Center>
    );
};

export default Welcome;
