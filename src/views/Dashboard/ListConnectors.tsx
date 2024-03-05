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

const TabName = ({ title }: { title: string }) => (
  <Tab
    _selected={{
      backgroundColor: 'gray.100',
      borderRadius: '4px',
      color: 'black.500',
    }}
    color='black.200'
  >
    <Text size='xs' fontWeight='semibold'>
      {title}
    </Text>
  </Tab>
);

const ListConnectors = ({
  connectorsList,
}: {
  connectorsList?: ConnectorItem[];
  setConnectorsList: React.Dispatch<React.SetStateAction<ConnectorItem[] | undefined>>;
}): JSX.Element => {
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
            <TabName title='All Connectors' />
            <TabName title='By Destination' />
            <TabName title='By Source' />
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
          {connectorsList?.length === 0 && (
            <VStack justify='center' height='100%'>
              <Text color='gray.600' size='xs' fontWeight='semibold'>
                No connectors found
              </Text>
            </VStack>
          )}
          {connectorsList?.map((connector, index) => (
            <Box
              key={index}
              paddingY='10px'
              paddingX='16px'
              display='flex'
              gap='12px'
              _hover={{ backgroundColor: 'gray.200' }}
            >
              <Checkbox size='md' />
              <EntityItem icon={connector?.attributes?.icon} name={connector?.attributes?.name} />
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default ListConnectors;
