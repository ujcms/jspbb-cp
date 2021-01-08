import React from 'react';
import { notification } from 'antd';
import { history, RequestConfig } from 'umi';
import { Context, RequestOptionsInit, ResponseError } from 'umi-request';
import { BasicLayoutProps, Settings as LayoutSettings, PageLoading } from '@ant-design/pro-layout';
import RightContent from '@/components/RightContent';
// import Footer from '@/components/Footer';
import { accountRefreshToken } from '@/services/login';
import {
  getAccessToken,
  getRefreshAt,
  getRefreshToken,
  setAccessToken,
  setRefreshAt,
  setRefreshToken,
} from '@/utils/jwt';
import { queryCurrentUser } from './services/user';
import defaultSettings from '../config/defaultSettings';

/**
 * 获取用户信息比较慢的时候会展示一个 loading
 */
export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  settings?: LayoutSettings;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      return await queryCurrentUser();
    } catch (error) {
      history.push('/login');
      return undefined;
    }
  };
  // 每10分钟刷新一次token，防止session过期。
  const runRefreshToken = (refreshToken: string | null) => {
    if (refreshToken) {
      console.log(`Auto refresh: ${(new Date().getTime() - getRefreshAt()) / 1000}`);
      setRefreshAt(new Date().getTime());
      accountRefreshToken(refreshToken).then((result) => {
        setAccessToken(result.accessToken);
        setRefreshToken(result.refreshToken);
      });
    }
  };
  const intervalRefreshToken = (interval: number, refreshToken: string | null) => {
    runRefreshToken(refreshToken);
    setInterval(() => {
      runRefreshToken(refreshToken);
    }, interval);
  };
  const refreshToken = getRefreshToken();
  const refreshAt = getRefreshAt();
  // 少一秒。避免request拦截器也执行refresh token操作。
  const interval = 10 * 60 * 1000 - 1000;
  const afterTime = refreshAt + interval - new Date().getTime();
  // 1秒内直接执行，不用setTimeout。避免因延迟执行，导致request拦截器也执行refresh token操作。
  if (afterTime <= 1000) {
    intervalRefreshToken(interval, refreshToken);
  } else {
    setTimeout(() => {
      intervalRefreshToken(interval, refreshToken);
    }, afterTime);
  }

  if (history.location.pathname !== '/login') {
    // 常规页面（非登录页面）
    const currentUser = await fetchUserInfo();
    return { fetchUserInfo, currentUser, settings: defaultSettings };
  }
  // 登录页面
  return { fetchUserInfo, settings: defaultSettings };
}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: API.CurrentUser };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // footerRender: () => <Footer/>,
    onPageChange: () => {
      const { currentUser } = initialState;
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!currentUser && location.pathname !== '/login') history.push('/login');
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
    // 不显示LOGO
    // logo: <></>,
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有登录。',
  403: '用户已经登录，但是没有权限。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  415: '不支持的媒体类型。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  console.log(error);
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    // 用户没有
    if (status === 401) {
      history.push(`/login?redirect=${encodeURI(history.location.pathname)}`);
      return;
    }
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

const authorizationInterceptor = (url: string, options: RequestOptionsInit) => {
  const accessToken = getAccessToken();
  // 没有accessToken时传空串
  const headers = { ...options.headers, Authorization: accessToken ? `Bearer ${accessToken}` : '' };
  // 不需要携带cookie信息
  const credentials = options.credentials || 'omit';
  return { url, options: { ...options, headers, credentials } };
};

const refreshTokenMiddleware = async (ctx: Context, next: () => void) => {
  const refreshAt: number = getRefreshAt() || 0;
  const refreshToken = getRefreshToken();
  const now = new Date().getTime();
  // 距离上次刷新token超过10分钟，则重新刷新token
  if (now - refreshAt > 10 * 60 * 1000 && refreshToken) {
    console.log(`Refresh token: ${(now - refreshAt) / 1000}`);
    setRefreshAt(now);
    accountRefreshToken(refreshToken).then((result) => {
      setAccessToken(result.accessToken);
      setRefreshToken(result.refreshToken);
    });
  }
  await next();
};

export const request: RequestConfig = {
  errorHandler,
  middlewares: [refreshTokenMiddleware],
  requestInterceptors: [authorizationInterceptor],
  errorConfig: {
    // 返回错误信息时，格式与umi-request不一致时，可以配置以下信息
    adaptor: (resData: any) => {
      return {
        data: resData,
        success: true,
        status: resData.status,
        errorCode: resData.code,
        errorMessage: resData.message,
        showType: 9,
        traceId: resData.trace,
        host: resData.path,
      };
    },
  },
};
