import { multiwovenFetch } from './common';

export type ReportObject = {
  time_slice: string;
  total_count: number;
  failed_count: number;
  success_count: number;
};

export type Report = {
  data: {
    sync_run_triggered: Array<ReportObject>;
    total_sync_run_rows: Array<ReportObject>;
  };
};

type ReportOptions = {
  metric?: 'sync_run_triggered' | 'total_sync_run_rows' | 'all';
  connector_ids?: Array<number>;
  time_period?: 'one_week' | 'one_day';
};

const defaultOptions: ReportOptions = {
  metric: 'all',
  time_period: 'one_week',
};

export const getReport = async (options: ReportOptions = defaultOptions): Promise<Report> =>
  multiwovenFetch<null, Report>({
    method: 'get',
    url: `/reports?type=workspace_activity&metric=${options.metric}&time_period=${options.time_period}`,
  });
