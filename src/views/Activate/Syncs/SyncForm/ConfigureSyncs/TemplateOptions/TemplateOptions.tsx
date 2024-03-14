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
import Columns from './Columns';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getSyncsConfiguration } from '@/services/syncs';
import StaticOptions from './StaticOptions';

type TemplateOptionsProps = {
  entityName: string;
  isDisabled: boolean;
  columnOptions: string[];
};

enum OPTION_TYPE {
  COLUMNS = 'columns',
  STATIC = 'static',
  TEMPLATE = 'template',
}

const TabName = ({ title, handleActiveTab }: { title: string; handleActiveTab: () => void }) => (
  <Tab
    _selected={{
      backgroundColor: 'gray.100',
      borderRadius: '4px',
      color: 'black.500',
    }}
    color='black.200'
    onClick={handleActiveTab}
    padding='6px 24px'
  >
    <Text size='xs' fontWeight='semibold'>
      {title}
    </Text>
  </Tab>
);

const TemplateOptions = ({
  entityName,
  isDisabled,
  columnOptions,
}: TemplateOptionsProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState(OPTION_TYPE.COLUMNS);

  const { data } = useQuery({
    queryKey: ['syncsConfiguration'],
    queryFn: () => getSyncsConfiguration(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const staticValueOptions = Object.keys(
    data?.data?.configurations?.catalog_mapping_types?.static || {},
  );

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
          <Stack gap='20px'>
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
                  <TabName
                    title='Column'
                    handleActiveTab={() => setActiveTab(OPTION_TYPE.COLUMNS)}
                  />
                  <TabName
                    title='Static Value'
                    handleActiveTab={() => setActiveTab(OPTION_TYPE.STATIC)}
                  />
                  <TabName
                    title='Template'
                    handleActiveTab={() => setActiveTab(OPTION_TYPE.TEMPLATE)}
                  />
                </TabList>
                <TabIndicator />
              </Tabs>
            </Stack>
            <Box backgroundColor='gray.100'>
              {activeTab === OPTION_TYPE.COLUMNS && <Columns columnOptions={columnOptions} />}
              {activeTab === OPTION_TYPE.STATIC && (
                <StaticOptions staticValues={staticValueOptions} />
              )}
            </Box>
          </Stack>
        </Box>
      </PopoverContent>
    </Popover>
  );
};

export default TemplateOptions;
