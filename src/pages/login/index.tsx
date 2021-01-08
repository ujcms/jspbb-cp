import { LockTwoTone, UserOutlined } from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { history, Link, useIntl, useModel } from 'umi';
import Footer from '@/components/Footer';
import { accountLogin, LoginParamsType } from '@/services/login';
import { setAccessToken, setRefreshAt, setRefreshToken } from '@/utils/jwt';
import { queryCurrentUser } from '@/services/user';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
);

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const goto = () => {
  const { query } = history.location;
  const { redirect } = query as { redirect: string };
  // window.location.href = redirect || '/';
  history.push(redirect || '/');
};

const Login: React.FC<{}> = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginStateType>({});
  const intl = useIntl();

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await accountLogin({ ...values });
      if (msg.status === 'ok') {
        setAccessToken(msg.accessToken);
        setRefreshToken(msg.refreshToken);
        setRefreshAt(new Date().getTime());
        const currentUser = await queryCurrentUser();
        setInitialState({ ...initialState, currentUser });
        message.success('登录成功！');
        goto();
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
    setAccessToken();
    setRefreshToken();
    setSubmitting(false);
  };
  const { status } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <span className={styles.title}>jspBB</span>
            </Link>
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            style={{ paddingTop: 24 }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.submit',
                  defaultMessage: '登录',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: { loading: submitting, size: 'large', style: { width: '100%' } },
            }}
            onFinish={async (values) => {
              handleSubmit(values);
            }}
          >
            {status === 'error' && (
              <LoginMessage
                content={intl.formatMessage({
                  id: 'pages.login.accountLogin.errorMessage',
                  defaultMessage: '账户或密码错误',
                })}
              />
            )}
            <ProFormText
              name="username"
              fieldProps={{ size: 'large', prefix: <UserOutlined className={styles.prefixIcon} /> }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '用户名',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'pages.login.username.required',
                    defaultMessage: '请输入用户名',
                  }),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{ size: 'large', prefix: <LockTwoTone className={styles.prefixIcon} /> }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'pages.login.password.required',
                    defaultMessage: '请输入密码',
                  }),
                },
              ]}
            />
          </ProForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
