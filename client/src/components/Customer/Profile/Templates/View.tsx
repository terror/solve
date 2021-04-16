import React, { useState } from 'react';

import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Icon,
} from '@chakra-ui/react';

import Error from '../../../Error';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { ITemplate } from '../../../../ts/interfaces';
import { api } from '../../../../ts/api';
import { useAuth } from '../../../../providers/AuthProvider';
import { BsTrashFill } from 'react-icons/bs';

interface TemplateViewProps {
  item: ITemplate;
}

const TemplateView: React.FC<TemplateViewProps> = ({ item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState<string>('');
  const { currentUser }: any = useAuth();

  const handleClick = async () => {
    const token = await currentUser.getIdToken();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await api.delete(`/templates/${item.id}`, config);
    } catch (err) {
      setError('Failed to delete template.');
    }
  };

  return (
    <>
      <Button onClick={onOpen}>View</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{item.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error ? <Error msg={error} /> : null}
            <SyntaxHighlighter lang={item.lang}>{item.body}</SyntaxHighlighter>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={handleClick}>
              <Icon as={BsTrashFill} />
            </Button>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TemplateView;
