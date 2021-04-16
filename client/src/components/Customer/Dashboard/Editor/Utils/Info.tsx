import React from 'react';
import {
  useDisclosure,
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  WrapItem,
  Tooltip,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

interface EditorInformationProps {}

const EditorInformation: React.FC<EditorInformationProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <WrapItem>
      <Tooltip label='Information'>
        <Button variant='ghost' onClick={onOpen}>
          <Icon as={InfoIcon} />
        </Button>
      </Tooltip>
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editor Shortcuts</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb='1rem'>TBA</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' isFullWidth onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </WrapItem>
  );
};

export default EditorInformation;
