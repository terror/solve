import React, { useState } from 'react';

import {
  Box,
  Input,
  FormLabel,
  Select,
  Button,
  Wrap,
  WrapItem,
  Center,
} from '@chakra-ui/react';

import { useProblem } from '../../../providers/ProblemProvider';
import { IProblem } from '../../../ts/interfaces';
import { api } from '../../../ts/api';

import Window from './Window';
import Error from '../../Error';
import useWindowSize from '../../../hooks/useWindowSize';

interface ProblemProps {}

const options: string[] = [
  'Leetcode',
  'Codeforces',
  'AtCoder',
  'CodeChef',
  'HackerRank',
  'TopCoder',
  'Kattis',
];

const Problem: React.FC<ProblemProps> = () => {
  const { problem, setProblem }: any = useProblem();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [, height] = useWindowSize();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError('');

      const { data } = await api.get(
        `/problems?platform=${problem.platform}&pid=${problem.id}`
      );

      setProblem((prevState: IProblem) => ({
        ...prevState,
        ...data,
      }));
    } catch (_) {
      setError('Error fetching problem information.');
    }
    setLoading(false);
  };

  return (
    <Box margin='auto' overflowY='auto' maxHeight={height - 125}>
      {error ? <Error msg={error} /> : null}
      <Center>
        <form id='problem' onSubmit={handleSubmit}>
          <FormLabel>Current Judge: {problem.platform}</FormLabel>
          <Wrap>
            <WrapItem>
              <Select
                placeholder='Select Judge'
                onChange={(e) =>
                  setProblem((prevState: IProblem) => ({
                    ...prevState,
                    platform: e.target.value,
                  }))
                }
                mb={3}
              >
                {options.map((item: string, idx: number) => {
                  return <option key={idx}>{item}</option>;
                })}
              </Select>
            </WrapItem>
            <WrapItem>
              <Input
                mb={3}
                placeholder={problem.id || 'Problem ID'}
                onChange={(e) =>
                  setProblem((prevState: IProblem) => ({
                    ...prevState,
                    id: e.target.value,
                  }))
                }
              />
            </WrapItem>
            <WrapItem>
              <Button isLoading={loading} type='submit'>
                Solve!
              </Button>
            </WrapItem>
          </Wrap>
        </form>
      </Center>
      {problem.statement.text.length ? <Window /> : null}
    </Box>
  );
};

export default Problem;
