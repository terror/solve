import React from 'react';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Select,
} from '@chakra-ui/react';

import { FormikProps } from '../../ts/interfaces';

const options = ['C++', 'Java', 'Python'];

const SelectField: React.FC<FormikProps> = (props) => {
    return (
        <div style={{ marginBottom: '5px' }}>
            <FormControl isInvalid={props.errors && props.touched}>
                <FormLabel htmlFor={props.name}>{props.name}</FormLabel>
                <Select
                    {...props.field}
                    id={props.name}
                    placeholder={props.name}
                    type={props.name}
                >
                    {options.map((item: string, idx: number) => {
                        return <option key={idx}>{item}</option>;
                    })}
                </Select>
                <FormErrorMessage>{props.errors}</FormErrorMessage>
            </FormControl>
        </div>
    );
};

export default SelectField;
