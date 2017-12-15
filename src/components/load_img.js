import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import {Button, Menu, Dropdown} from 'antd';
import styles from './load_img.less';
import zhanweiData from './zhanwei.js';

class LoadImg extends React.PureComponent {
  componentDidMount() {
    let newImg = new Image();
    newImg.src = this.props.src;
    newImg.setAttribute('class', 'img-lixin');
    newImg.onload = () => {
      let child = this.refs.img;
      if (!child) return;
      let parent = child.parentNode;
      parent.replaceChild(newImg, child);
    };
  }
  render() {
    const avatar = zhanweiData;

    return (
        <img src={avatar} ref="img" className={styles['img-lixin']}/>
    );
  }
}

export default connect(state => ({
}))(LoadImg);
