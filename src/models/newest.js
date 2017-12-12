import { routerRedux } from 'dva/router';
import Cookies from 'js-cookie';
import { postAjax } from '../api/index.js';
import { notification, message } from 'antd';

import md5 from '../lib/md5.js';

export default {
  namespace: 'newest',
  state: {
    status: false,
    list: []
  },
  effects: {
    *getData({ data }, { call, put }) {
      const result = yield call(postAjax, data);
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
        list
      };
    }
  },
};
