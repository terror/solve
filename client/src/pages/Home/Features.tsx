import React from 'react';

import { Box, Heading, Text, SimpleGrid, Icon } from '@chakra-ui/react';
import { AiFillSave, AiOutlineCloudUpload } from 'react-icons/ai';
import { BiRun } from 'react-icons/bi';

interface FeaturesProps {}

interface FeatureProps {
  heading: string;
  text: string;
  Icon: any;
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

const Feature: React.FC<FeatureProps> = ({ heading, text, Icon }) => {
  return (
    <Box {...styles.box}>
      <Heading {...styles.heading}>
        {heading}
        {Icon}
      </Heading>
      <Text {...styles.text}>{text}</Text>
    </Box>
  );
};

const Features: React.FC<FeaturesProps> = () => {
  return (
    <SimpleGrid {...styles.grid}>
      <Feature
        heading='Save workspaces'
        text='Save multiple problem workspaces so you can revisit solving a particular problem at a later time.'
        Icon={<Icon ml={2} as={AiFillSave} />}
      />
      <Feature
        heading='Run against sample test cases'
        text='Run your code against the provided sample test cases with the click of a button.'
        Icon={<Icon ml={2} as={BiRun} />}
      />
      <Feature
        heading='Upload code templates'
        text='Upload multiple code templates for quick and efficient usage during contests.'
        Icon={<Icon ml={2} as={AiOutlineCloudUpload} />}
      />
    </SimpleGrid>
  );
};

export default Features;
