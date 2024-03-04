import moment from 'moment';
import { ChartCard } from '../ChartCard';
import { ReportObject } from '@/services/dashboard';

type RowsProcessedProps = {
  rowsProcessedData: ReportObject[];
};

const RowsProcessed = ({ rowsProcessedData }: RowsProcessedProps): JSX.Element => {
  const chartData = {
    labels: rowsProcessedData.map((row) => moment(row.time_slice).format('ddd hh:mm')),
    datasets: [
      {
        label: 'Failed',
        data: rowsProcessedData.map((row) => row.failed_count),
        backgroundColor: '#F45757',
      },
      {
        label: 'Success',
        data: rowsProcessedData.map((row) => row.success_count),
        backgroundColor: '#33C0A7',
      },
    ],
  };
  return (
    <ChartCard
      chartData={chartData}
      tooltipLabel='Number of rows added, changed, or removed during sync runs'
      cardTitle='Rows processed'
      tooltipPosition='top-end'
    />
  );
};

export default RowsProcessed;
