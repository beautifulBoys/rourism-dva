import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {connect} from 'dva';
import {Button, Input, Table, Modal, message} from 'antd';
import styles from './contact.less';

class contact extends React.PureComponent {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className={styles.contact}>
        <h1>联系我</h1>
        <div className={styles['content-box']}>
          内容待填充
        </div>
      </div>
    );
  }
}

export default connect(state => ({
}))(contact);
