import React, { useEffect, useState } from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  StackItem,
  Link,
  Icon,
  Button,
  Text,
  CircularProgress,
} from '@chakra-ui/react';

import { AiOutlineLink } from 'react-icons/ai';
import { parseISODate } from '../../../ts/utils';

interface ContestsProps {}

const styles = {
  stackItem: {
    w: '90%',
    shadow: 'lg',
    borderRadius: 'md',
    alignSelf: 'center',
    maxHeight: '40%',
    overflow: 'auto',
    mb: 10,
  },
};

const Contests: React.FC<ContestsProps> = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://kontests.net/api/v1/all')
      .then((res) => res.json())
      .then((res) => {
        setContests(res.reverse());
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress
          alignSelf='center'
          isIndeterminate
          color='green.300'
        />
      ) : (
        <StackItem {...styles.stackItem}>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Site name</Th>
                <Th>URL</Th>
                <Th>Start time</Th>
                <Th>End time</Th>
              </Tr>
            </Thead>
            {contests.map((item: any, idx: number) => {
              return (
                <Tbody key={idx}>
                  <Tr>
                    <Td w='25%'>
                      <Text noOfLines={3} isTruncated>
                        {item.name}
                      </Text>
                    </Td>
                    <Td>{item.site}</Td>
                    <Td>
                      <Button>
                        <Link href={item.url} target='_blank'>
                          <Icon as={AiOutlineLink} />
                        </Link>
                      </Button>
                    </Td>
                    <Td>{parseISODate(item.start_time)}</Td>
                    <Td>{parseISODate(item.end_time)}</Td>
                  </Tr>
                </Tbody>
              );
            })}
          </Table>
        </StackItem>
      )}
    </>
  );
};

export default Contests;
