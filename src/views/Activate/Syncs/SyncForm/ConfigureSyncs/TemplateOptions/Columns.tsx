import { Box, Stack, Text, Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

type ColumnsProps = {
  columnOptions: string[];
};

const Columns = ({ columnOptions }: ColumnsProps): JSX.Element => {
  return (
    <Stack gap='12px' height='100%'>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <Icon as={FiSearch} color='gray.600' boxSize='5' />
        </InputLeftElement>
        <Input
          placeholder='Search Columns'
          _placeholder={{ color: 'gray.600' }}
          borderColor='black.500'
          _hover={{ borderColor: 'black.500' }}
        />
      </InputGroup>
      <Box height='180px' overflowY='auto'>
        {columnOptions.map((column, index) => (
          <Box
            key={index}
            paddingY='10px'
            paddingX='16px'
            display='flex'
            gap='12px'
            _hover={{
              backgroundColor: 'gray.200',
            }}
            cursor='pointer'
          >
            <Text size='sm'>{column}</Text>
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export default Columns;
