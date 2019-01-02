import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import Result from 'components/Result';
import styles from './RegisterResult.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/user/login">
      <Button size="large" type="primary">
        去登陆
      </Button>
    </Link>
    <Link to="/">
      <Button size="large">返回首页</Button>
    </Link>
  </div>
);

export default ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        你的账户：{location.state
          ? location.state.account
          : 'AntDesign@example.com'}{' '}
        注册成功
      </div>
    }
    actions={actions}
    style={{ marginTop: 56 }}
  />
);
