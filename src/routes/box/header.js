import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Link, Route, Redirect, Switch } from 'dva/router';
import { Badge, Button, Dropdown, SubMenu, Menu, Icon } from 'antd';
import Submenu from './submenu.js';
import styles from './header.less';

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const dropmenu = (
      <Menu onClick={(a) => {console.log(a);}}>
        <Menu.Item key="personal" className={styles.li}><Icon type="setting"/>　个人设置</Menu.Item>
        <Menu.Item key="logout" className={styles.li}><Icon type="poweroff"/>　退出</Menu.Item>
      </Menu>
    );
    const { avatar } = this.props;
    return (
        <div className={styles.header}>
          <Badge count={5} className={styles.button}>
            <Button>消息盒子</Button>
          </Badge>
          <Badge count={5} className={styles.button}>
            <Button>全站聊天室</Button>
          </Badge>
          <Dropdown overlay={dropmenu} trigger={['click']} className={styles.user}>
            <img className={styles['user-img']} src={avatar}/>
          </Dropdown>
        </div>
    );
  }
}

export default connect(state => ({
  avatar: state.global.userInfo.avatar
}))(Header);
