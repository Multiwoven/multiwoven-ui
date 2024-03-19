import { Box, Stack, TabList, Tab, Text, TabIndicator, Tabs, Textarea } from '@chakra-ui/react';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Columns from './Columns';
import { SyncsConfigurationForTemplateMapping } from '@/views/Activate/Syncs/types';

type TemplateOptionsProps = {
  columnOptions: string[];
  filterOptions: string[];
  selectedTemplate: string;
  setSelectedTemplate: Dispatch<SetStateAction<string>>;
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
  selectedTemplate,
  setSelectedTemplate,
}: TemplateOptionsProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState(OPTION_TYPE.COLUMNS);

  // State to hold selected columns and filters
  const [selectedItems, setSelectedItems] = useState<Map<string, string>>(new Map());
  const [activeSelectedColumn, setActiveSelectedColumn] = useState('');

  const handleSelection = (value: string, optionType: OPTION_TYPE) => {
    setSelectedItems((prev) => {
      const updatedItems = new Map(prev);
      if (!updatedItems.has(value) && optionType !== OPTION_TYPE.FILTER) {
        updatedItems.set(value, `{{ row['${value}'] }}`);
        setActiveSelectedColumn(value);
      } else {
        if (optionType === OPTION_TYPE.FILTER) {
          const currentItem = updatedItems.get(activeSelectedColumn)?.split('}}');
          updatedItems.set(activeSelectedColumn, `${currentItem?.[0]} | ${value} }}`);
        }
      }
      return updatedItems;
    });
  };

  // Update the selectedTemplate whenever selectedItems change
  useEffect(() => {
    let template = '';
    selectedItems.forEach((value) => {
      template += `${value} `;
    });
    setSelectedTemplate(template.trim());
  }, [selectedItems]);

  return (
    <Stack gap='20px' height='100%' direction='row'>
      <Box flex={1}>
        <Textarea
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          height='100%'
          borderStyle='solid'
          borderWidth='1px'
          borderColor='gray.400'
          padding={4}
          _focusVisible={{
            borderStyle: '1px',
            borderWidth: 'solid',
            borderColor: 'gray.400',
          }}
          _hover={{ borderStyle: '1px', borderWidth: 'solid', borderColor: 'gray.400' }}
          spellCheck={false}
          placeholder='Click on any variable/filter on the right to inject into liquid template'
          _placeholder={{ color: 'gray.600' }}
          size='sm'
          fontWeight={400}
          borderRadius='6px'
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
          {activeTab === OPTION_TYPE.COLUMNS && (
            <Columns
              columnOptions={columnOptions}
              onSelect={(value: string) => handleSelection(value, OPTION_TYPE.COLUMNS)}
              height='125px'
            />
          )}
          {activeTab === OPTION_TYPE.FILTER && (
            <Columns
              columnOptions={filterOptions}
              showDescription
              catalogMapping={catalogMapping}
              onSelect={(value: string) => handleSelection(value, OPTION_TYPE.FILTER)}
              height='125px'
            />
          )}
        </Box>
      </Stack>
    </Stack>
  );
};

export default TemplateOptions;
