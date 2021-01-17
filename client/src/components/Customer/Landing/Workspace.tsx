import React, { useState } from 'react';
import {
    Box,
    Button,
    Stack,
    StackItem,
    Center,
    Wrap,
    WrapItem,
    Icon,
    Text,
    Link,
} from '@chakra-ui/react';

import { BsFillTrashFill } from 'react-icons/bs';
import { GrPlayFill } from 'react-icons/gr';
import { AiOutlineLink } from 'react-icons/ai';

import { WorkspaceState } from '../../../ts/interfaces';
import { api } from '../../../ts/api';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider';

import Error from '../../Error';

interface WorkspaceProps {
    item: WorkspaceState;
    items: WorkspaceState[];
    setData: Function;
}

const Workspace: React.FC<WorkspaceProps> = ({ item, items, setData }) => {
    const history = useHistory();
    const { currentUser }: any = useAuth();
    const [error, setError] = useState('');

    const handleContinue = () => {
        localStorage.setItem('problem', JSON.stringify(item.problem));
        localStorage.setItem('editor-state', JSON.stringify(item.editor));
        history.push('/dashboard');
    };

    const handleDelete = async (id: string) => {
        const token = await currentUser.getIdToken();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            await api.delete(`/workspaces/${id}`, config);
            items = items.filter((item: WorkspaceState) => item.id !== id);
            setData(items);
        } catch (err) {
            setError('Error removing workspace.');
        }
    };

    return (
        <StackItem alignSelf="center" w="100%" _hover={{ shadow: '2xl' }}>
            {error ? <Error msg={error} /> : null}
            <Box shadow="md" borderRadius="md">
                <Center>
                    <Stack mb={5} mt={5}>
                        <StackItem alignSelf="center" mb={5}>
                            <Text fontWeight="bold">{item.problem.title}</Text>
                        </StackItem>

                        <StackItem alignSelf="center">
                            Platform: {item.problem.platform}
                        </StackItem>

                        <StackItem alignSelf="center">
                            Time Limit: {item.problem.timeLimit}
                        </StackItem>

                        <StackItem alignSelf="center">
                            Memory Limit: {item.problem.memoryLimit}
                        </StackItem>

                        <StackItem alignSelf="center" mb={5}>
                            Link:{' '}
                            <Link href={item.problem.url} target="_blank">
                                <Icon as={AiOutlineLink} />
                            </Link>
                        </StackItem>

                        <StackItem alignSelf="center">
                            <Wrap>
                                <WrapItem>
                                    <Button onClick={handleContinue}>
                                        <Icon as={GrPlayFill} />
                                    </Button>
                                </WrapItem>
                                <WrapItem>
                                    <Button
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <Icon as={BsFillTrashFill} />
                                    </Button>
                                </WrapItem>
                            </Wrap>
                        </StackItem>
                    </Stack>
                </Center>
            </Box>
        </StackItem>
    );
};

export default Workspace;
