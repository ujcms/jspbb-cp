// src/access.ts
import { getAllPerms, getPermsTreeData } from '@/utils/perms';

export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  const allPerms = {};
  getAllPerms(getPermsTreeData()).forEach((item: string) => {
    // ID 为 1 的是超级管理员，拥有所有权限。
    allPerms[item] = currentUser?.id === 1;
  });
  const perms = {};
  currentUser?.permissions?.forEach((item: string) => {
    perms[item] = true;
  });
  return {
    canAdmin: true,
    ...allPerms,
    ...perms,
  };
}
