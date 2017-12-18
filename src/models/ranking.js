import { routerRedux } from 'dva/router';
import Cookies from 'js-cookie';
import { rankingAjax } from '../api/index.js';
import { notification, message } from 'antd';

import md5 from '../lib/md5.js';

export default {
  namespace: 'ranking',
  state: {
    list: [
      {
        title: '分享排行榜',
        arr: []
      },
      {
        title: '粉丝排行榜',
        arr: []
      },
      {
        title: '关注排行榜',
        arr: []
      },
      {
        title: '好友排行榜',
        arr: []
      }
    ]
  },
  effects: {
    *getData({}, { call, put, select }) {
      let {pageConfig} = yield select(state => state.ranking);
      const result = yield call(rankingAjax);
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
    setDataList(state, { data }) {
      state.list[0].arr = data.postList;
      state.list[1].arr = data.followsList;
      state.list[2].arr = data.followingList;
      state.list[3].arr = data.friendList;
      return {
        ...state,
        list: [...state.list]
      };
    }
  },
};
