import React, { useEffect, useState } from 'react';

import {
  WrapItem,
  Button,
  Tooltip,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Container,
  Wrap,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Link,
} from '@chakra-ui/react';

import { ITemplate, IEditorSettings } from '../../../../../ts/interfaces';
import { api } from '../../../../../ts/api';
import { useAuth } from '../../../../../providers/AuthProvider';
import { useEditor } from '../../../../../providers/EditorProvider';
import { languageOptions } from '../../../../../ts/languages';
import { HiCode } from 'react-icons/hi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import SyntaxHighlighter from 'react-syntax-highlighter';

interface EditorTemplatesProps {}

const EditorTemplates: React.FC<EditorTemplatesProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser }: any = useAuth();
  const { setEditorState }: any = useEditor();
  const [templates, setTemplates] = useState<ITemplate[]>([]);

  useEffect(() => {
    api.get(`/templates/${currentUser.uid}`).then((res) => {
      setTemplates(res.data);
    });
  }, [currentUser.uid]);

  return (
    <WrapItem>
      <Tooltip label='Templates'>
        <Button variant='ghost' onClick={onOpen}>
          <Icon as={HiCode} />
        </Button>
      </Tooltip>
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Templates</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {templates.map((item: ITemplate, idx: number) => {
              return (
                <Container key={idx} mb={5}>
                  <Wrap align='center'>
                    <WrapItem>
                      <Popover isLazy>
                        <PopoverTrigger>
                          <Link>{item.name}</Link>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>{item.name}</PopoverHeader>
                          <PopoverBody>
                            <SyntaxHighlighter language={item.lang}>
                              {item.body}
                            </SyntaxHighlighter>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </WrapItem>
                    <WrapItem>
                      <Button
                        variant='ghost'
                        onClick={() => {
                          setEditorState((prevState: IEditorSettings) => ({
                            ...prevState,
                            value: item.body,
                            mode: languageOptions[item.lang],
                          }));
                        }}
                      >
                        <Icon as={AiOutlineCloudUpload} />
                      </Button>
                    </WrapItem>
                  </Wrap>
                </Container>
              );
            })}
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

export default EditorTemplates;
