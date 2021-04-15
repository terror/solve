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
  FormControl,
  FormLabel,
  Select,
  WrapItem,
  Tooltip,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { useEditor } from '../../../../providers/EditorProvider';

const options = {
  theme: ['monokai', 'github', 'eclipse'],
  fontSize: ['14px', '16px', '18px', '22px'],
  keyboardHandler: ['standard', 'vim', 'emacs'],
};

interface EditorSettingsProps {}

interface EditorSettingsFormProps {}

const EditorSettingsForm: React.FC<EditorSettingsFormProps> = () => {
  const { editorState, setEditorState }: any = useEditor();
  return (
    <FormControl>
      <div style={{ marginBottom: '10px' }}>
        <FormLabel>Theme</FormLabel>
        <Select
          value={editorState.theme}
          onChange={(e) =>
            setEditorState((prevState: any) => ({
              ...prevState,
              theme: e.target.value,
            }))
          }
        >
          {options['theme'].map((item: string, idx: number) => {
            return <option key={idx}>{item}</option>;
          })}
        </Select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <FormLabel>Font Size</FormLabel>
        <Select
          value={editorState.fontSize}
          onChange={(e) =>
            setEditorState((prevState: any) => ({
              ...prevState,
              fontSize: e.target.value,
            }))
          }
        >
          {options['fontSize'].map((item: string, idx: number) => {
            return <option key={idx}>{item}</option>;
          })}
        </Select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <FormLabel>Keybindings</FormLabel>
        <Select
          value={editorState.keyboardHandler}
          onChange={(e) =>
            setEditorState((prevState: any) => ({
              ...prevState,
              keyboardHandler: e.target.value,
            }))
          }
        >
          {options['keyboardHandler'].map((item: string, idx: number) => {
            return <option key={idx}>{item}</option>;
          })}
        </Select>
      </div>
    </FormControl>
  );
};

const EditorSettings: React.FC<EditorSettingsProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <WrapItem>
      <Tooltip label='Settings'>
        <Button variant='ghost' onClick={onOpen}>
          <Icon as={SettingsIcon} />
        </Button>
      </Tooltip>
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editor Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditorSettingsForm />
          </ModalBody>
          <ModalFooter>
            <Button isFullWidth colorScheme='blue' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </WrapItem>
  );
};

export default EditorSettings;
