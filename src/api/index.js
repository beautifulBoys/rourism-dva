import { stringify } from 'qs';
import {ajax1} from './axios.js';

export const loginAjax = data => ajax1.post('/login', data);
export const getUserInfoAjax = data => ajax1.post('/getUserInfo', data);
export const postAjax = data => ajax1.get('/post', data);
export const pinglunAjax = data => ajax1.post('/pinglun', data);
export const starAjax = data => ajax1.post('/star', data);
export const allfriendAjax = data => ajax1.post('/allUser', data);
export const addFriendAjax = data => ajax1.post('/addFriend', data);
export const sendWebMailAjax = data => ajax1.post('/sendWebMail', data);
