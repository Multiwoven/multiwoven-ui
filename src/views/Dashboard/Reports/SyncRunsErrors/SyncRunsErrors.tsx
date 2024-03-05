import moment from 'moment';
import { ChartCard } from '@/views/Dashboard/Reports/ChartCard';
import { ReportObject } from '@/services/dashboard';

type SyncRunsErrorsProps = {
  syncRunTriggeredData: ReportObject[];
};

const SyncRunsErrors = ({ syncRunTriggeredData }: SyncRunsErrorsProps): JSX.Element => {
  const chartData = {
    labels: syncRunTriggeredData.map((run) => moment(run.time_slice).format('ddd hh:mm')),
    datasets: [
      {
        label: 'Failed',
        data: syncRunTriggeredData.map((run) => run.failed_count),
        backgroundColor: '#F45757',
      },
    ],
  };
  return (
    <ChartCard
      chartData={chartData}
      tooltipLabel='Number of sync runs that encountered fatal or row-level errors'
      cardTitle='Sync runs with errors'
      chartEmptyText='No sync runs with errors'
    />
  );
};

export default SyncRunsErrors;
