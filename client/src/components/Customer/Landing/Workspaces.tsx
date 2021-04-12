import React, { useEffect, useState } from 'react';

import { useAuth } from '../../../providers/AuthProvider';
import { api } from '../../../ts/api';
import { WorkspaceState } from '../../../ts/interfaces';
import { Heading, Stack, StackItem } from '@chakra-ui/react';

import Workspace from './Workspace';

interface WorkspacesProps {}

const Workspaces: React.FC<WorkspacesProps> = () => {
  const [data, setData] = useState([]);
  const { currentUser }: any = useAuth();

  useEffect(() => {
    api.get(`/workspaces/${currentUser.uid}`).then((res) => {
      setData(res.data);
    });
  }, [currentUser.uid]);

  return (
    <Stack w='90%'>
      {data.length ? (
        <StackItem alignSelf='center'>
          <Heading as='h3' size='lg'>
            Active Workspaces
          </Heading>
        </StackItem>
      ) : null}
      {data.map((item: WorkspaceState, idx: number) => {
        return (
          <Workspace key={idx} item={item} items={data} setData={setData} />
        );
      })}
    </Stack>
  );
};

export default Workspaces;
