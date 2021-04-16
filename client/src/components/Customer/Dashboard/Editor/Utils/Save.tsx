import React, { useState } from 'react';
import { api } from '../../../../../ts/api';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Tooltip,
  WrapItem,
  useDisclosure,
} from '@chakra-ui/react';

import { IProblem, IEditorSettings } from '../../../../../ts/interfaces';
import { useAuth } from '../../../../../providers/AuthProvider';
import {
  SUCCESS,
  INTERNAL_ERROR,
  NOT_FOUND,
} from '../../../../../ts/constants';
import { AiFillSave } from 'react-icons/ai';

interface WorkspaceSaveProps {}

interface Result {
  status: string;
  msg: string;
}

const ResultModal = (props) => {
  const { onClose } = useDisclosure();
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnEsc>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>{props.body}</ModalBody>
          <ModalFooter>
            <Button
              colorScheme='blue'
              isFullWidth
              onClick={() => setIsOpen((isOpen) => !isOpen)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const EditorSave: React.FC<WorkspaceSaveProps> = () => {
  const { currentUser }: any = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result>({
    msg: '',
    status: '',
  });

  const handleClick = async () => {
    setResult({ msg: '', status: '' });
    setLoading(true);

    const problem: IProblem = JSON.parse(localStorage.getItem('problem')!);
    const editor: IEditorSettings = JSON.parse(
      localStorage.getItem('editor-state')!
    );

    if (problem.id) {
      const token = await currentUser.getIdToken();
      const postBody = {
        editor: editor,
        problem: problem,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        await api.post('/workspaces/', postBody, config);
        setResult({
          msg: 'Successfully saved workspace!',
          status: SUCCESS,
        });
      } catch (err) {
        setResult({
          msg: 'Internal server error.',
          status: INTERNAL_ERROR,
        });
      }
    } else {
      setResult({ msg: 'Problem must be set.', status: NOT_FOUND });
    }

    setLoading(false);
  };

  return (
    <WrapItem>
      {result.msg ? (
        <ResultModal
          body={
            <Alert
              status={result.status !== SUCCESS ? 'error' : 'success'}
              variant='subtle'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
              height='200px'
              borderRadius='lg'
              mt={2}
            >
              <AlertIcon boxSize='40px' mr={0} />
              <AlertTitle mt={4} mb={1} fontSize='lg'>
                {result.msg}
              </AlertTitle>
            </Alert>
          }
        />
      ) : null}
      <Tooltip label='Save'>
        <Button isLoading={loading} variant='ghost' onClick={handleClick}>
          <Icon as={AiFillSave} />
        </Button>
      </Tooltip>
    </WrapItem>
  );
};

export default EditorSave;
