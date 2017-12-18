import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Button, Input } from 'antd';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import styles from './space.less';

class space extends React.PureComponent {
  componentDidMount() {
    this.loadMoreEvent();
  }
  loadMoreEvent () {
    this.props.dispatch({
      type: 'space/getData'
    });
  }
  render() {
    const {list, loadmoreButtonStatus, loadmoreButtonShow} = this.props;
    return (
      <div className={styles.space}>
        <h1>私人空间</h1>
        <div className={styles['content-box']}>
          <div className={styles.left}>
            权限功能完善后，此入口将只对管理员和超级管理员开放，普通用户无此权限。
          </div>
          <div className={styles.rignt}></div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
}))(space);
