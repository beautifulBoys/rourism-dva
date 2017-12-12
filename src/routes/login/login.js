import { Form, Icon, Input, Button } from 'antd';
import {loginAjax} from '../../api/index.js';
import { connect } from 'dva';
import { Link, routerRedux, Route, Redirect, Switch } from 'dva/router';
import styles from './login.less';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/loginEvent',
          value: {
            username: values.userName,
            password: values.password
          }
        });
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    let {status} = this.props;
    console.log('status: ', status);
    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <div className={styles.login}>
        <div className={styles.box + ' ' + styles.move}>
          <div className={styles.logo}>旅</div>
          <div className={styles['login-box']}>
          <span>{status.toString()}</span>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                validateStatus={userNameError ? 'error' : ''}
                help={userNameError || ''}
                className={styles.formItem}
              >
                {getFieldDecorator('userName', {})(
                  <Input className={styles.input} placeholder="用户名 (2 - 8 位)" />
                )}
              </FormItem>
              <FormItem
                validateStatus={passwordError ? 'error' : ''}
                help={passwordError || ''}
                className={styles.formItem}
              >
                {getFieldDecorator('password', {})(
                  <Input  type="password" className={styles.input} placeholder="密码 (6 - 12 位)" />
                )}
              </FormItem>
              <div className={styles.tag}>首次登录将自动为您注册账号</div>
              <FormItem className={styles.formItem}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.btn}
                  disabled={hasErrors(getFieldsError())}
                > 登　录 </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const LoginApp = Form.create()(Login);

export default connect(state => ({
  status: state.login.status
}))(LoginApp);
