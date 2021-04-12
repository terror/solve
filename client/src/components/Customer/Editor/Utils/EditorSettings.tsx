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
        <FormLabel>Current Theme: {editorState.theme}</FormLabel>
        <Select
          placeholder='Select Theme'
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
        <FormLabel>Current Font Size: {editorState.fontSize}</FormLabel>
        <Select
          placeholder='Select Font Size'
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
        <FormLabel>
          Current Keybindings: {editorState.keyboardHandler}
        </FormLabel>
        <Select
          placeholder='Select Keybindings'
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

const EditorSettings: React.FC<EditorSettingsProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <WrapItem>
      <Button onClick={onOpen}>
        <Icon as={SettingsIcon} />
      </Button>

      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editor Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditorSettingsForm />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='green' m={2} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </WrapItem>
  );
};

export default EditorSettings;
