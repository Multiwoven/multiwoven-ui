import moment from 'moment';
import { ChartCard } from '../ChartCard';
import { ReportObject } from '@/services/dashboard';

type RowsFailedProps = {
  rowsFailedData: ReportObject[];
};

const RowsFailed = ({ rowsFailedData }: RowsFailedProps): JSX.Element => {
  const chartData = {
    labels: rowsFailedData.map((row) => moment(row.time_slice).format('ddd hh:mm')),
    datasets: [
      {
        label: 'Failed',
        data: rowsFailedData.map((row) => row.failed_count),
        backgroundColor: '#F45757',
      },
    ],
  };
  return (
    <ChartCard
      chartData={chartData}
      tooltipLabel='Number of rows added, changed, or removed during sync runs'
      cardTitle='Rows Failed'
      tooltipPosition='top-end'
    />
  );
};

export default RowsFailed;
