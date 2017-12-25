import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {connect} from 'dva';
import {Button, Input, Table, Modal, message} from 'antd';
import styles from './about.less';

class about extends React.PureComponent {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className={styles.about}>
        <h1>关于本站</h1>
        <div className={styles['content-box']}>
          本网站是一个个人项目的线上站点。所有素材以及图片均收集自网络，绝不商用。
          <br/>
          如有内容侵权，请联系我删除。
          <br/>
          邮箱：1298947916@qq.com
          <br/>
          微信：lyxz12345
          （详细内容待填充）
        </div>
      </div>
    );
  }
}

export default connect(state => ({
}))(about);
