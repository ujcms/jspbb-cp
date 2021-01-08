import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Card } from 'antd';

export default (): React.ReactNode => (
  <PageContainer>
    <Card>
      <Alert
        message="欢迎使用 jspBB！"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
    </Card>
  </PageContainer>
);
