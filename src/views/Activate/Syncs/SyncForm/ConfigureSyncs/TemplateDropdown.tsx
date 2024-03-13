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
} from '@chakra-ui/react';

type TemplateDropdownProps = {
  entityName: string;
  isDisabled: boolean;
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

const TemplateDropdown = ({ entityName, isDisabled }: TemplateDropdownProps): JSX.Element => {
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
          _placeholder={{ color: 'black.500' }}
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
            <Box
              backgroundColor='gray.100'
              borderRadius='8px'
              borderStyle='solid'
              borderWidth='1px'
              borderColor='gray.400'
            >
              <Stack gap='12px' height='100%'></Stack>
            </Box>
          </Stack>
        </Box>
      </PopoverContent>
    </Popover>
  );
};

export default TemplateDropdown;
