import React from 'react';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

interface VerdictProps {
    desc: string;
}

const Verdict: React.FC<VerdictProps> = ({ desc }) => {
    return (
        <div>
            {desc !== 'Passed all sample test cases.' ? (
                <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>{desc}</AlertDescription>
                </Alert>
            ) : (
                <Alert status="success">
                    <AlertIcon />
                    <AlertDescription>{desc}</AlertDescription>
                </Alert>
            )}
        </div>
    );
};

export default Verdict;
