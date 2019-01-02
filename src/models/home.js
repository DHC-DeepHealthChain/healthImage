import modelExtend from 'dva-model-extend';
import { message } from 'antd';
import { pageModel } from './common';
import { uploadImage, getList, getBase64 } from '../services/blockChain';

export default modelExtend(pageModel, {
  namespace: 'home',

  state: {
    loading: false,
    submit: false,
    imageLoading: false,
    base64: '',
  },

  effects: {
    *queryList({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      if (response.error === false) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: response.result.list,
            pagination: response.result.pagination,
          },
        });
      } else {
        throw response;
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *getImage({ payload }, { call, put }) {
      const response = yield call(getBase64, payload);
      yield put({
        type: 'changeImageLoading',
        payload: true,
      });
      if (response.error === false) {
        yield put({
          type: 'updateState',
          payload: {
            base64: `data:image/jpeg;base64,${response.result}`,
          },
        });
      } else {
        throw response;
      }
      yield put({
        type: 'changeImageLoading',
        payload: false,
      });
    },
    *uploadInfo({ payload }, { call, put }) {
      const response = yield call(uploadImage, payload);
      yield put({
        type: 'changeSubmitLoading',
        payload: true,
      });
      if (response.error === false) {
        message.success('上传成功');
      } else {
        throw response;
      }
      yield put({
        type: 'changeSubmitLoading',
        payload: false,
      });
      return response;
    },
  },

  reducers: {
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeSubmitLoading(state, action) {
      return {
        ...state,
        submit: action.payload,
      };
    },
    changeImageLoading(state, action) {
      return {
        ...state,
        imageLoading: action.payload,
      };
    },
  },
});
