import request from '../utils/request';
import { api } from '../utils/config';

const { userLogin, user, auth } = api;

export async function getUser(param) {
  return request(user.replace(':id', param.id));
}

export async function authorization() {
  return request(auth);
}

export async function login(param) {
  return request(userLogin, {
    method: 'POST',
    body: {
      ...param,
    },
  });
}

export async function register(param) {
  return request(user.replace('/:id', ''), {
    method: 'POST',
    body: {
      ...param,
    },
  });
}
