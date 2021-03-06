import { getUserInfoAjax } from '../api/index.js';
import { message } from 'antd';
import Cookie from 'js-cookie';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'global',

  state: {
    loginStatus: false,
    userInfo: {
      userId: '',
      username: '',
      avatar: 'https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/tourism-circle/avatar.png'
    },
    img_scanShow: false,
    img_scanSrc: ''
  },
  effects: {
    *getUserInfo({id}, {put, select, call}) {
      const result = yield call(getUserInfoAjax, {userId: id});
      if (result.code === 200) {
        yield put({
          type: 'setUserInfo',
          data: result.data
        });
      } else {
        message.error('获取用户信息失败');
      }
    }
  },
  reducers: {
    openImgScan (state, { src }) {
      return {
        ...state,
        img_scanShow: true,
        img_scanSrc: src
      };
    },
    closeImgScan (state, {}) {
      return {
        ...state,
        img_scanShow: false
      };
    },
    setUserInfo (state, {data}) {
      return {
        ...state,
        userInfo: {
          username: data.username,
          userId: data.userId,
          avatar: data.avatar
        }
      };
    }
  },
  subscriptions: {
  }
};
