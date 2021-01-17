import React, { useState } from 'react';

import { Wrap } from '@chakra-ui/react';

import EditorInformation from './Utils/EditorInformation';
import EditorSettings from './Utils/EditorSettings';
import EditorReset from './Utils/EditorReset';
import EditorRun from './Utils/EditorRun';
import EditorSend from './Utils/EditorSend';
import EditorLang from './Utils/EditorLang';
import Verdict from './Utils/Verdict';
import Ace from './Ace';
import EditorTemplates from './Utils/EditorTemplates';

interface EditorProps {}

const Editor: React.FC<EditorProps> = () => {
    const [verdict, setVerdict] = useState('');
    return (
        <div>
            <Wrap display="flex" justifyContent="flex-end" backgroundColor="#EDF2F7" borderRadius="md">
                <EditorTemplates/>
                <EditorLang />
                <EditorInformation />
                <EditorSettings />
                <EditorReset />
            </Wrap>
            <Ace />
            {verdict ? <Verdict desc={verdict}/> : null}
            <Wrap backgroundColor="#EDF2F7" borderRadius="md">
                <EditorRun setVerdict={setVerdict}/>
                <EditorSend />
            </Wrap>
        </div>
    );
};

export default Editor;
