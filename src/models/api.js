import { routerRedux } from 'dva/router';
import Cookies from 'js-cookie';
import { apiAjax } from '../api/index.js';
import { notification, message } from 'antd';

import md5 from '../lib/md5.js';

export default {
  namespace: 'api',
  state: {
    info: {
      allapi: {
        text: '接口请求总数',
        path: '/allapi',
        value: 0
      },
      user: {
        text: '所有用户接口',
        path: '/allUser',
        value: 0
      },
      addFriend: {
        text: '添加好友接口',
        path: '/addFriend',
        value: 0
      },
      webMail: {
        text: '发送站内信接口',
        path: '/sendWebMail',
        value: 0
      },
      posting: {
        text: '发表分享接口',
        path: '/posting',
        value: 0
      },
      login: {
        text: '登录接口',
        path: '/login',
        value: 0
      },
      userMain: {
        text: '查看用户主页接口',
        path: '/userMainInfo',
        value: 0
      },
      toFollow: {
        text: '关注接口',
        path: '/toFollow',
        value: 0
      },
      comment: {
        text: '评论接口',
        path: '/pinglun',
        value: 0
      },
      star: {
        text: '喜欢分享接口',
        path: '/star',
        value: 0
      },
      ranking: {
        text: '排行榜接口',
        path: '/ranking',
        value: 0
      },
      myFollowing: {
        text: '我的关注接口',
        path: '/myFollowing',
        value: 0
      },
      follows: {
        text: '我的粉丝接口',
        path: '/follows',
        value: 0
      },
      myPosted: {
        text: '我的分享接口',
        path: '/myPosted',
        value: 0
      },
      myFriend: {
        text: '我的圈友接口',
        path: '/myFriend',
        value: 0
      }
    }
  },
  effects: {
    *getData({}, { call, put, select }) {
      let {pageConfig} = yield select(state => state.api);
      const result = yield call(apiAjax);
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
      let allapicount = 0;
      for (let i in data) {
        allapicount += data[i];
        for (let k in state.info) {
          if (state.info[k].path === i) state.info[k].value = result.data[i];
        }
      }
      state.info.allapi.value = allapicount;
      return {
        ...state
      };
    }
  },
};
