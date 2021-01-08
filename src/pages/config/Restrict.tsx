import React, { FC, useState } from 'react';
import { Button, Card, Col, Form, Input, message, Row } from 'antd';
import { FormattedMessage, useIntl } from 'umi';
import { useRequest } from '@@/plugin-request/request';
import { PageContainer } from '@ant-design/pro-layout';
import { queryRestrict, updateRestrict } from '@/services/config';
import { getValidateMessages, labelTip } from '@/utils/common';

const RestrictForm: FC = () => {
  const { formatMessage } = useIntl();
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const { data, loading } = useRequest(() => queryRestrict());

  const onFinish = async (values: any) => {
    setSubmitting(true);
    await updateRestrict(values);
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
                name="passwordRetryMax"
                label={labelTip(formatMessage, { id: 'config.restrict.passwordRetryMax' })}
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
                name="passwordRetryWithin"
                label={labelTip(formatMessage, { id: 'config.restrict.passwordRetryWithin' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={10} addonAfter={formatMessage({ id: 'minute' })} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="smsMax"
                label={labelTip(formatMessage, { id: 'config.restrict.smsMax' })}
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
                name="smsWithin"
                label={labelTip(formatMessage, { id: 'config.restrict.smsWithin' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={10} addonAfter={formatMessage({ id: 'minute' })} />
              </Form.Item>
            </Col>
            <Col span={24} lg={24} xxl={12}>
              <Form.Item
                name="messageInterval"
                label={formatMessage({ id: 'config.restrict.messageInterval' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={10} addonAfter={formatMessage({ id: 'second' })} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="messageMax"
                label={labelTip(formatMessage, { id: 'config.restrict.messageMax' })}
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
                name="messageWithin"
                label={labelTip(formatMessage, { id: 'config.restrict.messageWithin' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={10} addonAfter={formatMessage({ id: 'minute' })} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="uploadMax"
                label={labelTip(formatMessage, { id: 'config.restrict.uploadMax' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={10} addonAfter="MB" />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name="uploadWithin"
                label={labelTip(formatMessage, { id: 'config.restrict.uploadWithin' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={10} addonAfter={formatMessage({ id: 'minute' })} />
              </Form.Item>
            </Col>
            <Col span={24} lg={24} xxl={12}>
              <Form.Item
                name="mobileBlacklist"
                label={labelTip(formatMessage, { id: 'config.restrict.mobileBlacklist' })}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} lg={24} xxl={24}>
              <Form.Item
                name="ipBlacklist"
                label={labelTip(formatMessage, { id: 'config.restrict.ipBlacklist' })}
              >
                <Input.TextArea autoSize={{ minRows: 8, maxRows: 50 }} />
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

export default RestrictForm;
