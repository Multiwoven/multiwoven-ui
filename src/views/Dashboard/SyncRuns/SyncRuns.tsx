import moment from 'moment';
import { ChartCard } from '../ChartCard';
import { ReportObject } from '@/services/dashboard';

type SyncRunsProps = {
  syncRunTriggeredData: ReportObject[];
};

const SyncRuns = ({ syncRunTriggeredData }: SyncRunsProps): JSX.Element => {
  const chartData = {
    labels: syncRunTriggeredData.map((run) => moment(run.time_slice).format('ddd hh:mm')),
    datasets: [
      {
        label: 'Failed',
        data: syncRunTriggeredData.map((run) => run.failed_count),
        backgroundColor: '#F45757',
      },
      {
        label: 'Success',
        data: syncRunTriggeredData.map((run) => run.success_count),
        backgroundColor: '#33C0A7',
      },
    ],
  };
  return (
    <ChartCard
      chartData={chartData}
      tooltipLabel='Number of sync runs triggered manually or via recurring schedule'
      cardTitle='Sync runs'
    />
  );
};

export default SyncRuns;
