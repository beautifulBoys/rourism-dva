import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import {Button, Menu, Modal, Icon } from 'antd';
import LoadImg from './load_img.js';
import styles from './choice_img.less';

export default class ChoiceImg extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      urls: []
    };
  }
  componentDidMount () {
    console.log(this.state.urls);
  }
  ok () {
    this.props.show = false;
  }
  cancel () {
    this.setState({show: false});
  }
  open () {
    this.setState({show: true});
  }
  clickEvent (item) {
    this.state.urls.filter(item => {
      item.checked = !item.checked;
    });
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
                key={index} onClick={this.clickEvent.bind(this, item)}
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
