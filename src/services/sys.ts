/*
 * @Descripttion:
 * @Version: v0.1.0
 * @Author: shenziqiang
 * @Date: 2023-10-26 15:59:37
 * @LastEditors: shenziqiang
 * @LastEditTime: 2023-10-30 16:43:54
 */
import { request } from '@umijs/max';

// 查询角色
export async function getRole(params: API.PageParams) {
  const { success, data } = await request<API.RoleList>('/api/v1/sys/role', {
    method: 'GET',
    params,
  });
  return {
    data: data?.list,
    total: data?.total,
    success,
  };
}

// 新建角色
export async function addRole(params: API.RoleListItem) {
  return request<API.RoleListItem>('/api/v1/sys/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 更新角色
export async function updateRole(params: API.RoleListItem) {
  return request<API.RoleListItem>(`/api/v1/sys/role/${params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 删除角色  单个｜批量
export async function deleteRole(id: string) {
  return request<API.RoleListItem>(`/api/v1/sys/role/${id}`, {
    method: 'Delete',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
