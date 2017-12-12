import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import {Button, Menu, Dropdown} from 'antd';
import styles from './dynamic.less';
import LoadImg from './load_img.js';

class Dynamic extends React.PureComponent {
  componentWillMount() {
  }
  render() {
    let {listItem} = this.props;
    const avatar = 'https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/tourism-circle/avatar.png';
    const controlTemplate = (
      <Menu>
        <Menu.Item>删除</Menu.Item>
        <Menu.Item>隐藏</Menu.Item>
      </Menu>
    );
    const tagTemplate = (
      <Menu>
        {
          listItem.tagList.map((item, index) =>(<Menu.Item key={index}>{item.name}</Menu.Item>))
        }
      </Menu>
    );
    return (
      <div className={styles.dynamic}>
        <div className={styles['li-left']} v-if="!type">
          <img src={listItem.avatar}/>
        </div>
        <div className={styles['li-right']}>
          <div className={styles.title}>
            <span>{listItem.title}</span>
            <span>（仅本人可见）</span>
            <div className={styles['sign-box']}><span className={styles.sign}></span></div>

            <Dropdown overlay={controlTemplate} trigger={['click']}>
              <Button className={styles.fright}>操作</Button>
            </Dropdown>
            <Dropdown overlay={tagTemplate} trigger={['click']}>
              <Button className={styles.fright}>标签（2）</Button>
            </Dropdown>

          </div>
          <div className={styles.content}>{listItem.content}</div>
          <div className={styles['img-box']}>
            {
              listItem.urls.map((item, index) => (
                <div className={styles.item} key={index}>
                  <LoadImg src={item.url}/>
                </div>
              ))
            }
          </div>

        </div>
      </div>
    );
  }
}

export default connect(state => ({
}))(Dynamic);
