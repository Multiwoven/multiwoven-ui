import { Stack, Tab, TabIndicator, TabList, Tabs, Box, Text, VStack } from '@chakra-ui/react';
import ContentContainer from '@/components/ContentContainer';
import TopBar from '@/components/TopBar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
} from 'chart.js';
import { useQuery } from '@tanstack/react-query';
import { getReport } from '@/services/dashboard';
import SyncRuns from './SyncRuns';
import SyncRunsErrors from './SyncRunsErrors';
import RowsProcessed from './RowsProcessed';
import RowsFailed from './RowsFailed';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

const Dashboard = (): JSX.Element => {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', 'syncs'],
    queryFn: () => getReport(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>Error</div>;
  }

  console.log(data.data.sync_run_triggered);
  const syncRunTriggeredData = data.data.sync_run_triggered;
  const syncRunRowsData = data.data.total_sync_run_rows;

  return (
    <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
      <ContentContainer>
        <TopBar
          name={'Dashboard'}
          ctaName=''
          ctaButtonVariant='solid'
          onCtaClicked={() => {}}
          isCtaVisible={false}
        />
        <Box display={{ base: 'flex flex-col', lg: 'flex' }} gap='24px'>
          <Box>
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
                <TabList>
                  <TabName title='All Connectors' />
                  <TabName title='By Destination' />
                  <TabName title='By Source' />
                </TabList>
                <TabIndicator />
              </Tabs>
            </Stack>
          </Box>
          <Stack gap='32px'>
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
                <TabList>
                  <TabName title='24h' />
                  <TabName title='7d' />
                </TabList>
                <TabIndicator />
              </Tabs>
            </Stack>
            <Box display={{ base: 'flex flex-col', lg: 'flex' }} gap={3}>
              <VStack gap={3}>
                <SyncRuns syncRunTriggeredData={syncRunTriggeredData} />
                <SyncRunsErrors syncRunTriggeredData={syncRunTriggeredData} />
              </VStack>
              <VStack gap={3}>
                <RowsProcessed rowsProcessedData={syncRunRowsData} />
                <RowsFailed rowsFailedData={syncRunRowsData} />
              </VStack>
            </Box>
          </Stack>
        </Box>
      </ContentContainer>
    </Box>
  );
};

export default Dashboard;
