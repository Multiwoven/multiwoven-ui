import { Box, Stack, Text, Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { SyncsConfigurationForTemplateMapping } from '@/views/Activate/Syncs/types';

type ColumnsProps = {
  columnOptions: string[];
  catalogMapping?: SyncsConfigurationForTemplateMapping;
  showFilter?: boolean;
  showDescription?: boolean;
  onSelect?: (args: string) => void;
  height?: string;
};

const Columns = ({
  columnOptions,
  catalogMapping,
  onSelect,
  showFilter = false,
  showDescription = false,
  height = '170px',
}: ColumnsProps): JSX.Element => {
  return (
    <Stack gap='12px' height='100%'>
      {showFilter && (
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
      )}
      <Box height={height} overflowY='auto'>
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
            flexDirection='column'
            onClick={() => onSelect?.(column)}
          >
            <Text size='sm'>{column}</Text>
            {showDescription && (
              <Text size='xs' color='gray.600' fontWeight={400}>
                {
                  catalogMapping?.data?.configurations?.catalog_mapping_types?.template?.filter[
                    column
                  ].description
                }
              </Text>
            )}
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export default Columns;
