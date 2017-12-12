import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Button, Input } from 'antd';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import {postAjax} from '../../api/index.js';
import styles from './newest.less';
import Dynamic from '../../components/dynamic.js';

class Newest extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'newest/getData',
      data: {
        type: 'newest',
        page: 0,
        num: 10
      }
    });
  }

  render() {
    const {list} = this.props;
    return (
      <div className={styles.newest}>
        <h1>最新动态</h1>
        <div className={styles['content-box']}>
          <div className={styles.left}>
            <ul className={styles.ul}>
              <li className={styles.li}>
              {
                list.map((item, index) => <Dynamic key={index} listItem={item} />)
              }
              </li>
              <Button type="primary" className={styles.loadMore}>点击加载更多</Button>
            </ul>
          </div>
          <div className={styles.rignt}></div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  list: state.newest.list
}))(Newest);
