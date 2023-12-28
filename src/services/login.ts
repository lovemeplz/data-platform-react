/*
 * @Descripttion:
 * @Version: v0.1.0
 * @Author: shenziqiang
 * @Date: 2023-09-12 16:46:14
 * @LastEditors: shenziqiang
 * @LastEditTime: 2023-10-25 16:37:00
 */
// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>('/api/login/captcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
