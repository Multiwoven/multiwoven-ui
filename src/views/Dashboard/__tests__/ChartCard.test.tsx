import { render } from '@testing-library/react';
import { ChartCard } from '@/views/Dashboard/Reports/ChartCard';
import { ChartDataType } from '../types';

describe('ChartCard', () => {
  const mockData: ChartDataType = {
    xData: [
      { total_count: 30, success_count: 20, failed_count: 10, time_slice: '2022-01-01T00:00:00Z' },
      { total_count: 30, success_count: 20, failed_count: 10, time_slice: '2022-01-01T00:00:00Z' },
    ],
    yDataPoints: ['total_count'],
    xDataPoints: ['time_slice'],
    yLabels: { success_count: 'Label 1', failed_count: 'Label 2' },
    yData: [
      { total_count: 30, success_count: 20, failed_count: 10, time_slice: '2022-01-01T00:00:00Z' },
      { total_count: 30, success_count: 20, failed_count: 10, time_slice: '2022-01-01T00:00:00Z' },
    ],
    backgroundColors: { success_count: 'red', failed_count: 'blue' },
  };

  it('renders chart card with correct data', () => {
    const { getByText } = render(
      <ChartCard
        data={mockData}
        tooltipLabel='Tooltip Label'
        cardTitle='Card Title'
        tooltipPosition='top'
        chartEmptyText='No Data found'
      />,
    );

    expect(getByText('Card Title'));
  });

  // it('renders chart with correct data points', () => {
  //   const { getByText } = render(
  //     <ChartCard
  //       data={mockData}
  //       tooltipLabel='Tooltip Label'
  //       cardTitle='Card Title'
  //       tooltipPosition='top'
  //       chartEmptyText='No Data found'
  //     />,
  //   );

  //   expect(getByText('10'));
  //   expect(getByText('20'));
  //   expect(getByText('30'));
  //   expect(getByText('40'));
  // });

  // it('renders chart with correct background colors', () => {
  //   const { container } = render(
  //     <ChartCard
  //       data={mockData}
  //       tooltipLabel='Tooltip Label'
  //       cardTitle='Card Title'
  //       tooltipPosition='top'
  //       chartEmptyText='No Data found'
  //     />,
  //   );

  //   const chartBars = container.querySelectorAll('.chart-bar');
  //   expect(chartBars[0]);
  //   expect(chartBars[1]);
  // });

  // Add more tests as needed
});
