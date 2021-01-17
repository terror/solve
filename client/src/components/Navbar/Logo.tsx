import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface LogoProps {
    w: string;
    color: string[];
}

const Logo: React.FC<LogoProps> = (props) => {
    return (
        <Box {...props}>
            <Link to="/">
                <Text fontSize="lg" fontWeight="bold">
                    Solve
                </Text>
            </Link>
        </Box>
    );
};

export default Logo;
