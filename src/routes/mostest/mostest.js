import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Button, Input } from 'antd';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import {postAjax} from '../../api/index.js';
import styles from './mostest.less';
import Dynamic from '../../components/dynamic.js';

class mostest extends React.PureComponent {
  componentDidMount() {
    this.loadMoreEvent();
  }
  loadMoreEvent () {
    this.props.dispatch({
      type: 'mostest/getData'
    });
  }
  render() {
    const {list, loadmoreButtonStatus, loadmoreButtonShow} = this.props;
    return (
      <div className={styles.mostest}>
        <h1>最多评论</h1>
        <div className={styles['content-box']}>
          <div className={styles.left}>
            <ul className={styles.ul}>
              {
                list.map((item, index) => (
                  <li className={styles.li} key={index}>
                    <Dynamic key={index} listItem={item}/>
                  </li>
                ))
              }
              {
                !loadmoreButtonShow || <Button type="primary" loading={loadmoreButtonStatus} onClick={this.loadMoreEvent.bind(this)} className={styles.loadMore}>点击加载更多</Button>
              }
            </ul>
          </div>
          <div className={styles.rignt}></div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  list: state.mostest.list,
  loadmoreButtonShow: state.mostest.loadmoreButtonShow,
  loadmoreButtonStatus: state.mostest.loadmoreButtonStatus
}))(mostest);
