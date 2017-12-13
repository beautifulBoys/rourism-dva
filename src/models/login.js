import { routerRedux } from 'dva/router';
import Cookies from 'js-cookie';
import { loginAjax } from '../api/index.js';
import { notification } from 'antd';

import md5 from '../lib/md5.js';

export default {
  namespace: 'login',
  state: {
  },
  effects: {
    *loginEvent({ value }, { call, put }) {
      const result = yield call(loginAjax, {
        username: value.username,
        password: md5(value.password)
      });
      if (result.code === 200) {
        Cookies.set('passport', result.data.passport, { expires: 1 });
        Cookies.set('userId', result.data.userId, { expires: 1 });
        Cookies.set('username', result.data.username, { expires: 1 });
        window.ajaxFunc.setHeader('passport', result.data.passport);
        window.ajaxFunc.setHeader('userId', result.data.userId);
        window.loginStatus = true;
        yield put(routerRedux.push('/newest'));
        notification.success({
          message: '登陆成功',
          description: result.message,
        });
      } else {
        console.log(result.message);
      }
    }
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        status: true
      };
    }
  },
};
