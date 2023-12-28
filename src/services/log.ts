/*
 * @Descripttion:
 * @Version: v0.1.0
 * @Author: shenziqiang
 * @Date: 2023-12-26 13:24:07
 * @LastEditors: shenziqiang
 * @LastEditTime: 2023-12-26 15:24:13
 */
import { request } from '@umijs/max';

// 查询业务日志
export async function getBizLog(params: API.PageParams) {
  const { success, data } = await request<API.BizLogList>('/api/v1/log/bizlog', {
    method: 'GET',
    params,
  });
  return {
    data: data?.list,
    total: data?.total,
    success,
  };
}

// 导出业务日志
export async function exportBizLog() {
  const { success } = await request<API.BizLogList>('/api/v1/log/bizlog/export');
  return {
    success,
  };
}
