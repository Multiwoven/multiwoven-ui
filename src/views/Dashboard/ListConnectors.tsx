import {
  Stack,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  Box,
  Text,
  Checkbox,
  VStack,
} from '@chakra-ui/react';
import EntityItem from '@/components/EntityItem';
import { ConnectorItem } from '../Connectors/types';

enum CONNECTOR_TYPE {
  ALL = 'all',
  DESTINATION = 'destination',
  SOURCE = 'source',
}

const TabName = ({ title, filterConnectors }: { title: string; filterConnectors: () => void }) => (
  <Tab
    _selected={{
      backgroundColor: 'gray.100',
      borderRadius: '4px',
      color: 'black.500',
    }}
    color='black.200'
    onClick={filterConnectors}
  >
    <Text size='xs' fontWeight='semibold'>
      {title}
    </Text>
  </Tab>
);

const ListConnectors = ({
  connectorsList,
  filteredConnectorsList,
  setFilteredConnectorsList,
}: {
  connectorsList?: ConnectorItem[];
  filteredConnectorsList?: ConnectorItem[];
  setFilteredConnectorsList: React.Dispatch<React.SetStateAction<ConnectorItem[] | undefined>>;
}): JSX.Element => {
  const filterConnectors = (filterBy: string) => {
    if (filterBy === 'all') {
      setFilteredConnectorsList(connectorsList);
      return;
    }

    const updatedFilteredConnectors = connectorsList?.filter(
      (connector) => connector?.attributes?.connector_type === filterBy,
    );
    setFilteredConnectorsList(updatedFilteredConnectors);
  };

  return (
    <Stack gap='24px'>
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
          width='352px'
        >
          <TabList gap='8px'>
            <TabName
              title='All Connectors'
              filterConnectors={() => filterConnectors(CONNECTOR_TYPE.ALL)}
            />
            <TabName
              title='By Destination'
              filterConnectors={() => filterConnectors(CONNECTOR_TYPE.DESTINATION)}
            />
            <TabName
              title='By Source'
              filterConnectors={() => filterConnectors(CONNECTOR_TYPE.SOURCE)}
            />
          </TabList>
          <TabIndicator />
        </Tabs>
      </Stack>
      <Box
        height='460px'
        backgroundColor='gray.100'
        width='352px'
        borderRadius='8px'
        borderStyle='solid'
        borderWidth='1px'
        borderColor='gray.400'
      >
        <Stack gap='12px' height='100%'>
          {filteredConnectorsList?.length === 0 && (
            <VStack justify='center' height='100%'>
              <Text color='gray.600' size='xs' fontWeight='semibold'>
                No connectors found
              </Text>
            </VStack>
          )}
          {filteredConnectorsList?.map((connector, index) => (
            <Box
              key={index}
              paddingY='10px'
              paddingX='16px'
              display='flex'
              gap='12px'
              _hover={{ backgroundColor: 'gray.200' }}
            >
              <Checkbox
                size='lg'
                borderColor='gray.300'
                _checked={{
                  '& .chakra-checkbox__control': {
                    background: 'brand.400',
                    borderColor: 'brand.400',
                  },
                }}
              />
              <EntityItem icon={connector?.attributes?.icon} name={connector?.attributes?.name} />
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default ListConnectors;
