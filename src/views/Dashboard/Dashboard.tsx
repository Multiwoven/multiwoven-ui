import {
  Stack,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  Box,
  Text,
  VStack,
  Checkbox,
} from '@chakra-ui/react';
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
import { ReportTimePeriod, getReport } from '@/services/dashboard';
import SyncRuns from './SyncRuns';
import SyncRunsErrors from './SyncRunsErrors';
import RowsProcessed from './RowsProcessed';
import RowsFailed from './RowsFailed';
import { useState } from 'react';

import { getAllConnectors } from '@/services/connectors';
import EntityItem from '@/components/EntityItem';

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
  const [reportTime, setReportTime] = useState<ReportTimePeriod>('one_week');

  const { data: reportData } = useQuery({
    queryKey: ['dashboard', 'syncs'],
    queryFn: () => getReport({ time_period: reportTime }),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['models'],
    queryFn: () => getAllConnectors(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!reportData) {
    return <div>Error</div>;
  }

  const syncRunTriggeredData = reportData.data.sync_run_triggered;
  const syncRunRowsData = reportData.data.total_sync_run_rows;

  console.log(data);

  const connectorsList = data?.data;

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
          <Stack gap='32px'>
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
                    <EntityItem
                      icon={connector?.attributes?.icon}
                      name={connector?.attributes?.name}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
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
