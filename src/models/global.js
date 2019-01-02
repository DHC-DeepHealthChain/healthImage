import { routerRedux } from 'dva/router';
import config from '../utils/config';
import { authorization } from '../services/user';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
  },

  effects: {
    *query(_, { call, put }) {
      const data = yield call(authorization);
      if (data.error === true) {
        if (
          config.openPages &&
          !config.openPages.some(ele => location.href.includes(ele))
        ) {
          yield put(routerRedux.push('/user/login'));
        }
      }
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },

  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     // Subscribe history(url) change, trigger `load` action if pathname is `/`
  //     return history.listen(() => {
  //       dispatch({
  //         type: 'query',
  //       });
  //     });
  //   },
  // },
};
