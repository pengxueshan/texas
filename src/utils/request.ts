import axios from 'axios';

let baseUrl: string = 'http://127.0.0.1:7001/';

export default async function request(req: object) {
  let ret = await axios({
    baseURL: baseUrl,
    ...req,
  });
  const { status, data } = ret;
  if (status === 200) {
    return data.data;
  }
}
