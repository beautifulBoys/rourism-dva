import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import {Button, Menu, Dropdown, Icon } from 'antd';
import styles from './collapse.less';

class Collapse extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
  }
  componentDidMount() {

  }
  render() {
    let {num, isStared, commentList, starEvent, pinglunEvent} = this.props;

    return (
      <div className={styles.collapse}>
        <div className={styles.line}>
          <div className={styles.btn + ' ' + styles.right} onClick={() => {
            if (num) this.setState({collapse: !this.state.collapse});
            else pinglunEvent();
          }}>
            <Icon type="right" className={styles.iccon + ' ' + (this.state.collapse ? styles.rotate : '')}/>{num > 0 ? (num + ' 条') : '添加'}评论
          </div>
          <div className={styles.btn + ' ' + styles.left} onClick={() => {
            if (starEvent) starEvent();
          }}>
            {!isStared ? <Icon type="heart-o" className={styles['icon-o']}/> : <Icon type="heart" className={styles.icon}/>}
          </div>
          <div className={styles.btn + ' ' + styles.left} onClick={() => {
            if (pinglunEvent) pinglunEvent();
          }}>
            <Icon type="mail" className={styles['icon-o']} />
          </div>
        </div>
        <div className={styles.box + ' ' + (this.state.collapse ? styles.collapse : '')}>
          {commentList}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
}))(Collapse);
