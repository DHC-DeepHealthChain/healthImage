// import { fakeRegister } from '../services/api';
import { register } from '../services/user';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(register, payload);
      if (response.error === false) {
        yield put({
          type: 'registerHandle',
          payload: response,
        });
      } else {
        throw response;
      }
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('admin');
      reloadAuthorized();
      return {
        ...state,
        status: payload.error,
      };
    },
  },
};
