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
export const toFollowAjax = data => ajax1.post('/toFollow', data);

export const myFriendAjax = data => ajax1.post('/myFriend', data);
export const myFollowingAjax = data => ajax1.post('/myFollowing', data);
export const followersAjax = data => ajax1.post('/follows', data);
export const deleteFriendAjax = data => ajax1.post('/deleteFriend', data);
export const deleteFollowingAjax = data => ajax1.post('/deleteFollowing', data);

export const getCityDataAjax = data => ajax1.post('/getCityData', data);

export const getGalleryAjax = data => ajax1.post('/gallery', data);
export const postingAjax = data => ajax1.post('/posting', data);

export const myPostedAjax = data => ajax1.post('/myPosted', data);
export const changeMinePostStatusAjax = data => ajax1.post('/changeMinePostStatus', data);

export const myStarAjax = data => ajax1.post('/myStar', data);
export const myCommentsAjax = data => ajax1.post('/myComments', data);
export const rankingAjax = data => ajax1.post('/ranking', data);
