import React, { useState } from 'react';
import { api } from '../../../ts/api';

import {
    Button,
    Center,
    Alert,
    Stack,
    StackItem,
    AlertIcon,
} from '@chakra-ui/react';

import { IProblem, IEditorSettings } from '../../../ts/interfaces';
import { useAuth } from '../../../providers/AuthProvider';
import { SUCCESS, INTERNAL_ERROR, NOT_FOUND } from '../../../ts/constants';

interface WorkspaceSaveProps {}

interface Result {
    status: string;
    msg: string;
}

const WorkspaceSave: React.FC<WorkspaceSaveProps> = () => {
    const [result, setResult] = useState<Result>({
        msg: '',
        status: '',
    });
    const { currentUser }: any = useAuth();

    const handleClick = async () => {
        setResult({ msg: '', status: '' });

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
    };

    return (
        <Center mt={5} mb={5}>
            <Stack>
                <StackItem alignSelf="center">
                    {result.msg ? (
                        result.status !== SUCCESS ? (
                            <Alert status="error">
                                <AlertIcon />
                                {result.msg}
                            </Alert>
                        ) : (
                            <Alert status="success">
                                <AlertIcon />
                                {result.msg}
                            </Alert>
                        )
                    ) : null}
                </StackItem>
                <StackItem mb={5} alignSelf="center">
                    <Button onClick={handleClick}>Save Workspace</Button>
                </StackItem>
            </Stack>
        </Center>
    );
};

export default WorkspaceSave;
