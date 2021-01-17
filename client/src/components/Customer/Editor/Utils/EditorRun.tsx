import React, { useState } from 'react';

import { Button, Icon, Text, Progress, WrapItem } from '@chakra-ui/react';
import { VscRunAll } from 'react-icons/vsc';

import {
    IEditorSettings,
    IProblem,
    Submission,
    Test,
} from '../../../../ts/interfaces';
import { judge } from '../../../../ts/api';
import { languages } from '../../../../ts/languages';

interface EditorRunProps {
    setVerdict: Function;
}

const EditorRun: React.FC<EditorRunProps> = ({ setVerdict }) => {
    const [loading, setLoading] = useState(false);

    const sleep = (ms: number): Promise<void> => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    // Return verdict(s) of batch submission
    const run = async (tokens: string) => {
        while (true) {
            const { data } = await judge.get(
                `/submissions/batch?tokens=${tokens}&base64_encoded=true`
            );
            // Wait for all to finish processing
            if (data.submissions[data.submissions.length - 1].status.id > 2)
                return data;
            await sleep(2000);
        }
    };

    // Build submissions array for batch submission request
    const buildSubmissions = async (
        problemData: IProblem,
        editor: IEditorSettings
    ) => {
        let submissions: Submission[] = [];

        problemData.statement.tests.forEach((item: Test) => {
            const { input, output }: { input: string; output: string } = item;
            submissions.push({
                language_id: languages[editor.mode],
                source_code: editor.value,
                stdin: input,
                expected_output: output,
            });
        });

        return await postSubmissions(submissions);
    };

    // Post a batch submission request
    const postSubmissions = async (submissions: Submission[]) => {
        try {
            const submission = await judge.post('/submissions/batch', {
                submissions: submissions,
            });
            return submission.data;
        } catch (err) {
            throw new Error(err);
        }
    };

    const getVerdict = (data: any): string => {
        for (let i = 0; i < data.submissions.length; ++i) {
            if (data.submissions[i].status.id !== 3)
                return data.submissions[i].status.description;
        }
        return 'Passed all sample test cases.';
    };

    const handleClick = async () => {
        let problemData: IProblem = JSON.parse(
            localStorage.getItem('problem')!
        );
        let editor: IEditorSettings = JSON.parse(
            localStorage.getItem('editor-state')!
        );

        if (!problemData.id || !editor.value) {
            setVerdict('Problem data and source code must be set.');
            return;
        }

        setLoading(true);
        try {
            const tokens = await buildSubmissions(problemData, editor);

            let queryString = '';
            tokens.forEach(async (token: object) => {
                queryString += Object.values(token)[0] + ',';
            });

            const data = await run(
                queryString.substring(0, queryString.length - 1)
            );

            setVerdict(getVerdict(data));
        } catch (err) {
            setVerdict('Error compiling code.');
        }
        setLoading(false);
    };

    return (
        <WrapItem>
            {loading ? <Progress size="xs" isIndeterminate /> : null}
            <Button onClick={handleClick} isLoading={loading}>
                <Icon as={VscRunAll}></Icon>
                <Text fontSize="sm" ml={3}>
                    Run code
                </Text>
            </Button>
        </WrapItem>
    );
};

export default EditorRun;
