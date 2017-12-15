import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {connect} from 'dva';
import {Button, Input, Table, Modal, message} from 'antd';
import styles from './friend.less';

class friend extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      modalStatus: false,
      currentUsername: '',
      currentItem: null
    };
  }
  componentDidMount () {
    this.props.dispatch({type: 'friend/getData'});
  }
  modalCloseEvent () {
    this.setState({
      modalStatus: false,
      currentUsername: '',
      currentItem: null
    });
  }
  modalOkEvent () {
    let me = this;
    this.props.dispatch({
      type: `friend/deleteFriendEvent`,
      data: {
        id: this.state.currentItem.id,
        cbb () {
          me.modalCloseEvent();
        }
      }
    });
  }
  deleteFriendEvent (record) {
    this.setState({
      modalStatus: true,
      currentItem: record,
      currentUsername: record.username
    });
  }
  render () {
    const me = this;
    const {list} = this.props;
    const columns = [
      {
        title: '用户ID',
        dataIndex: 'id',
        width: '20%'
      }, {
        title: '用户名',
        dataIndex: 'username',
        width: '20%'
      }, {
        title: '碎碎念',
        width: '40%',
        render: (text, record) => (<span>{record.desc || '这个人太懒了，还没有设置呢'}</span>)
      }, {
        title: '操作',
        width: '20%',
        render: (text, record) => (<Button type="danger" onClick={this.deleteFriendEvent.bind(this, record)}>解除好友</Button>)
      }
    ];

    return (
      <div className={styles.friend}>
        <h1>我的圈友</h1>
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
          <Modal
            title="输入提示"
            visible={this.state.modalStatus}
            onOk={this.modalOkEvent.bind(this)}
            onCancel={this.modalCloseEvent.bind(this)}
          >你确认要解除与 {this.state.currentUsername || ''} 的好友？</Modal>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  list: state.friend.list
}))(friend);
