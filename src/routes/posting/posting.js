import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {connect} from 'dva';
import {Form, Select, Tooltip, Col, Rate, DatePicker, Tag, Checkbox, Row, Icon, Cascader, Button, Input, Table, Modal, message} from 'antd';
import ChoiceImg from '../../components/choice_img.js';
import styles from './posting.less';

class posting extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      tagList: [],
      urls: [],
      imgDialogShow: false
    };
  }
  componentDidMount () {
    this.props.dispatch({type: 'posting/getCityData'});
    this.props.dispatch({type: 'posting/getGallery'});
  }

  handleSubmit (e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) console.log(values);
    });
  }
  addTagEvent (e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      tagList: [
        ...this.state.tagList,
        {type: 'primary', name: e.target.value}
      ]
    });
    this.props.form.setFieldsValue({tag: ''});
  }

  render () {
    const me = this;
    const {cityData} = this.props;
    const { getFieldDecorator, setFieldsValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
      },
    };
    return (
      <div className={styles.posting}>
        <h1>写分享</h1>
        <div className={styles['content-box']}>
          <Form onSubmit={this.handleSubmit.bind(this)} style={{width: '100%'}}>
          <Form.Item {...formItemLayout} label="分享标题">
            {getFieldDecorator('title', {
              rules: [
                {max: 20, message: '标题请控制在 20 字以内'},
                {required: true, message: '此项必填'}
              ]
            })(
              <Input placeholder="20 字以内"/>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="景点名称">
            {getFieldDecorator('spot', {
              rules: [
                {max: 10, message: '景点名称请控制在 10 字以内'},
                {required: true, message: '此项必填'}
              ]
            })(
              <Input  placeholder="10 字以内"/>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="地点时间">
            {getFieldDecorator('city', {
              rules: [{required: true, message: '此项必填'}]
            })(
              <Cascader options={cityData} placeholder="请选择旅游城市" style={{width: '30%'}}/>
            )}　
            {getFieldDecorator('time', {
              rules: [{required: true, message: '此项必填'}]
            })(
              <DatePicker.RangePicker />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="正文内容">
            {getFieldDecorator('content', {
              rules: [{required: true, message: '此项必填'}]
            })(
              <Input.TextArea placeholder="请输入旅游趣事或心得~" autosize={{ minRows: 6}} style={{lineHeight: '30px'}} />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="添加图片">
            {
              this.state.urls.map((item, index) => (
                <div className={styles['add-picture']} style={{background: `url(${item.url}) no-repeat center center`}}></div>)
              )
            }
            <div className={styles['add-picture']} onClick={() => {
              this.refs.choice.open();
            }}>+</div>
          </Form.Item>
          <Form.Item {...formItemLayout} label="推荐指数">
            {getFieldDecorator('rate', {
              rules: [{required: true, message: '此项必填'}]
            })(
              <Rate style={{fontSize: '20px', color: '#ff9900'}}/>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="旅游标签">
            {getFieldDecorator('tag', {})(
              <Input placeholder="8 字以内，回车确认" onPressEnter={this.addTagEvent.bind(this)} style={{width: '20%'}}/>
            )}　
            {
              this.state.tagList.map((item, index) => (
                <Tag color="#20A0FF" key={index} closable>{item.name}</Tag>
              ))
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">发　表</Button>
          </Form.Item>
        </Form>
        <ChoiceImg ref="choice" urls={this.props.urls}/>
        </div>
      </div>
    );
  }
}
const Posting = Form.create()(posting);

export default connect(state => ({
  userInfo: state.global.userInfo,
  cityData: state.posting.cityData,
  urls: state.posting.urls
}))(Posting);
