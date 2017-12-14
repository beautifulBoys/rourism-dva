import Cookies from 'js-cookie';
import { allfriendAjax, addFriendAjax, sendWebMailAjax } from '../api/index.js';
import { notification, message } from 'antd';

export default {
  namespace: 'allfriend',
  state: {
    list: [],
    pageConfig: {
      page: 0,
      num: 10,
      total: 0
    }
  },
  effects: {
    *getData({page}, { call, put, select }) {
      let {pageConfig} = yield select(state => state.allfriend);
      if (page) pageConfig.page = page - 1;
      const result = yield call(allfriendAjax, pageConfig);
      if (result.code === 200) {
        yield put({
          type: 'setDataList',
          data: result.data
        });
      } else {
        message.error(result.message);
      }
    },
    *addfriendEvent({data}, { call, put, select }) {
      const result = yield call(addFriendAjax, data);
      if (data.cbb) data.cbb();
      if (result.code === 200) {
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    },
    *webmailEvent({data}, { call, put, select }) {
      const result = yield call(sendWebMailAjax, data);
      if (data.cbb) data.cbb();
      if (result.code === 200) {
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    },
    *followingEvent({data}, { call, put, select }) {
      const result = yield call(sendWebMailAjax, data);
      if (result.code === 200) {
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    },
  },
  reducers: {
    setDataList(state, { data }) {
      let arr = [];
      data.list.map((item, index) => {
        item.key = index;
        arr.push(item);
      });
      return {
        ...state,
        list: [...arr],
        pageConfig: {
          ...state.pageConfig,
          total: data.total
        }
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
    }
  },
};
