import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Button, Input, Row, Col } from 'antd';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import styles from './api.less';

class api extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      info: {}
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'api/getData'
    });
  }

  render() {
    const {list} = this.props;
    return (
      <div className={styles.api}>
        <h1>接口统计</h1>
        <div className={styles['content-box']}>
          {
            list.map((item, index) => (
              <div className={styles.item} key={index}>
                <div className={styles.title}>{item.text}</div>
                <div className={styles.number}>
                  <span>{item.value}</span><span className={styles.second}>次</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  list: state.api.list
}))(api);
