import React, { useState } from 'react';

import { Icon, Button, Text, WrapItem } from '@chakra-ui/react';
import { RiMailSendFill } from 'react-icons/ri';

import { IProblem, IEditorSettings } from '../../../../ts/interfaces';

import Error from '../../../../components/Error';

interface EditorSendProps {}

// Open problem submitUrl with code copied to clipboard
export const EditorSend: React.FC<EditorSendProps> = () => {
    const [error, setError] = useState('');

    const handleClick = () => {
        setError('');

        let problem: IProblem = JSON.parse(localStorage.getItem('problem')!);
        let editor: IEditorSettings = JSON.parse(
            localStorage.getItem('editor-state')!
        );

        if (problem.id && editor.value) {
            navigator.clipboard.writeText(editor.value);
            window.open(problem.submitUrl);
        } else {
            setError('Problem and editor must be set.');
        }
    };

    return (
        <WrapItem>
            {error ? <Error msg={error} /> : null}
            <Button onClick={handleClick}>
                <Icon as={RiMailSendFill} />
                <Text fontSize="sm" ml={3}>
                    Submit
                </Text>
            </Button>
        </WrapItem>
    );
};

export default EditorSend;
