import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Image, TabList, Tabs, Text, useToast } from '@chakra-ui/react';

import { getSyncRecords } from '@/services/syncs';

import Loader from '@/components/Loader';
import Table from '@/components/Table';
import ContentContainer from '@/components/ContentContainer';
import TabItem from '@/components/TabItem';

import { TableItem } from '@/views/Activate/Syncs/SyncRecords/SyncRecordTableItem';
import Pagination from '@/components/Pagination';
import SyncRunEmptyImage from '@/assets/images/SyncRunEmpty.svg';

import { SyncRecordsTopBar } from './SyncRecordsTopBar';

const SyncRecords = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { syncId, syncRunId } = useParams();
  const toast = useToast();

  const pageId = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(Number(pageId) || 1);

  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage, setSearchParams]);

  const [currentFilter, setCurrentFilter] = useState<'success' | 'failed'>('success');

  const {
    data: syncRunRecords,
    isLoading: isSyncRecordsLoading,
    isError: isSyncRecordsError,
  } = useQuery({
    queryKey: ['activate', 'sync-records', syncRunId, currentPage],
    queryFn: () => getSyncRecords(syncId as string, syncRunId as string, currentPage.toString()),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const filteredRecords = useMemo(
    () => syncRunRecords?.data.filter((record) => record.attributes.status === currentFilter),
    [syncRunRecords, currentFilter],
  );

  const syncRunRecordColumns = useMemo(
    () =>
      filteredRecords && filteredRecords.length > 0
        ? Object.keys(filteredRecords[0].attributes.record)
        : [],
    [filteredRecords],
  );

  const SYNC_RUNS_RECORDS_COLUMNS = useMemo(
    () => [
      {
        key: 'status',
        name: 'Status',
      },
      ...syncRunRecordColumns.map((column) => ({
        key: column,
        name: column,
      })),
    ],
    [syncRunRecordColumns],
  );

  const tableData = useMemo(() => {
    const rows = filteredRecords?.map((data) => {
      return SYNC_RUNS_RECORDS_COLUMNS.reduce(
        (acc, { key }) => ({
          ...acc,
          [key]: <TableItem field={key} data={data} />,
          id: data.id,
        }),
        {},
      );
    });

    return {
      columns: SYNC_RUNS_RECORDS_COLUMNS,
      data: rows || [],
      error: '',
    };
  }, [filteredRecords, SYNC_RUNS_RECORDS_COLUMNS]);

  const handleNextPage = () => {
    if (syncRunRecords?.links?.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (syncRunRecords?.links?.prev) {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };

  useEffect(() => {
    if (isSyncRecordsError) {
      toast({
        title: 'Error',
        description: 'There was an issue fetching the sync records.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  }, [isSyncRecordsError, toast]);

  return (
    <ContentContainer>
      {syncId && syncRunId ? <SyncRecordsTopBar syncId={syncId} syncRunId={syncRunId} /> : <></>}
      <Tabs
        size='md'
        variant='indicator'
        onChange={(index) => setCurrentFilter(index === 0 ? 'success' : 'failed')}
        background='gray.300'
        padding='4px'
        borderRadius='8px'
        borderStyle='solid'
        borderWidth='1px'
        borderColor='gray.400'
        width='fit-content'
        height='fit'
      >
        <TabList gap='8px'>
          <TabItem
            text='Successful'
            action={() => setCurrentFilter('success')}
            isBadgeVisible
            badgeText={syncRunRecords?.data
              .filter((record) => record.attributes.status === 'success')
              .length.toString()}
          />
          <TabItem
            text='Failed'
            action={() => setCurrentFilter('failed')}
            isBadgeVisible
            badgeText={syncRunRecords?.data
              .filter((record) => record.attributes.status === 'failed')
              .length.toString()}
          />
        </TabList>
      </Tabs>
      {isSyncRecordsLoading ? (
        <Loader />
      ) : (
        <Box width='100%' pt={'20px'}>
          {filteredRecords?.length === 0 ? (
            <Box
              display='flex'
              w='fit-content'
              mx='auto'
              flexDirection='column'
              gap='20px'
              mt='10%'
            >
              <Image src={SyncRunEmptyImage} w='175px' h='132px' />
              <Text fontSize='xl' mx='auto' color='gray.600' fontWeight='semibold'>
                No rows found
              </Text>
            </Box>
          ) : (
            <Box>
              <Table data={tableData} />
              <Box display='flex' flexDirection='row-reverse' pt='10px'>
                <Pagination
                  currentPage={currentPage}
                  isPrevPageEnabled={syncRunRecords?.links?.prev != null}
                  isNextPageEnabled={syncRunRecords?.links?.next != null}
                  handleNextPage={handleNextPage}
                  handlePrevPage={handlePrevPage}
                />
              </Box>
            </Box>
          )}
        </Box>
      )}
    </ContentContainer>
  );
};

export default SyncRecords;
