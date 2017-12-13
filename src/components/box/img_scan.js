import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import {Button, Menu, Dropdown, Icon} from 'antd';
import styles from './img_scan.less';

class ImgScan extends React.PureComponent {
  render() {
    return (
        <div className={styles.screen + ' ' + (this.props.show ? styles.show : null)}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>图片查看器</div>
            <div className={styles.headerRight} onClick={() => {
              this.props.dispatch({
                type: 'global/closeImgScan'
              })
              setTimeout(() => {

              }, 500);
            }}>
              <Icon type="close" />
            </div>
          </div>
          <div className={styles.main}>
            <img src={this.props.src} />
          </div>
        </div>
    );
  }
}

export default connect(state => ({
  src: state.global.img_scanSrc,
  show: state.global.img_scanShow,
  zIndex: state.global.zIndex
}))(ImgScan);
