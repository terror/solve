import React, { useEffect, useState } from 'react';

import {
    Heading,
    Stack,
    StackItem,
    Wrap,
    WrapItem,
    Table,
    Thead,
    Th,
    Tr,
    Td,
    Tbody,
} from '@chakra-ui/react';

import { api } from '../../../../ts/api';
import { useAuth } from '../../../../providers/AuthProvider';
import { ITemplate } from '../../../../ts/interfaces';

import TemplateAdd from './TemplateAdd';
import TemplateView from './TemplateView';

interface TemplatesProps {}

const Templates: React.FC<TemplatesProps> = () => {
    const { currentUser }: any = useAuth();
    const [templates, setTemplates] = useState<ITemplate[]>([]);

    useEffect(() => {
        api.get(`/templates/${currentUser.uid}`).then((res) => {
            setTemplates(res.data);
        });
    });

    return (
        <Stack>
            <StackItem alignSelf="center">
                <Wrap>
                    <WrapItem alignItems="center">
                        <Heading as="h2" size="md">
                            My Templates
                        </Heading>
                    </WrapItem>
                    <WrapItem>
                        <TemplateAdd />
                    </WrapItem>
                </Wrap>
            </StackItem>
            <StackItem alignSelf="center">
                <Table size="lg">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Language</Th>
                            <Th>Code</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {templates.map((item: ITemplate, idx: number) => {
                            return (
                                <Tr key={idx}>
                                    <Td>{item.name}</Td>
                                    <Td>{item.lang}</Td>
                                    <Td>
                                        <TemplateView item={item} />
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </StackItem>
        </Stack>
    );
};

export default Templates;
