import React, { useState } from 'react';
import MenuToggle from './MenuToggle';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return <MenuToggle toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />;
};

export default Header;
