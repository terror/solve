import React from 'react';

import {
  Text,
  Stack,
  Box,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuList,
  MenuItem,
  Icon,
  IconButton,
} from '@chakra-ui/react';

import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

interface MenuLinksProps {
  isOpen: boolean;
}

interface MenuLinkProps {
  children: any;
  to: string;
}

interface ProfileDropdownProps {}

const styles = {
  stack: {
    spacing: 8,
    align: 'center',
    justify: ['center', 'space-between', 'flex-end', 'flex-end'],
    pt: [4, 4, 0, 0],
  },
};

const MenuLink: React.FC<MenuLinkProps> = ({
  children,
  isLast,
  to = '/',
  ...rest
}: any) => {
  return (
    <Link to={to}>
      <Text display='block' fontWeight='bold' {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const ProfileDropdown: React.FC<ProfileDropdownProps> = () => {
  const { logout }: any = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Menu>
      <MenuButton as={IconButton}>
        <Icon as={CgProfile} />
      </MenuButton>
      <MenuList>
        <MenuGroup title='Account'>
          <Link to='/profile'>
            <MenuItem>Profile</MenuItem>
          </Link>
          <Link to='/settings'>
            <MenuItem>Settings</MenuItem>
          </Link>
        </MenuGroup>
        <MenuDivider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

const MenuLinks: React.FC<MenuLinksProps> = ({ isOpen }) => {
  const { currentUser }: any = useAuth();
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack {...styles.stack} direction={['column', 'row', 'row', 'row']}>
        <ColorModeSwitcher />
        <MenuLink to='/'>Home</MenuLink>
        {!currentUser ? <MenuLink to='/login'>Login</MenuLink> : null}
        {currentUser ? <MenuLink to='/dashboard'>Dashboard</MenuLink> : null}
        {currentUser ? <ProfileDropdown /> : null}
      </Stack>
    </Box>
  );
};

export default MenuLinks;
