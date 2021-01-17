import React from 'react';

import { RepeatClockIcon } from '@chakra-ui/icons';
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

import { useEditor } from '../../../../providers/EditorProvider';
import { IEditorSettings } from '../../../../ts/interfaces';

interface EditorResetProps {}

const EditorReset: React.FC<EditorResetProps> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { setEditorState }: any = useEditor();

    const handleClick = () => {
        setEditorState((prevState: IEditorSettings) => ({
            ...prevState,
            value: '',
        }));
    };

    return (
        <WrapItem>
            <Button onClick={onOpen}>
                <Icon as={RepeatClockIcon} />
            </Button>

            <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Reset</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb="1rem">
                            Are you sure you want to reset to default code?
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleClick} colorScheme="red" mr={3}>
                            Reset
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </WrapItem>
    );
};

export default EditorReset;
