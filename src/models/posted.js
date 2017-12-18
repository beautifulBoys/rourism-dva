import { routerRedux } from 'dva/router';
import Cookies from 'js-cookie';
import { postAjax } from '../api/index.js';
import { notification, message } from 'antd';

import md5 from '../lib/md5.js';

export default {
  namespace: 'posted',
  state: {
    status: false,
    list: [],
    loadmoreButtonShow: true,
    loadmoreButtonStatus: false,
    pageConfig: {
      page: 0,
      num: 10
    }
  },
  effects: {
    *getData({}, { call, put, select }) {
      let {pageConfig} = yield select(state => state.posted);
      yield put({
        type: 'changeLoadMoreStatus',
        status: true
      });
      const result = yield call(postAjax, {
        type: 'posted',
        ...pageConfig
      });
      yield put({
        type: 'changeLoadMoreStatus',
        status: false
      });
      if (result.code === 200) {
        yield put({
          type: 'setDataList',
          list: result.data.list
        });
        if (result.data.list.length < pageConfig.num) {
          yield put({
            type: 'changeLoadMoreShow',
            status: false
          });
        } else {
          yield put({
            type: 'changePage',
            num: pageConfig.page + 1
          });
        }
      } else {
        message.error(result.message);
      }
    }
  },
  reducers: {
    setDataList(state, { list }) {
      return {
        ...state,
        list: [...state.list, ...list]
      };
    },
    changePage (state, {num}) {
      return {
        ...state,
        pageConfig: {
          ...state.pageConfig,
          page: num
        }
      };
    },
    changeLoadMoreShow (state, {status}) {
      return {
        ...state,
        loadmoreButtonShow: status
      };
    },
    changeLoadMoreStatus (state, {status}) {
      return {
        ...state,
        loadmoreButtonStatus: status
      };
    }
  },
};
