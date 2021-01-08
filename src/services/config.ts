// import request from 'umi-request';
import { request } from 'umi';
// import {stringify} from 'qs';

export const queryBase = async () => request('/api/cp/config/base');
export const updateBase = async (data: any) =>
  request('/api/cp/config/base?_method=put', { method: 'POST', data });
export const queryTemplateDirs = async () => request('/api/cp/config/template-dirs');

export const querySignUp = async () => request('/api/cp/config/sign-up');
export const updateSignUp = async (data: any) =>
  request('/api/cp/config/sign-up?_method=put', { method: 'POST', data });

export const queryEmail = async () => request('/api/cp/config/email');
export const updateEmail = async (data: any) =>
  request('/api/cp/config/email?_method=put', { method: 'POST', data });
export const sendEmail = async (data: any) =>
  request('/api/cp/config/send-email', { method: 'POST', data });

export const queryUpload = async () => request('/api/cp/config/upload');
export const updateUpload = async (data: any) =>
  request('/api/cp/config/upload?_method=put', { method: 'POST', data });

export const queryWatermark = async () => request('/api/cp/config/watermark');
export const updateWatermark = async (data: any) =>
  request('/api/cp/config/watermark?_method=put', { method: 'POST', data });

export const queryRestrict = async () => request('/api/cp/config/restrict');
export const updateRestrict = async (data: any) =>
  request('/api/cp/config/restrict?_method=put', { method: 'POST', data });

export const querySensitiveWords = async () => request('/api/cp/config/sensitive-words');
export const updateSensitiveWords = async (data: any) =>
  request('/api/cp/config/sensitive-words?_method=put', { method: 'POST', data });

export const querySensitiveStopWords = async () => request('/api/cp/config/sensitive-stop-words');
export const updateSensitiveStopWords = async (data: any) =>
  request('/api/cp/config/sensitive-stop-words?_method=put', { method: 'POST', data });
