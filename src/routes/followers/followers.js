import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {connect} from 'dva';
import {Button, Input, Table, Modal, message} from 'antd';
import styles from './followers.less';

class followers extends React.PureComponent {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    this.props.dispatch({type: 'followers/getData'});
  }

  render () {
    const me = this;
    const {list, pageConfig} = this.props;
    const columns = [
      {
        title: '用户ID',
        dataIndex: 'id',
        width: '25%'
      }, {
        title: '用户名',
        dataIndex: 'username',
        width: '25%'
      }, {
        title: '碎碎念',
        width: '50%',
        render: (text, record) => (<span>{record.desc || '这个人太懒了，还没有设置呢'}</span>)
      }
    ];

    return (
      <div className={styles.followers}>
        <h1>我的粉丝</h1>
        <div className={styles['content-box']}>
          <Table
            bordered={true}
            columns={columns}
            expandedRowRender={record => (
              <div className={styles.descript_box}>
                <div className={styles.item}>性别： {record.sex === 2 ? '男' : (record.sex === 1 ? '女' : '未设置')}</div>
                <div className={styles.item}>地址： {record.address || '未设置'}</div>
                <div className={styles.item}>邮箱： {record.email || '未设置'}</div>
                <div className={styles.item}>分享数： {record.postNum}</div>
              </div>
            )}
            dataSource={list}
            pagination={false}
            className={styles.table}
          />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  userInfo: state.global.userInfo,
  list: state.followers.list
}))(followers);
