import request from '../utils/request';

export async function login(params: object = {}) {
  return await request({
    url: '/login',
    method: 'post',
    data: {
      ...params
    }
  });
}