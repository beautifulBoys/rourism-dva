import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import {Button, Menu, Modal, Icon, message } from 'antd';
import LoadImg from './load_img.js';
import styles from './choice_img.less';

export default class ChoiceImg extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      urls: [],
      urlsMap: {}
    };
  }
  componentDidMount () {
    console.log(this.state.urls);
  }
  ok () {
    this.props.postImg(this.getCheckImg());
    this.cancel();
  }
  cancel () {
    this.setState({show: false});
  }
  open () {
    this.setState({show: true});
  }
  getCheckImg () {
    let arr = [];
    this.props.urls.filter(item => {
      if (item.checked) arr.push(item);
      return arr;
    });
    return arr;
  }
  checkEvent (item) {

    let n = 0;
    for (let i in this.state.urlsMap) {
      if (this.state.urlsMap[i]) n++;
    }
    if (n > this.props.size || (n === this.props.size && !item.checked)) {
      message.warning(`最多只能选择 ${this.props.size} 张图片`);
      return;
    }

    this.state.urlsMap[item.id] = !this.state.urlsMap[item.id];
    this.setState({
      ...this.state,
      urlsMap: this.state.urlsMap
    });

    this.props.checkEvent(item);
  }
  render() {

    return (
      <Modal
        title="选择图片"
        width={'70%'}
        visible={this.state.show}
        onOk={this.ok.bind(this)}
        onCancel={this.cancel.bind(this)}
      >
        <div className={styles['img-box']}>
          {
            this.props.urls.map((item, index) => (
              <div className={styles['img-box-picture'] + ' ' + (item.checked ? styles.checked : '')}
                key={index} onClick={this.checkEvent.bind(this, item)}
              >
                <LoadImg key={index} src={item.url}/>
                <div className={styles.sign}></div>
                <div className={styles.text}>✔</div>
              </div>
            ))
          }
        </div>
      </Modal>
    );
  }
}
