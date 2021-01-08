import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2021 jspBB"
    // 此处可增加链接，如官网、github项目。不显示链接必须给空数组，否则默认显示 antd 的链接。
    links={[
      {
        key: 'Powered by jspBB',
        title: 'Powered by jspBB',
        href: 'https://www.jspxcms.com/jspbb',
        blankTarget: true,
      },
    ]}
  />
);
