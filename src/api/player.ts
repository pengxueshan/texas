import request from '../utils/request';

export async function getPlayers(params: object = {}) {
  return await request({
    url: '/players',
    method: 'post',
    data: {
      ...params
    }
  });
}

export async function addPlayer(params: object = {}) {
  return await request({
    url: '/addPlayer',
    method: 'post',
    data: {
      ...params
    }
  });
}