import {request} from 'umi';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrentUser(): Promise<API.CurrentUser> {
  const user = await request('/api/users/current_user');
  return {
    id: user.id,
    avatar: user.ext.pictureUrl,
    name: user.username,
    permissions: user.permissions,
  } as API.CurrentUser;
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}

// export const queryRoles = async (params: any) => request(`/api/cp/roles?${stringify(params, {indices: false})}`);
export const queryRoles = async (params?: any) => request('/api/cp/roles', {params});
export const queryRole = async (id: number) => request(`/api/cp/roles/${id}`);
export const createRole = async (data: any) => request('/api/cp/roles', {method: 'POST', data});
export const updateRole = async (data: any) => request(`/api/cp/roles?_method=put`, {method: 'POST', data});
export const updateRoleOrder = async (data: number[]) => request(`/api/cp/roles/order?_method=put`, {method: 'POST', data});
export const deleteRole = async (data: number[]) => request('/api/cp/roles?_method=delete', {method: 'POST', data});

export const queryGroups = async (params?: any) => request('/api/cp/groups', {params});
export const queryGroup = async (id: number) => request(`/api/cp/groups/${id}`);
export const createGroup = async (data: any) => request('/api/cp/groups', {method: 'POST', data});
export const updateGroup = async (data: any) => request(`/api/cp/groups?_method=put`, {method: 'POST', data});
export const updateGroupOrder = async (data: number[]) => request(`/api/cp/groups/order?_method=put`, {method: 'POST', data});
export const deleteGroup = async (data: number[]) => request('/api/cp/groups?_method=delete', {method: 'POST', data});

export const queryUsers = async (params: any) => request(`/api/cp/users`, {params});
export const queryUser = async (id: number) => request(`/api/cp/users/${id}`);
export const createUser = async (data: any) => request('/api/cp/users', {method: 'POST', data});
export const updateUser = async (data: any) => request(`/api/cp/users?_method=put`, {method: 'POST', data});
export const deleteUser = async (ids: number[]) => request('/api/cp/users?_method=delete', {method: 'POST', data: ids});
export const usernameValidation = async (username?: string) => request('/api/cp/users/username-validation', {params: {username}});
export const emailValidation = async (email?: string) => request('/api/cp/users/email-validation', {params: {email}});
export const mobileValidation = async (mobile: any) => request('/api/cp/users/mobile-validation', {params: {mobile}});
