import React from 'react';

import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react';

interface FeaturesProps {}

interface FeatureProps {
    heading: string;
    text: string;
}

const styles = {
    box: {
        p: 5,
        shadow: 'md',
        borderWidth: '1px',
        flex: '1',
        borderRadius: 'md',
        _hover: { shadow: '2xl' },
    },
    text: {
        mt: 4,
    },
    heading: {
        fontSize: 'xl',
    },
    grid: {
        w: '80%',
        mt: 5,
        spacing: '20px',
        columns: [1, null, 3],
    },
};

const Feature: React.FC<FeatureProps> = ({ heading, text }) => {
    return (
        <Box {...styles.box}>
            <Heading {...styles.heading}>{heading}</Heading>
            <Text {...styles.text}>{text}</Text>
        </Box>
    );
};

const Features: React.FC<FeaturesProps> = () => {
    return (
        <SimpleGrid {...styles.grid}>
            <Feature
                heading="Save workspaces"
                text="Save multiple problem workspaces so you can revisit solving a particular problem at a later time."
            />
            <Feature
                heading="Run against sample test cases"
                text="Run your code against the provided sample test cases with the click of a button."
            />
            <Feature
                heading="Upload code templates"
                text="Upload multiple code templates for quick and efficient usage during contests."
            />
        </SimpleGrid>
    );
};

export default Features;
