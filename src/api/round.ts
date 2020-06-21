import request from '../utils/request';

export async function addRound(params: object = {}) {
  return await request({
    url: '/addRound',
    method: 'post',
    data: {
      ...params
    }
  });
}

export async function getRounds(params: object = {}) {
  return await request({
    url: '/rounds',
    method: 'post',
    data: {
      ...params
    }
  });
}

export async function getRankList(params: object = {}) {
  return await request({
    url: '/ranklist',
    method: 'post',
    data: {
      ...params
    }
  });
}