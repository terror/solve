import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface LogoProps {}

const Logo: React.FC<LogoProps> = () => {
  return (
    <Box>
      <Link to='/'>
        <Text fontSize='lg' fontWeight='bold'>
          Solve
        </Text>
      </Link>
    </Box>
  );
};

export default Logo;
