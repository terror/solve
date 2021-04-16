import React from 'react';

import AceEditor from 'react-ace';
import './ace-imports';

import { useEditor } from '../../../../providers/EditorProvider';
import useWindowSize from '../../../../hooks/useWindowSize';

interface AceProps {}

const Ace: React.FC<AceProps> = () => {
  const { editorState, setEditorState }: any = useEditor();
  const [, height] = useWindowSize();

  const onChange = (newValue: any) => {
    setEditorState((prevState: any) => ({
      ...prevState,
      value: newValue,
    }));
  };

  return (
    <AceEditor
      onChange={onChange}
      mode={editorState.mode}
      theme={editorState.theme}
      height={`${height - 205}px`}
      width={editorState.width}
      fontSize={editorState.fontSize}
      keyboardHandler={editorState.keyboardHandler}
      value={editorState.value}
      name={editorState.name}
      setOptions={editorState.options}
    />
  );
};

export default Ace;
