import Cookies from 'js-cookie';
import { postingAjax, getGalleryAjax, getCityDataAjax } from '../api/index.js';
import { notification, message } from 'antd';

export default {
  namespace: 'posting',
  state: {
    list: [],
    cityData: [],
    urls: []
  },
  effects: {
    *getData ({}, { call, put, select }) {
      const result = yield call(postingAjax);
      if (result.code === 200) {
        yield put({
          type: 'setDataList',
          data: result.data
        });
      } else {
        message.error(result.message);
      }
    },
    *getCityData ({}, { call, put, select }) {
      const result = yield call(getCityDataAjax);
      if (result.code === 200) {
        yield put({
          type: 'setCityData',
          data: result.data
        });
      } else {
        message.error(result.message);
      }
    },
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
      let arr = [];
      data.list.map((item, index) => {
        item.key = index;
        arr.push(item);
      });
      return {
        ...state,
        list: [...arr]
      };
    },
    setCityData (state, { data }) {
      return {
        ...state,
        cityData: [...data]
      };
    },
    setGalleryData (state, { list }) {
      return {
        ...state,
        urls: [...list]
      };
    }
  },
};
