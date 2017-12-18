import { routerRedux } from 'dva/router';
import Cookies from 'js-cookie';
import { rankingAjax } from '../api/index.js';
import { notification, message } from 'antd';

import md5 from '../lib/md5.js';

export default {
  namespace: 'ranking',
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
      let {pageConfig} = yield select(state => state.ranking);
      const result = yield call(rankingAjax);
      if (result.code === 200) {
        yield put({
          type: 'setDataList',
          list: result.data.list
        });
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
