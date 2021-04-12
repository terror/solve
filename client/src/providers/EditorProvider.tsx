import React, { createContext, useContext, useState, useEffect } from 'react';
import { IEditorSettings } from '../ts/interfaces';

const EditorContext = createContext({});

export const useEditor = () => {
  return useContext(EditorContext);
};

interface EditorProviderProps {}

const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const editor: IEditorSettings = {
    width: '100%',
    mode: 'java',
    theme: 'monokai',
    fontSize: '14px',
    keyboardHandler: 'vim',
    value: '',
    name: 'unique-id',
    options: {
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      showPrintMargin: false,
    },
  };

  const [editorState, setEditorState] = useState(editor);

  useEffect(() => {
    const data = localStorage.getItem('editor-state');
    if (data) {
      setEditorState(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('editor-state', JSON.stringify(editorState));
  });

  const value = {
    editorState,
    setEditorState,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
};

export default EditorProvider;
