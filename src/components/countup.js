import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import {Button, Menu, Dropdown} from 'antd';
import styles from './countup.less';

class countup extends React.PureComponent {
  componentDidMount() {

  }
  render() {

    return (
        <img src={avatar} ref="img" className={styles['img-lixin']}/>
    );
  }
}

export default connect(state => ({
}))(countup);
