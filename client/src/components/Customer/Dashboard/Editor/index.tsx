import React, { useState } from 'react';

import { useColorModeValue, Wrap } from '@chakra-ui/react';

import EditorInformation from './Utils/Info';
import EditorLang from './Utils/Lang';
import EditorReset from './Utils/Reset';
import EditorRun from './Utils/Run';
import EditorSave from './Utils/Save';
import EditorSend from './Utils/Send';
import EditorSettings from './Utils/Settings';
import EditorTemplates from './Utils/Templates';
import Verdict from './Utils/Verdict';
import Ace from './Ace';

interface EditorProps {}

const Editor: React.FC<EditorProps> = () => {
  const [verdict, setVerdict] = useState('');
  const bg = useColorModeValue('#EDF2F7', '#1B1E23');
  return (
    <div>
      <Wrap
        display='flex'
        justifyContent='flex-end'
        backgroundColor={bg}
        borderRadius='md'
      >
        <EditorLang />
        <EditorTemplates />
        <EditorInformation />
        <EditorSettings />
        <EditorReset />
        <EditorSave />
      </Wrap>
      <Ace />
      {verdict ? <Verdict desc={verdict} /> : null}
      <Wrap backgroundColor={bg} borderRadius='md'>
        <EditorRun setVerdict={setVerdict} />
        <EditorSend />
      </Wrap>
    </div>
  );
};

export default Editor;
