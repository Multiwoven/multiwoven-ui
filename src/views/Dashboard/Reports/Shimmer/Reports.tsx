import { Box, VStack } from '@chakra-ui/react';
import { ChartShimmer } from './ChartShimmer';
const Reports = ({ fetchingReports }: { fetchingReports: boolean }): JSX.Element => {
  return (
    <>
      <Box display={{ base: 'flex flex-col', lg: 'flex' }} gap={4}>
        <VStack gap={4}>
          <ChartShimmer fetchingReports={fetchingReports} />
          <ChartShimmer fetchingReports={fetchingReports} />
        </VStack>
        <VStack gap={4}>
          <ChartShimmer fetchingReports={fetchingReports} />
          <ChartShimmer fetchingReports={fetchingReports} />
        </VStack>
      </Box>
    </>
  );
};

export default Reports;
