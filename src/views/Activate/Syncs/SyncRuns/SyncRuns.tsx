import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getSyncRunsById } from '@/services/syncs';
import { useMemo } from 'react';
import { SYNC_RUNS_COLUMNS } from '../constants';
import { Box, Text } from '@chakra-ui/react';
import StatusTag from '@/components/StatusTag';
import moment from 'moment';
import { SyncRunsColumnFields, SyncRunsResponse } from '../types';
import ContentContainer from '@/components/ContentContainer';
import Loader from '@/components/Loader';
import Table from '@/components/Table';
import { ResultEntity } from './ResultEntity';

type TableItem = {
  field: SyncRunsColumnFields;
  data: SyncRunsResponse;
};

const TableItem = ({ field, data }: TableItem): JSX.Element => {
  switch (field) {
    case 'start_time':
      return (
        <Text fontSize='sm'>
          {moment(data.attributes.started_at).format('DD/MM/YYYY')} at{' '}
          {moment(data.attributes.started_at).format('HH:MM a')}
        </Text>
      );

    case 'duration':
      return <Text fontSize='sm'>{data.attributes.duration} seconds</Text>;

    case 'rows_queried':
      return <Text fontSize='sm'>{data.attributes.total_query_rows} rows</Text>;

    case 'status': {
      return data.attributes.status === 'success' ? (
        <StatusTag variant='success' status='Healthy' />
      ) : (
        <StatusTag variant='error' status='Failed' />
      );
    }

    case 'results':
      return (
        <Box display='flex' flexDir='row' gap={8}>
          <ResultEntity
            current_value={data.attributes.successful_rows}
            current_text_color='success.500'
            total_value={data.attributes.total_query_rows}
            result_text='Successful'
          />
          <ResultEntity
            current_value={data.attributes.failed_rows}
            current_text_color='error.500'
            total_value={data.attributes.total_query_rows}
            result_text='Failed'
          />
        </Box>
      );
  }
};

const SyncRuns = () => {
  const { syncId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['activate', 'sync-runs', syncId],
    queryFn: () => getSyncRunsById(syncId as string),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const syncList = data?.data;

  const tableData = useMemo(() => {
    const rows = (syncList ?? [])?.map((data) => {
      return SYNC_RUNS_COLUMNS.reduce(
        (acc, { key }) => ({
          [key]: <TableItem field={key} data={data} />,
          id: data.id,
          ...acc,
        }),
        {},
      );
    });

    return {
      columns: SYNC_RUNS_COLUMNS,
      data: rows,
      error: '',
    };
  }, [data]);

  return (
    <Box width='100%' pt={'20px'}>
      {!syncList && isLoading ? <Loader /> : <Table data={tableData} />}
    </Box>
  );
};

export default SyncRuns;
