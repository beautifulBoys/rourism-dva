
import { getGalleryAjax } from '../api/index.js';
import { notification, message } from 'antd';

export default {
  namespace: 'choice_img',
  state: {
    list: []
  },
  effects: {
    *getGallery ({}, { call, put, select }) {
      let result = yield call(getGalleryAjax);
      if (result.code === 200) {
        yield put({
          type: 'setGalleryData',
          list: result.data.list
        });
      } else {
        message.error(result.message);
      }
    }
  },
  reducers: {
    setDataList (state, { data }) {
      return {
        ...state,
        list: [...arr]
      };
    }
  },
};
