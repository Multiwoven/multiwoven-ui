import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TableItem } from '@/views/Activate/Syncs/SyncRuns/SyncRunTableItem';
import { SyncRunsResponse } from '../types';

describe('TableItem', () => {
  const mockSyncRunsData: SyncRunsResponse[] = [
    {
      id: '1',
      type: 'sync_runs',
      attributes: {
        sync_id: '1',
        status: 'success',
        source_id: '2',
        destination_id: '3',
        started_at: '2024-03-15T06:26:00.345Z',
        finished_at: '2024-03-15T06:26:07.374Z',
        created_at: '2024-03-15T06:26:00.299Z',
        updated_at: '2024-03-15T06:26:07.378Z',
        duration: 1.0,
        total_query_rows: 500,
        total_rows: 500,
        successful_rows: 500,
        failed_rows: 0,
        error: null,
      },
    },
    {
      id: '2',
      type: 'sync_runs',
      attributes: {
        sync_id: '1',
        status: 'failed',
        source_id: '2',
        destination_id: '3',
        started_at: '2024-03-15T07:26:00.345Z',
        finished_at: '2024-03-15T07:26:07.374Z',
        created_at: '2024-03-15T07:26:00.299Z',
        updated_at: '2024-03-15T07:26:07.378Z',
        duration: 1.0,
        total_query_rows: 500,
        total_rows: 500,
        successful_rows: 450,
        failed_rows: 50,
        error: null,
      },
    },
  ];

  it('should render start time correctly', () => {
    render(<TableItem field='start_time' data={mockSyncRunsData[0]} />);
    expect(screen.getByText('01/01/2020 at 05:01 am'));
  });

  it('should render duration correctly', () => {
    render(<TableItem field='duration' data={mockSyncRunsData[0]} />);
    expect(screen.getByText('1 seconds'));
  });

  it('should render rows queried correctly', () => {
    render(<TableItem field='rows_queried' data={mockSyncRunsData[0]} />);
    expect(screen.getByText('500 rows'));
  });

  it('should render status correctly for success', () => {
    render(<TableItem field='status' data={mockSyncRunsData[0]} />);
    expect(screen.getByText('Healthy'));
  });

  it('should render status correctly for failure', () => {
    render(<TableItem field='status' data={mockSyncRunsData[1]} />);
    expect(screen.getByText('Failed'));
  });

  it('should render results correctly', () => {
    render(<TableItem field='results' data={mockSyncRunsData[0]} />);
    const element = screen.getByText('500');
    const classes = element.className;
    console.log(classes);

    expect(classes.includes('css-142whxk'));
    expect(screen.getByText('500'));
    expect(screen.getByText('Successful'));
  });

  it('should render results correctly for failure', () => {
    render(<TableItem field='results' data={mockSyncRunsData[1]} />);
    const element = screen.getByText('50');
    const classes = element.className;

    expect(classes.includes('css-1q45uzp'));
    expect(screen.getByText('50'));
    expect(screen.getByText('Failed'));
  });
});
