import { ReportObject } from '@/services/dashboard';
import SyncRuns from './SyncRuns';
import SyncRunsErrors from './SyncRunsErrors';
import RowsProcessed from './RowsProcessed';
import RowsFailed from './RowsFailed';
import { Box, VStack, Spinner } from '@chakra-ui/react';

type ReportsProps = {
  syncRunRowsData: ReportObject[] | undefined;
  syncRunTriggeredData: ReportObject[] | undefined;
};

const Reports = ({ syncRunTriggeredData, syncRunRowsData }: ReportsProps) => {
  return (
    <>
      {syncRunRowsData && syncRunTriggeredData ? (
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
      ) : (
        <Box display={{ base: 'flex flex-col', lg: 'flex' }} gap={3}>
          <Spinner speed='0.8s' emptyColor='gray.200' color='brand.300' size='lg' mx='auto' />
        </Box>
      )}
    </>
  );
};

export default Reports;
