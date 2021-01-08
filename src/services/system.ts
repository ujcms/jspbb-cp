import { request } from 'umi';

export const querySmsList = async (params?: any) => request('/api/cp/sms', { params });
export const querySms = async (id: number) => request(`/api/cp/sms/${id}`);
export const deleteSms = async (data: number[]) =>
  request('/api/cp/sms?_method=delete', { method: 'POST', data });

export const queryAccessList = async (params?: any) => request('/api/cp/access', { params });
export const queryAccess = async (id: number) => request(`/api/cp/access/${id}`);
export const deleteAccess = async (data: number[]) =>
  request('/api/cp/access?_method=delete', { method: 'POST', data });
