import Cookies from 'js-cookie';
import { followersAjax } from '../api/index.js';
import { notification, message } from 'antd';

export default {
  namespace: 'followers',
  state: {
    list: []
  },
  effects: {
    *getData ({}, { call, put, select }) {
      const result = yield call(followersAjax);
      if (result.code === 200) {
        yield put({
          type: 'setDataList',
          data: result.data
        });
      } else {
        message.error(result.message);
      }
    }
  },
  reducers: {
    setDataList (state, { data }) {
      let arr = [];
      data.list.map((item, index) => {
        item.key = index;
        arr.push(item);
      });
      return {
        ...state,
        list: [...arr]
      };
    }
  },
};
