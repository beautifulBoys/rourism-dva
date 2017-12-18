
import Cookies from 'js-cookie';
import { myFriendAjax, deleteFriendAjax } from '../api/index.js';
import { notification, message } from 'antd';

export default {
  namespace: 'friend',
  state: {
    list: []
  },
  effects: {
    *getData ({}, { call, put, select }) {
      const result = yield call(myFriendAjax);
      if (result.code === 200) {
        yield put({
          type: 'setDataList',
          list: result.data.list
        });
      } else {
        message.error(result.message);
      }
    },
    *deleteFriendEvent ({data}, { call, put, select }) {
      const result = yield call(deleteFriendAjax, {id: data.id});
      if (result.code === 200) {
        if (data.cbb) data.cbb();
        message.success(result.message);
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
    setDataList (state, { list }) {
      let arr = [];
      list.map((item, index) => {
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
