import { routerRedux } from 'dva/router';

import { getGalleryAjax } from '../api/index.js';
import { notification, message } from 'antd';

import md5 from '../lib/md5.js';

export default {
  namespace: 'gallery',
  state: {
    list: []
  },
  effects: {
    *getData({}, { call, put, select }) {
      const result = yield call(getGalleryAjax);
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
