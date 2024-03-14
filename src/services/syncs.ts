import {
  CreateSyncPayload,
  CreateSyncResponse,
  DiscoverResponse,
  ErrorResponse,
  SyncsConfigurationForTemplateMapping,
} from '@/views/Activate/Syncs/types';
import { multiwovenFetch } from './common';
import { ApiResponse } from '@/views/Connectors/types';

export const getCatalog = (connectorId: string): Promise<DiscoverResponse> =>
  multiwovenFetch<null, DiscoverResponse>({
    method: 'get',
    url: `/connectors/${connectorId}/discover`,
  });

export const createSync = (payload: CreateSyncPayload): Promise<ApiResponse<CreateSyncResponse>> =>
  multiwovenFetch<CreateSyncPayload, ApiResponse<CreateSyncResponse>>({
    method: 'post',
    url: '/syncs',
    data: payload,
  });

export const fetchSyncs = (): Promise<ApiResponse<CreateSyncResponse[] | ErrorResponse>> =>
  multiwovenFetch<null, ApiResponse<CreateSyncResponse[]>>({
    method: 'get',
    url: `/syncs`,
  });

export const getSyncById = (id: string): Promise<ApiResponse<CreateSyncResponse>> =>
  multiwovenFetch<null, ApiResponse<CreateSyncResponse>>({
    method: 'get',
    url: `/syncs/${id}`,
  });

export const editSync = (
  payload: CreateSyncPayload,
  id: string,
): Promise<ApiResponse<CreateSyncResponse>> =>
  multiwovenFetch<CreateSyncPayload, ApiResponse<CreateSyncResponse>>({
    method: 'put',
    url: `/syncs/${id}`,
    data: payload,
  });

export const deleteSync = (id: string): Promise<ApiResponse<CreateSyncResponse>> =>
  multiwovenFetch<null, ApiResponse<CreateSyncResponse>>({
    method: 'delete',
    url: `/syncs/${id}`,
  });

export const getSyncsConfiguration = (): Promise<SyncsConfigurationForTemplateMapping> =>
  multiwovenFetch<null, SyncsConfigurationForTemplateMapping>({
    method: 'get',
    url: `/syncs/configurations`,
  });
