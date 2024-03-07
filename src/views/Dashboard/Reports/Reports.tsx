import { ReportObject } from '@/services/dashboard';
// import SyncRuns from './SyncRuns';
// import SyncRunsErrors from './SyncRunsErrors';
// import RowsProcessed from './RowsProcessed';
// import RowsFailed from './RowsFailed';
import { Box, VStack, Spinner } from '@chakra-ui/react';
import { ChartCard } from './ChartCard';
import { ChartDataType } from '../types';

type ReportsProps = {
  syncRunRowsData: ReportObject[];
  syncRunTriggeredData: ReportObject[];
};

const Reports = ({ syncRunTriggeredData, syncRunRowsData }: ReportsProps): JSX.Element => {
  if (!syncRunRowsData && !syncRunTriggeredData) {
    return (
      <Box display={{ base: 'flex flex-col', lg: 'flex' }} gap={4}>
        <Spinner speed='0.8s' emptyColor='gray.200' color='brand.300' size='lg' mx='auto' />
      </Box>
    );
  }
  const syncRunsData: ChartDataType = {
    xData: syncRunTriggeredData,
    yData: syncRunTriggeredData,
    xDataPoints: ['time_slice'],
    yDataPoints: ['failed_count', 'success_count'],
    yLabels: { failed_count: 'Failed', success_count: 'Success' },
    backgroundColors: { failed_count: '#F45757', success_count: '#4CAF50' },
  };

  const syncRunsFailedData: ChartDataType = {
    xData: syncRunTriggeredData,
    yData: syncRunTriggeredData,
    xDataPoints: ['time_slice'],
    yDataPoints: ['failed_count'],
    yLabels: { failed_count: 'Failed' },
    backgroundColors: { failed_count: '#F45757' },
  };

  const syncRowsProcessed: ChartDataType = {
    xData: syncRunRowsData,
    yData: syncRunRowsData,
    xDataPoints: ['time_slice'],
    yDataPoints: ['success_count', 'failed_count'],
    yLabels: { failed_count: 'Failed', success_count: 'Success' },
    backgroundColors: { failed_count: '#F45757', success_count: '#4CAF50' },
  };

  const syncRowsFailed: ChartDataType = {
    xData: syncRunRowsData,
    yData: syncRunRowsData,
    xDataPoints: ['time_slice'],
    yDataPoints: ['failed_count'],
    yLabels: { failed_count: 'Failed' },
    backgroundColors: { failed_count: '#F45757' },
  };

  return (
    <>
      <Box display={{ base: 'flex flex-col', lg: 'flex' }} gap={4}>
        <VStack gap={4}>
          {/* <SyncRuns syncRunTriggeredData={syncRunTriggeredData} />
            <SyncRunsErrors syncRunTriggeredData={syncRunTriggeredData} />
          </VStack>
          <VStack gap={3}>
            <RowsProcessed rowsProcessedData={syncRunRowsData} />
            <RowsFailed rowsFailedData={syncRunRowsData} /> */}
          <ChartCard
            data={syncRunsData}
            tooltipLabel='Number of sync runs triggered manually or via recurring schedule'
            cardTitle='Sync runs'
            chartEmptyText='No sync runs'
          />
          <ChartCard
            data={syncRunsFailedData}
            tooltipLabel='Number of sync runs that encountered fatal or row-level errors'
            cardTitle='Sync runs with errors'
            chartEmptyText='No sync runs failed'
          />
        </VStack>
        <VStack gap={4}>
          <ChartCard
            data={syncRowsProcessed}
            tooltipLabel='Number of rows added, changed, or removed during sync runs'
            cardTitle='Rows processed'
            tooltipPosition='top-end'
            chartEmptyText='No processed rows'
          />
          <ChartCard
            data={syncRowsFailed}
            tooltipLabel='Number of rows added, changed, or removed during sync runs'
            cardTitle='Rows failed'
            tooltipPosition='top-end'
            chartEmptyText='No processed rows'
          />
        </VStack>
      </Box>
    </>
  );
};

export default Reports;
