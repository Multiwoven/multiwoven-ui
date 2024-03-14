import { Stack, RadioGroup, Radio, Box, Divider, Text } from '@chakra-ui/react';
import { useState } from 'react';

type StaticOptionsProps = {
  staticValues: string[];
};

enum STATIC_OPTION_TYPE {
  STRING = 'string',
  BOOLEAN = 'boolean',
  NULL = 'null',
  NUMBER = 'number',
}

const StaticOptions = ({ staticValues }: StaticOptionsProps): JSX.Element => {
  const [selectedStaticValue, setSelectedStaticValue] = useState<STATIC_OPTION_TYPE | string>(
    STATIC_OPTION_TYPE.STRING,
  );

  return (
    <Stack gap='20px' height='100%' direction='row'>
      <RadioGroup onChange={setSelectedStaticValue} value={selectedStaticValue}>
        <Stack direction='column'>
          {staticValues.map((staticValue, index) => (
            <Radio
              size='lg'
              value={staticValue}
              key={index}
              padding='8px 12px'
              colorScheme='red'
              borderColor='gray.400'
              borderWidth='1.5px'
            >
              <Text size='md' fontWeight={500}>
                {staticValue}
              </Text>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Box>
        <Divider orientation='vertical' borderColor='gray.300' opacity={1} />
      </Box>
      <Box width='100%'>
        {(selectedStaticValue as STATIC_OPTION_TYPE) === STATIC_OPTION_TYPE.BOOLEAN && (
          <RadioGroup onChange={() => {}} value={'true'} colorScheme='red'>
            <Stack direction='row'>
              <Radio
                size='lg'
                padding='8px 12px'
                value='true'
                borderColor='gray.400'
                borderWidth='1.5px'
              >
                <Text size='md' fontWeight={500}>
                  True
                </Text>
              </Radio>
              <Radio
                size='lg'
                padding='8px 12px'
                value='false'
                borderColor='gray.400'
                borderWidth='1.5px'
              >
                <Text size='md' fontWeight={500}>
                  False
                </Text>
              </Radio>
            </Stack>
          </RadioGroup>
        )}
      </Box>
    </Stack>
  );
};

export default StaticOptions;
