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
    }
  },
  effects: {
    *getUserInfo ({ id }, { call, put }) {
      let result = yield call(getUserInfoAjax, {userId: id});
      if (result.code === 200) {
        yield put({
          type: 'setUserInfo',
          data: result.data
        });
      } else message.error(result.message);
    }
  },
  reducers: {
    setUserInfo (state, { data }) {
      console.log(data.username, data.avatar, data.userId);
      return {
        ...state,
        loginStatus: true,
        userInfo: {
          userId: data.userId,
          username: data.username,
          avatar: data.avatar
        }
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (!Cookie.get('passport') || !Cookie.get('userId') || !Cookie.get('username')) {
          Cookie.remove('userId');
          Cookie.remove('username');
          Cookie.remove('passport');
          window.loginStatus = false;
          if (pathname !== '/login') dispatch(routerRedux.push('/login'));
        }
      });
    }
  }
};
