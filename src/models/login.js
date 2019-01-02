import { routerRedux } from 'dva/router';
import { login } from '../services/user';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          ...response,
          currentAuthority: 'admin',
        },
      });
      // Login successfully
      if (response.error === false) {
        const {
          result: { token, address, mobileNumber, userId },
        } = response;
        localStorage.user = mobileNumber;
        localStorage.jwt = token;
        localStorage.address = address;
        localStorage.userId = userId;
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      } else {
        throw response;
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        localStorage.removeItem('jwt');
        localStorage.removeItem('address');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: true,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.error,
      };
    },
  },
};
