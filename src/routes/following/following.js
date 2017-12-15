import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {connect} from 'dva';
import {Button, Input, Table, Modal, message} from 'antd';
import styles from './following.less';

class following extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      modalStatus: false,
      inputValue: '',
      tipText: '',
      currentIndex: '',
      currentItem: null
    };
  }
  componentDidMount () {
    this.props.dispatch({type: 'following/getData'});
  }
  modalCloseEvent () {
    this.setState({
      modalStatus: false,
      inputValue: '',
      currentIndex: ''
    });
  }
  modalOpenEvent () {
    this.setState({modalStatus: true});
  }
  modalOkEvent () {
    let me = this;
    if (!this.state.currentIndex) return;
    this.props.dispatch({
      type: `following/${me.state.currentIndex}Event`,
      data: {
        remark: this.state.inputValue,
        to: this.state.currentItem.id,
        cbb () {
          me.modalCloseEvent();
        }
      }
    });
  }
  addfriendEvent (record) {
    this.setState({
      modalStatus: true,
      tipText: `请输入添加 ${record.username} 为好友的理由`,
      currentItem: record,
      currentIndex: 'addfriend'
    });
  }
  webmailEvent (record) {
    this.setState({
      modalStatus: true,
      tipText: `请输入发送给 ${record.username} 的站内信`,
      currentItem: record,
      currentIndex: 'webmail'
    });
  }
  deleteFollowingEvent (record) {
    this.props.dispatch({
      type: `following/deleteFollowingEvent`,
      data: {
        id: record.id
      }
    });
  }
  render () {
    const me = this;
    const {list, pageConfig} = this.props;
    const columns = [
      {
        title: '用户ID',
        dataIndex: 'id',
        width: '15%'
      }, {
        title: '用户名',
        dataIndex: 'username',
        width: '15%'
      }, {
        title: '碎碎念',
        width: '40%',
        render: (text, record) => (<span>{record.desc || '这个人太懒了，还没有设置呢'}</span>)
      }, {
        title: '操作',
        width: '30%',
        render: (text, record) => (
          <div>
            <Button onClick={this.addfriendEvent.bind(this, record)}>加好友</Button>　
            <Button onClick={this.webmailEvent.bind(this, record)}>站内信</Button>　
            <Button type="danger" onClick={this.deleteFollowingEvent.bind(this, record)}>解除关注</Button>
          </div>
        )
      }
    ];

    return (
      <div className={styles.following}>
        <h1>我的关注</h1>
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
          >
            {this.state.tipText}：
            <br/><br/>
            <Input onChange={(e) => {
              this.setState({inputValue: e.target.value});
            }}/>
          </Modal>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  userInfo: state.global.userInfo,
  list: state.following.list,
  pageConfig: state.following.pageConfig
}))(following);
