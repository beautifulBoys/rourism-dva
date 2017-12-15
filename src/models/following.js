import Cookies from 'js-cookie';
import { myFollowingAjax, addFriendAjax, sendWebMailAjax, deleteFollowingAjax } from '../api/index.js';
import { notification, message } from 'antd';

export default {
  namespace: 'following',
  state: {
    list: []
  },
  effects: {
    *getData ({}, { call, put, select }) {
      const result = yield call(myFollowingAjax);
      if (result.code === 200) {
        yield put({
          type: 'setDataList',
          data: result.data
        });
      } else {
        message.error(result.message);
      }
    },
    *addfriendEvent ({data}, { call, put, select }) {
      const result = yield call(addFriendAjax, data);
      if (data.cbb) data.cbb();
      if (result.code === 200) {
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    },
    *webmailEvent ({data}, { call, put, select }) {
      const result = yield call(sendWebMailAjax, data);
      if (data.cbb) data.cbb();
      if (result.code === 200) {
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    },
    *deleteFollowingEvent ({data}, { call, put, select }) {
      const result = yield call(deleteFollowingAjax, data);
      if (result.code === 200) {
        message.success(result.message);
        yield put({
          type: 'setDataList',
          data: result.data
        });
      } else {
        message.warning(result.message);
      }
    },
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
