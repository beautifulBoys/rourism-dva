import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {connect} from 'dva';
import {Button, Input, Table, Modal, message} from 'antd';
import styles from './allfriend.less';

class allfriend extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalStatus: false,
      inputValue: '',
      tipText: '',
      currentIndex: '',
      currentItem: null
    };
  }
  componentDidMount() {
    this.loadMoreEvent(1);
  }
  loadMoreEvent (num) {
    this.props.dispatch({type: 'allfriend/getData', page: num});
  }
  modalCloseEvent () {
    this.setState({
      modalStatus: false,
      inputValue: ''
    });
  }
  modalOpenEvent () {
    this.setState({modalStatus: true});
  }
  modalOkEvent () {
    let me = this;
    if (this.state.currentIndex === 'addfriend' || this.state.currentIndex === 'webmail') {
      this.props.dispatch({
        type: `allfriend/${me.state.currentIndex}Event`,
        data: {
          remark: this.state.inputValue,
          to: this.state.currentItem.id,
          cbb () {
            me.modalCloseEvent();
          }
        }
      });
    } else {
      this.props.dispatch({
        type: `allfriend/followingEvent`,
        data: {
          id: this.state.currentItem.id
        }
      });
    }

  }
  addfriendEvent (record) {
    if (record.id === this.props.userInfo.userId) {
      message.error('不能添加自己为好友');
      return;
    }
    this.setState({
      modalStatus: true,
      tipText: `请输入添加 ${record.username} 为好友的理由`,
      currentItem: record,
      currentIndex: 'addfriend'
    });
  }
  webmailEvent (record) {
    if (record.id === this.props.userInfo.userId) {
      message.error('不能给自己发送站内信');
      return;
    }
    this.setState({
      modalStatus: true,
      tipText: `请输入发送给 ${record.username} 的站内信`,
      currentItem: record,
      currentIndex: 'webmail'
    });
  }
  followingEvent (record) {
    if (record.id === this.props.userInfo.userId) {
      message.error('不能关注自己');
      return;
    }
    console.log(record);
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
            <Button type="danger" onClick={this.followingEvent.bind(this, record)}>关注</Button>
          </div>
        )
      }
    ];

    return (
      <div className={styles.allfriend}>
        <h1>所有圈友</h1>
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
            pagination={{
              pageSize: pageConfig.num,
              total: pageConfig.total,
              onChange (page) {
                me.loadMoreEvent(page)
              }
            }}
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
  list: state.allfriend.list,
  pageConfig: state.allfriend.pageConfig
}))(allfriend);
