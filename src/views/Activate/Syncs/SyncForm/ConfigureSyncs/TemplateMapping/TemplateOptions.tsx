import { Box, Stack, TabList, Tab, Text, TabIndicator, Tabs, Textarea } from '@chakra-ui/react';

import { useState } from 'react';
import Columns from './Columns';
import { SyncsConfigurationForTemplateMapping } from '@/views/Activate/Syncs/types';

type TemplateOptionsProps = {
  columnOptions: string[];
  filterOptions: string[];
  catalogMapping?: SyncsConfigurationForTemplateMapping;
};

enum OPTION_TYPE {
  COLUMNS = 'columns',
  VARIABLE = 'variable',
  FILTER = 'filter',
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
  columnOptions,
  filterOptions,
  catalogMapping,
}: TemplateOptionsProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState(OPTION_TYPE.COLUMNS);

  return (
    <Stack gap='20px' height='100%' direction='row'>
      <Box flex={1}>
        <Textarea
          height='100%'
          borderStyle='solid'
          borderWidth='1px'
          borderColor='black.100'
          padding={4}
          _focusVisible={{
            borderStyle: '1px',
            borderWidth: 'solid',
            borderColor: 'black.100',
          }}
          _hover={{ borderStyle: '1px', borderWidth: 'solid', borderColor: 'black.100' }}
          spellCheck={false}
          placeholder='Click on any variable/filter on the right to inject into liquid template'
          _placeholder={{ color: 'gray.600' }}
          size='sm'
          fontWeight={400}
        />
      </Box>

      <Stack gap='20px' flex={1}>
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
            <TabName title='Column' handleActiveTab={() => setActiveTab(OPTION_TYPE.COLUMNS)} />
            <TabName title='Variable' handleActiveTab={() => setActiveTab(OPTION_TYPE.VARIABLE)} />
            <TabName title='Filter' handleActiveTab={() => setActiveTab(OPTION_TYPE.FILTER)} />
          </TabList>
          <TabIndicator />
        </Tabs>
        <Box backgroundColor='gray.100' height='100%'>
          {activeTab === OPTION_TYPE.COLUMNS && <Columns columnOptions={columnOptions} />}
          {activeTab === OPTION_TYPE.FILTER && (
            <Columns
              columnOptions={filterOptions}
              showDescription
              catalogMapping={catalogMapping}
            />
          )}
        </Box>
      </Stack>
    </Stack>
  );
};

export default TemplateOptions;
