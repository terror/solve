import React, { useState } from 'react';

// import { useAuth } from '../../providers/AuthProvider';

import NavContainer from './NavContainer';
import MenuToggle from './MenuToggle';
import MenuLinks from './MenuLinks';
import Logo from './Logo';

interface NavbarProps {}

const styles = {
    logo: {
        w: '100px',
        color: ['green', 'green', 'primary.500', 'primary.500'],
    },
};

const Navbar: React.FC<NavbarProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <NavContainer>
            <Logo {...styles.logo} />
            <MenuToggle toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} />
        </NavContainer>
    );
};

export default Navbar;
