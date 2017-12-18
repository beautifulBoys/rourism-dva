import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import {Button, Menu, Dropdown, Pagination, Modal, Input, message } from 'antd';
import styles from './dynamic.less';
import LoadImg from './load_img.js';
import Collapse from './collapse.js';
import {pinglunAjax, starAjax, changeMinePostStatusAjax} from '../api/index.js';

class Dynamic extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      commentList: [],
      isStared: false,
      pinglunModalStatus: false,
      pinglunInputValue: ''
    };
  }
  componentWillMount () {
    this.setState({
      isStared: this.props.listItem.isStared,
      commentList: this.props.listItem.commentList
    });
  }
  async starEvent () {
    if (this.props.userInfo.userId === this.props.listItem.userId) {
      message.warning('不能喜欢自己发表的分享');
      return;
    }
    let result = await starAjax({id: this.props.listItem.id});
    if (result.code === 200) {
      message.success(result.message);
      this.setState({isStared: (result.data.status === 'star')});
      console.log(this.state.isStared);
    } else message.error(result.message);
  }
  async controlEvent ({key}) {
    let result = await changeMinePostStatusAjax({id: this.props.listItem.id, status: key});
    if (result.code === 200) {
      message.success(result.message);
      this.props.refresh();
    } else message.error(result.message);
  }
  pinglunModalCloseEvent () {
    this.setState({pinglunModalStatus: false});
  }
  async pinglunModalOkEvent () {
    if (!this.state.pinglunInputValue.trim()) {
      message.error('请输入除空格以外的文字内容');
      return;
    }
    let result = await pinglunAjax({
      id: this.props.listItem.id,
      value: this.state.pinglunInputValue.trim()
    });
    if (result.code === 200) {
      message.success(result.message);
      this.pinglunModalCloseEvent();
      this.setState({pinglunInputValue: '', commentList: [...this.state.commentList, result.data]});
    } else message.error(result.message);
  }
  render() {
    let {listItem, control} = this.props;
    const avatar = 'https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/tourism-circle/avatar.png';
    const controlTemplate = (
      <Menu onClick={this.controlEvent.bind(this)}>
        <Menu.Item key="hide">隐藏</Menu.Item>
        <Menu.Item key="show">显示</Menu.Item>
        <Menu.Item key="delete">删除</Menu.Item>
      </Menu>
    );
    const tagTemplate = (
      <Menu>
        {
          listItem.tagList.map((item, index) =>(
            <Menu.Item key={index}>{item.name}</Menu.Item>
          ))
        }
      </Menu>
    );
    return (
      <div className={styles.dynamic}>
        {
          !this.props.type ? (
            <div className={styles['li-left']}>
              <img src={listItem.avatar}/>
            </div>
          ) : ''
        }
        <div className={styles['li-right']}>
          <div className={styles.title}>
            <span>{listItem.title}</span>
            {listItem.status !== 1 || <span>（仅本人可见）</span>}
            {
              !this.props.type ? (
                <div className={styles['sign-box']}><span className={styles.sign}></span></div>
              ) : ''
            }
            {
              !control || (<Dropdown overlay={controlTemplate} trigger={['click']}>
                  <Button className={styles.fright}>操作</Button>
                </Dropdown>)
            }

            <Dropdown overlay={tagTemplate} trigger={['click']}>
              <Button className={styles.fright}>标签（{listItem.tagList.length}）</Button>
            </Dropdown>

          </div>
          <div className={styles.content}>{listItem.content}</div>
          <div className={styles['img-box']}>
            {
              listItem.urls.map((item, index) => (
                <div className={styles.item} key={index} onClick={() => {
                  this.props.dispatch({
                    type: 'global/openImgScan',
                    src: item.url
                  })
                }}>
                  <LoadImg src={item.url}/>
                </div>
              ))
            }
          </div>
          <Collapse
          num={this.state.commentList.length}
          isStared={this.state.isStared}
          starEvent={this.starEvent.bind(this)}
          pinglunEvent={() => {
            this.setState({pinglunModalStatus: true});
          }}
          commentList={
            (<div>
              <ul className={styles.ul}>
                {
                  this.state.commentList.map((item, index) => (
                    <li key={index} className={styles.li}>
                      <div className={styles.left}><img src={item.user.url}/></div>
                      <div className={styles.right}>
                        <div className={styles.name}>{item.user.name}</div>
                        <div>{item.comment.content}</div>
                      </div>
                    </li>
                  ))
                }
              </ul>
              <div className={styles.pagination}>
                <Pagination defaultCurrent={1} defaultPageSize={5} total={this.state.commentList.length} />
              </div>
            </div>)
          }/>
        </div>
        <Modal
          title="输入提示"
          visible={this.state.pinglunModalStatus}
          onOk={this.pinglunModalOkEvent.bind(this)}
          onCancel={this.pinglunModalCloseEvent.bind(this)}
        >
          请输入你的评论内容：
          <br/><br/>
          <Input onChange={(e) => {
            this.setState({pinglunInputValue: e.target.value});
          }}/>
        </Modal>
      </div>
    );
  }
}

export default connect(state => ({
  userInfo: state.global.userInfo
}))(Dynamic);
