import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Button, Input, Row, Col } from 'antd';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import styles from './api.less';

class api extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'api/getData'
    });
  }

  render() {
    const {info} = this.props;
    console.log(info);
    return (
      <div className={styles.api}>
        <h1>接口统计</h1>
        <div className={styles['content-box']}>
          {
            for (let key in info) {
              (
                <div className={styles.item}>
                  <div className={styles.title}>{item.text}</div>
                  <div className={styles.number}>
                    <span>{item.value}</span><span className={styles.second}>次</span>
                  </div>
                </div>
              )
            }
          }
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  info: state.api.info
}))(api);
