import { Stack, Tab, TabIndicator, TabList, Tabs, Box, Text } from '@chakra-ui/react';
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
import { ReportTimePeriod, getReport, Report } from '@/services/dashboard';

import { getAllConnectors } from '@/services/connectors';
import { useEffect, useState } from 'react';
import ListConnectors from './ListConnectors';
import { ConnectorItem } from '../Connectors/types';
import Reports from './Reports';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TabName = ({ title, onClick }: { title: string; onClick?: () => void }) => (
  <Tab
    _selected={{
      backgroundColor: 'gray.100',
      borderRadius: '4px',
      color: 'black.500',
    }}
    color='black.200'
    onClick={onClick}
  >
    <Text size='xs' fontWeight='semibold'>
      {title}
    </Text>
  </Tab>
);

const Dashboard = (): JSX.Element | null => {
  const [filteredConnectorsList, setFilteredConnectorsList] = useState<ConnectorItem[]>();
  const [reportTime, setReportTime] = useState<ReportTimePeriod>('one_day');
  const [report, setReport] = useState<Report>();
  const [connectorIds, setConnectorIds] = useState<number[]>([]);

  const { data } = useQuery({
    queryKey: ['connectors', 'dashboard'],
    queryFn: () => getAllConnectors(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setFilteredConnectorsList(data?.data);
  }, [data]);

  const { data: reportData } = useQuery({
    queryKey: ['dashboard', 'syncs', reportTime, connectorIds],
    queryFn: () => getReport({ time_period: reportTime, connector_ids: [...connectorIds] }),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setReport(reportData);
  }, [reportData]);

  const setReportTimePeriod = (timePeriod: ReportTimePeriod) => {
    setReportTime(timePeriod);
  };

  const syncRunTriggeredData = report?.data.sync_run_triggered;
  const syncRunRowsData = report?.data.total_sync_run_rows;

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
        <Box display='flex' gap='24px'>
          <Box>
            <ListConnectors
              connectorsList={data?.data}
              filteredConnectorsList={filteredConnectorsList}
              setFilteredConnectorsList={setFilteredConnectorsList}
              setConnectorsId={setConnectorIds}
            />
          </Box>
          <Box>
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
                    <TabName title='24hr' onClick={() => setReportTimePeriod('one_day')} />
                    <TabName title='7d' onClick={() => setReportTimePeriod('one_week')} />
                  </TabList>
                  <TabIndicator />
                </Tabs>
              </Stack>
              {syncRunTriggeredData && syncRunRowsData ? (
                <Reports
                  syncRunTriggeredData={syncRunTriggeredData}
                  syncRunRowsData={syncRunRowsData}
                />
              ) : null}
            </Stack>
          </Box>
        </Box>
      </ContentContainer>
    </Box>
  );
};

export default Dashboard;
