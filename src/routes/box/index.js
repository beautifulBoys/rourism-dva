import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import {Button} from 'antd';
import Cookies from 'js-cookie';
import Submenu from './submenu.js';
import Header from './header.js';
import Newest from '../newest/newest.js';
import Hotest from '../hotest/hotest.js';
import Mostest from '../mostest/mostest.js';
import Allfriend from '../allfriend/allfriend.js';
import Friend from '../friend/friend.js';
import Followers from '../followers/followers.js';
import Following from '../following/following.js';
import Posting from '../posting/posting.js';

import ImgScan from '../../components/box/img_scan.js';
import styles from './index.less';

class BasicLayout extends React.PureComponent {
  componentWillMount() {
    if (window.loginStatus) {
      this.props.dispatch({
        type: 'global/getUserInfo',
        id: Cookies.get('userId')
      });
    } else this.props.dispatch(routerRedux.push('/login'));
  }
  render() {
    let {status} = this.props;
    return (
      <div className={styles.box}>
        <div className={styles.left}>
          <div className={styles.logo}></div>
          <Submenu/>
        </div>
        <div className={styles.right}>
          <Header />
          <div className={styles['view-main']}>
            <Switch>
              <Route exact path="/newest" render={props => <Newest />} />
              <Route exact path="/hotest" render={props => <Hotest />} />
              <Route exact path="/mostest" render={props => <Mostest />} />
              <Route exact path="/allfriend" render={props => <Allfriend />} />
              <Route exact path="/friend" render={props => <Friend />} />
              <Route exact path="/followers" render={props => <Followers />} />
              <Route exact path="/following" render={props => <Following />} />
              <Route exact path="/posting" render={props => <Posting />} />
            </Switch>
          </div>
        </div>
        <ImgScan />
      </div>
    );
  }
}

export default connect(state => ({
  status: state.login.status
}))(BasicLayout);
