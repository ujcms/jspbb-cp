import {request} from 'umi';

export const queryQuestionList = async (params?: any) => request('/api/cp/questions', {params});
export const queryQuestion = async (id: number) => request(`/api/cp/questions/${id}`);
export const updateQuestion = async (data: any) => request(`/api/cp/questions?_method=put`, {method: 'POST', data});
export const deleteQuestion = async (data: number[]) => request('/api/cp/questions?_method=delete', {method: 'POST', data});

export const queryAnswerList = async (params?: any) => request('/api/cp/answers', {params});
export const queryAnswer = async (id: number) => request(`/api/cp/answers/${id}`);
export const updateAnswer = async (data: any) => request(`/api/cp/answers?_method=put`, {method: 'POST', data});
export const deleteAnswer = async (data: number[]) => request('/api/cp/answers?_method=delete', {method: 'POST', data});

export const queryCommentList = async (params?: any) => request('/api/cp/comments', {params});
export const queryComment = async (id: number) => request(`/api/cp/comments/${id}`);
export const updateComment = async (data: any) => request(`/api/cp/comments?_method=put`, {method: 'POST', data});
export const deleteComment = async (data: number[]) => request('/api/cp/comments?_method=delete', {method: 'POST', data});

