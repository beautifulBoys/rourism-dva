import { stringify } from 'qs';
import {ajax1} from './axios.js';

export const loginAjax = data => ajax1.post('/login', data);
export const getUserInfoAjax = data => ajax1.post('/getUserInfo', data);
export const postAjax = data => ajax1.get('/post', data);
