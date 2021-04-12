import React, { useEffect, useState } from 'react';

import { Select, WrapItem } from '@chakra-ui/react';
import { ITemplate, IEditorSettings } from '../../../../ts/interfaces';
import { api } from '../../../../ts/api';
import { useAuth } from '../../../../providers/AuthProvider';
import { useEditor } from '../../../../providers/EditorProvider';
import { languageOptions } from '../../../../ts/languages';

interface EditorTemplatesProps {}

const EditorTemplates: React.FC<EditorTemplatesProps> = () => {
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const { currentUser }: any = useAuth();
  const { setEditorState }: any = useEditor();

  useEffect(() => {
    api.get(`/templates/${currentUser.uid}`).then((res) => {
      setTemplates(res.data);
    });
  }, [currentUser.uid]);

  const handleChange = (e: any): void => {
    const selectedIndex = e.target.options.selectedIndex;
    setEditorState((prevState: IEditorSettings) => ({
      ...prevState,
      value: e.target.value,
      mode:
        languageOptions[e.target.options[selectedIndex].getAttribute('lang')],
    }));
  };

  return (
    <WrapItem>
      <Select
        mr={2}
        variant='unstyled'
        placeholder='Select Template'
        onChange={handleChange}
      >
        {templates.map((item: ITemplate, idx: number) => {
          return (
            <option key={idx} value={item.body} lang={item.lang}>
              {item.name}
            </option>
          );
        })}
      </Select>
    </WrapItem>
  );
};

export default EditorTemplates;
