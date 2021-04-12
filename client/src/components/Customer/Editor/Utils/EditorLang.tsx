import React from 'react';

import { useEditor } from '../../../../providers/EditorProvider';
import { IEditorSettings } from '../../../../ts/interfaces';
import { Select, WrapItem } from '@chakra-ui/react';
import { findKey } from '../../../../ts/utils';
import { languageOptions } from '../../../../ts/languages';

interface EditorLangProps {}

const EditorLang: React.FC<EditorLangProps> = () => {
  const { editorState, setEditorState }: any = useEditor();

  const handleChange = (e: React.SyntheticEvent<EventTarget>): void => {
    setEditorState((prevState: IEditorSettings) => ({
      ...prevState,
      mode: languageOptions[(e.target as HTMLInputElement).value],
    }));
  };

  return (
    <WrapItem>
      <Select
        variant='unstyled'
        placeholder={findKey(languageOptions, editorState.mode)}
        onChange={handleChange}
      >
        {Object.keys(languageOptions).map((item: string, idx: number) => {
          return <option key={idx}>{item}</option>;
        })}
      </Select>
    </WrapItem>
  );
};

export default EditorLang;
