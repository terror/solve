import React from 'react';
import { Box } from '@chakra-ui/react';
import { CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';

interface MenuToggleProps {
  toggle: VoidFunction;
  isOpen: boolean;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ toggle, isOpen }: any) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <ChevronDownIcon />}
    </Box>
  );
};

export default MenuToggle;
