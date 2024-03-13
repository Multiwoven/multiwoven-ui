import {
  Box,
  Stack,
  TabList,
  Tab,
  Text,
  TabIndicator,
  Tabs,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

type TemplateDropdownProps = {
  entityName: string;
  isDisabled: boolean;
  columnOptions: string[];
};

const TabName = ({ title, filterConnectors }: { title: string; filterConnectors: () => void }) => (
  <Tab
    _selected={{
      backgroundColor: 'gray.100',
      borderRadius: '4px',
      color: 'black.500',
    }}
    color='black.200'
    onClick={filterConnectors}
    padding='6px 24px'
  >
    <Text size='xs' fontWeight='semibold'>
      {title}
    </Text>
  </Tab>
);

const TemplateDropdown = ({
  entityName,
  isDisabled,
  columnOptions,
}: TemplateDropdownProps): JSX.Element => {
  return (
    <Popover placement='bottom-start'>
      <PopoverTrigger>
        <Input
          placeholder={`Select a field from ${entityName}`}
          backgroundColor={isDisabled ? 'gray.300' : 'gray.100'}
          isDisabled={isDisabled}
          isRequired
          borderWidth='1px'
          borderStyle='solid'
          borderColor={isDisabled ? 'gray.500' : 'gray.400'}
          _placeholder={{ color: isDisabled ? 'black.500' : 'gray.600' }}
        />
      </PopoverTrigger>
      <PopoverContent>
        <Box
          height='314px'
          width='200%'
          borderWidth={1}
          borderStyle='solid'
          borderColor='gray.400'
          position='absolute'
          backgroundColor='gray.100'
          zIndex={5}
          borderRadius='6px'
          padding='3'
          marginBottom={4}
        >
          <Stack gap='12px'>
            <Stack spacing='16'>
              <Tabs
                size='md'
                variant='indicator'
                background='gray.300'
                padding={1}
                borderRadius='8px'
                borderStyle='solid'
                borderWidth='1px'
                borderColor='gray.400'
                width='fit-content'
              >
                <TabList gap='8px'>
                  <TabName title='Column' filterConnectors={() => {}} />
                  <TabName title='Static Value' filterConnectors={() => {}} />
                  <TabName title='Template' filterConnectors={() => {}} />
                </TabList>
                <TabIndicator />
              </Tabs>
            </Stack>
            <Box backgroundColor='gray.100'>
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
            </Box>
          </Stack>
        </Box>
      </PopoverContent>
    </Popover>
  );
};

export default TemplateDropdown;
