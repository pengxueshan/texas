import axios from 'axios';

let url = '/api';

export async function request(options) {
  return await axios({
    ...options,
    url: `${url}${options.url}`
  });
}