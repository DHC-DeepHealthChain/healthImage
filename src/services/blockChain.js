import { stringify } from 'qs';
import request from '../utils/request';
import { api } from '../utils/config';

const { ipfs } = api;

export async function uploadImage(param) {
  return request(`${ipfs}/media`, {
    method: 'POST',
    body: {
      ...param,
    },
  });
}

export async function getList(param) {
  const user = localStorage.getItem('user');
  if (user === '18502198583') {
    return request(`${ipfs}/allList?${stringify(param)}`);
  } else {
    return request(`${ipfs}?${stringify(param)}`);
  }
}

export async function getBase64(param) {
  return request(`${ipfs}/getImg/${param.hash}`);
}
