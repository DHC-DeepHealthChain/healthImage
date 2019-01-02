import React, { Component } from 'react';
import { connect } from 'dva';
import { Alert } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
  };

  handleSubmit = (err, values) => {
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
        },
      });
    }
  };

  renderMessage = (content) => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={content}
        type="error"
        showIcon
      />
    );
  };

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onSubmit={this.handleSubmit}>
          <Tab key="account" tab="账户密码登录">
            {login.status === true &&
              !login.submitting &&
              this.renderMessage('账户或密码错误')}
            <UserName name="mobileNumber" placeholder="请输入手机号" />
            <Password name="password" placeholder="请输入密码" />
          </Tab>
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}
