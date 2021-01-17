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
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

interface EditorInformationProps {}

const EditorInformation: React.FC<EditorInformationProps> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <WrapItem>
            <Button onClick={onOpen}>
                <Icon as={InfoIcon} />
            </Button>

            <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editor Shortcuts</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb="1rem">TBA</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" m={2} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </WrapItem>
    );
};

export default EditorInformation;
