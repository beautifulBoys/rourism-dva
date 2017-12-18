import React from 'react';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import Clipboard from 'clipboard';
import { connect } from 'dva';
import { Button, Input, message } from 'antd';
import styles from './gallery_card.less';
import LoadImg from './load_img.js';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clipboard: null
    };
  }
  componentDidMount() {
    this.setState({
      clipboard: new Clipboard(this.refs.imgUrl)
    });
  }
  watchEvent () {
    this.props.dispatch({
      type: 'global/openImgScan',
      src: this.props.data.url
    });
  }
  deleteEvent () {
    message.warning('此功能本版剔除，请去 VUE 版尝试。');
  }
  copyPathEvent () {
    this.state.clipboard.on('success', (e) => {
      message.success('复制图片地址成功');
    });
  }
  render() {
    return (
      <div className={styles.card}>
        <LoadImg src={this.props.data.url}/>
        <div className={styles.title}>{this.props.data.name || '未命名'}.{this.props.data.suff || 'jpg'}</div>
        <div className={styles['control-box']}>
          <div className={styles.btn + ' ' + styles.left} ref="imgUrl" data-clipboard-text={this.props.data.url} onClick={this.copyPathEvent.bind(this)}>复制</div>
          <div className={styles.btn + ' ' + styles.center} onClick={this.watchEvent.bind(this)}>查看</div>
          <div className={styles.btn + ' ' + styles.right} onClick={this.deleteEvent.bind(this)}>删除</div>
        </div>
      </div>
    );
  }
};

export default connect(state => ({
}))(Card);
