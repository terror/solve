import React from 'react';
import { Flex } from '@chakra-ui/react';

interface NavContainerProps {}

const styles = {
    flex: {
        align: 'center',
        justify: 'space-between',
        w: '100%',
        mb: 8,
        p: 8,
    },
};

const NavContainer: React.FC<NavContainerProps> = (props) => {
    return (
        <Flex {...styles.flex} as="nav" wrap="wrap">
            {props.children}
        </Flex>
    );
};

export default NavContainer;
