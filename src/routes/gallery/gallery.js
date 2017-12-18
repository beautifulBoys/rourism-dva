import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Button, Input } from 'antd';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import styles from './gallery.less';
import GalleryCard from '../../components/gallery_card.js';

class gallery extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'gallery/getData'
    });
  }

  render() {
    const {list} = this.props;
    return (
      <div className={styles.gallery}>
        <h1>我的图库</h1>
        <div className={styles['content-box']}>
          {
            list.map((item, index) => (<GalleryCard key={index} data={item}/>))
          }
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  list: state.gallery.list
}))(gallery);
