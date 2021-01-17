import React from 'react';

import { Center } from '@chakra-ui/react';

import Navbar from '../../components/Navbar';
import Welcome from '../../components/Customer/Profile/Welcome';
import Templates from '../../components/Customer/Profile/Templates';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
    return (
        <>
            <Navbar />
            <Welcome />
            <Center mt={10}>
                <Templates />
            </Center>
        </>
    );
};

export default Profile;
