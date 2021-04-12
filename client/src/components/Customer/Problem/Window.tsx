import React from 'react';

import {
  Center,
  Box,
  Stack,
  StackItem,
  Heading,
  Wrap,
  IconButton,
  Link,
  Table,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
  Text,
} from '@chakra-ui/react';

import { useProblem } from '../../../providers/ProblemProvider';
import { AiOutlineLink } from 'react-icons/ai';
import { Test } from '../../../ts/interfaces';

interface WindowProps {}

interface SampleProps {
  cases: string;
}

const Sample: React.FC<SampleProps> = ({ cases }) => {
  return (
    <Td>
      {cases.split('\n').map((str, idx: number) => {
        return <p key={idx}>{str}</p>;
      })}
    </Td>
  );
};

const Window: React.FC<WindowProps> = () => {
  const { problem }: any = useProblem();

  return (
    <Box borderRadius='md'>
      <Center w='85%' margin='auto'>
        <Stack alignItems='center' mt={5} mb={5}>
          <StackItem>
            <Wrap>
              <Heading mr={5} as='h2' size='lg'>
                {problem.title}
              </Heading>
              <Link href={problem.url} isExternal>
                <IconButton aria-label='link' as={AiOutlineLink}></IconButton>
              </Link>
            </Wrap>
          </StackItem>

          <StackItem>Time Limit: {problem.timeLimit}</StackItem>

          <StackItem mb={5}>Memory Limit: {problem.memoryLimit}</StackItem>

          <Heading as='h4' size='sm'>
            Problem statement
          </Heading>
          <StackItem mb={5}>
            <Text fontSize='sm'>{problem.statement.text}</Text>
          </StackItem>

          <StackItem>
            <Heading as='h4' size='sm'>
              Input specification ({problem.inputFile})
            </Heading>
          </StackItem>

          <StackItem mb={5}>
            <Text fontSize='sm'>{problem.statement.inputSpec}</Text>
          </StackItem>

          <StackItem>
            <Heading as='h4' size='sm'>
              Output specification ({problem.outputFile})
            </Heading>
          </StackItem>

          <StackItem mb={5}>
            <Text fontSize='sm'>{problem.statement.outputSpec}</Text>
          </StackItem>

          <Heading mb={2} as='h4' size='sm'>
            Sample test cases
          </Heading>

          <StackItem>
            {problem.statement.tests.map((item: Test, idx: number) => {
              return (
                <Table size='sm' key={idx}>
                  <Thead>
                    <Tr>
                      <Th>Sample input</Th>
                      <Th>Sample output</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Sample cases={item.input} />
                      <Sample cases={item.output} />
                    </Tr>
                  </Tbody>
                </Table>
              );
            })}
          </StackItem>

          {problem.statement.notes.length ? (
            <>
              <Heading as='h4' size='sm'>
                Notes
              </Heading>
              <StackItem>{problem.statement.notes}</StackItem>
            </>
          ) : null}
        </Stack>
      </Center>
    </Box>
  );
};

export default Window;
