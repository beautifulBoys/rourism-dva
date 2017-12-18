import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Button, Input, Row, Col } from 'antd';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import styles from './ranking.less';

class ranking extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'ranking/getData'
    });
  }

  render() {
    const {list} = this.props;
    console.log(list);
    return (
      <div className={styles.ranking}>
        <h1>排行榜</h1>
        <div className={styles['content-box']}>
          <Row gutter={30} style={{width: '100%'}}>
            {
              list.map((item, index) => (
                <Col className={styles['gutter-row']} key={index} sm={24} md={12} lg={8}>
                    <div className={styles['item-box']}>
                      <div className={styles.title}>{item.title}</div>
                      <div className={styles.content}>
                        <table cellSpacing="0" cellPadding="0">
                          <thead><tr><th className={styles['row-1']}>排名</th><th className={styles['row-2']}>ID</th><th className={styles['row-3']}>用户名</th><th className={styles['row-4']}>数据</th></tr></thead>
                          <tbody>
                            {
                              item.arr.map((item1, index1) => (
                                <tr key={index1} className={(index1 === 0 ? styles.first + ' ' : ' ') + (index1 === 1 ? styles.second + ' ' : ' ') + (index1 === 2 ? styles.third + ' ' : ' ')}>
                                  <td className={styles['row-1']}><div className={styles.index}>{index1 + 1}</div></td>
                                  <td className={styles['row-2']}>{item1.id}</td>
                                  <td className={styles['row-3']}>{item1.username}</td>
                                  <td className={styles['row-4']}>{item1.num}</td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                </Col>
              ))
            }
          </Row>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  list: state.ranking.list
}))(ranking);
