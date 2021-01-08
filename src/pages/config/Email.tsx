import React, { FC, useState } from 'react';
import { Button, Radio, Card, Input, Form, Col, Row, message } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { useRequest } from '@@/plugin-request/request';
import { PageContainer } from '@ant-design/pro-layout';
import { queryEmail, updateEmail, sendEmail } from '@/services/config';
import { getValidateMessages, labelTip } from '@/utils/common';

const EmailForm: FC = () => {
  const { formatMessage } = useIntl();
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const { data, loading } = useRequest(() => queryEmail());
  const onFinish = async (values: any) => {
    setSubmitting(true);
    await updateEmail(values);
    message.success(formatMessage({ id: 'success' }));
    setSubmitting(false);
  };

  const handleSend = async () => {
    setSubmitting(true);
    const values = await form.validateFields();
    await sendEmail(values);
    setSubmitting(false);
  };
  return (
    <PageContainer header={{ title: null }} loading={loading}>
      <Form
        layout="vertical"
        form={form}
        initialValues={data}
        onFinish={onFinish}
        validateMessages={getValidateMessages(formatMessage)}
      >
        <Card bordered={false}>
          <Row gutter={16}>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="host"
                label={labelTip(formatMessage, { id: 'config.email.host' })}
                rules={[{ required: true }]}
              >
                <Input maxLength={100} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="port"
                label={labelTip(formatMessage, { id: 'config.email.port' })}
                rules={[
                  { pattern: /^[0-9]*$/, message: formatMessage({ id: 'validation.digits' }) },
                ]}
              >
                <Input maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="username"
                label={labelTip(formatMessage, { id: 'config.email.username' })}
                rules={[{ required: true }]}
              >
                <Input maxLength={100} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="password"
                label={labelTip(formatMessage, { id: 'config.email.password' })}
                rules={[{ required: true }]}
              >
                <Input maxLength={100} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="from"
                label={formatMessage({ id: 'config.email.from' })}
                rules={[{ required: true, type: 'email' }]}
              >
                <Input maxLength={100} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="usernameMinLength"
                label={labelTip(formatMessage, { id: 'config.email.timeout' })}
                rules={[
                  { pattern: /^[0-9]*$/, message: formatMessage({ id: 'validation.digits' }) },
                ]}
              >
                <Input maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="auth"
                label={labelTip(formatMessage, { id: 'config.email.auth' })}
                rules={[{ required: true }]}
              >
                <Radio.Group
                  options={[true, false].map((item) => ({
                    value: item,
                    label: formatMessage({ id: item ? 'yes' : 'no' }),
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="ssl"
                label={labelTip(formatMessage, { id: 'config.email.ssl' })}
                rules={[{ required: true }]}
              >
                <Radio.Group
                  options={[true, false].map((item) => ({
                    value: item,
                    label: formatMessage({ id: item ? 'yes' : 'no' }),
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  <FormattedMessage id="save" />
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card
          title={formatMessage({ id: 'config.email.testEmail' })}
          bordered={false}
          style={{ marginTop: 24 }}
        >
          <Row gutter={16}>
            <Col span={24} lg={12}>
              <Form.Item
                name="testTo"
                label={formatMessage({ id: 'config.email.testTo' })}
                rules={[{ required: true, type: 'email' }]}
              >
                <Input maxLength={100} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12}>
              <Form.Item
                name="testSubject"
                label={formatMessage({ id: 'config.email.testSubject' })}
                rules={[{ required: true }]}
              >
                <Input maxLength={255} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="testText"
                label={formatMessage({ id: 'config.email.testText' })}
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={3} maxLength={65535} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col>
              <Form.Item>
                <Button type="primary" onClick={handleSend} loading={submitting}>
                  <FormattedMessage id="config.email.sendTestEmail" />
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default EmailForm;
