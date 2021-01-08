import React, { FC, useState } from 'react';
import { Button, Card, Input, Form, Select, Col, Row, message } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { useRequest } from '@@/plugin-request/request';
import { PageContainer } from '@ant-design/pro-layout';
import { querySignUp, updateSignUp } from '@/services/config';
import { getValidateMessages, labelTip } from '@/utils/common';

const SignUpForm: FC = () => {
  const { formatMessage } = useIntl();
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const { data, loading } = useRequest(() => querySignUp());

  const onFinish = async (values: any) => {
    setSubmitting(true);
    await updateSignUp(values);
    message.success(formatMessage({ id: 'success' }));
    setSubmitting(false);
  };
  return (
    <PageContainer header={{ title: null }}>
      <Card bordered={false} loading={loading}>
        <Form
          layout="vertical"
          form={form}
          initialValues={data}
          onFinish={onFinish}
          validateMessages={getValidateMessages(formatMessage)}
        >
          <Row gutter={16}>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="usernameMinLength"
                label={formatMessage({ id: 'config.signUp.usernameMinLength' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="usernameMaxLength"
                label={formatMessage({ id: 'config.signUp.usernameMaxLength' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="usernameRegex"
                label={formatMessage({ id: 'config.signUp.usernameRegex' })}
                rules={[{ required: true }]}
              >
                <Input maxLength={255} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="verifyMode"
                label={formatMessage({ id: 'config.signUp.verifyMode' })}
                rules={[{ required: true }]}
              >
                <Select
                  options={[0, 1, 2, 3, 4].map((item) => ({
                    value: item,
                    label: formatMessage({ id: `config.signUp.verifyMode.${item}` }),
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="pictureUrl"
                label={labelTip(formatMessage, { id: 'config.signUp.pictureUrl' })}
                rules={[{ required: true }]}
              >
                <Input maxLength={255} disabled />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="pictureSizeSmall"
                label={formatMessage({ id: 'config.signUp.pictureSizeSmall' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={10} addonAfter="px" />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="pictureSizeMedium"
                label={formatMessage({ id: 'config.signUp.pictureSizeMedium' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={10} addonAfter="px" />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="pictureSizeLarge"
                label={formatMessage({ id: 'config.signUp.pictureSizeLarge' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={10} addonAfter="px" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="verifyEmailSubject"
                label={formatMessage({ id: 'config.signUp.verifyEmailSubject' })}
                rules={[{ required: true }]}
              >
                <Input maxLength={255} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="verifyEmailText"
                label={labelTip(formatMessage, { id: 'config.signUp.verifyEmailText' })}
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={3} maxLength={1024000} />
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
        </Form>
      </Card>
    </PageContainer>
  );
};

export default SignUpForm;
