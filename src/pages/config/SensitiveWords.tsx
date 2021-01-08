import React, { FC, useState } from 'react';
import { Button, Card, Input, Form, Col, Row, message } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from '@@/plugin-request/request';
import { querySensitiveWords, updateSensitiveWords } from '@/services/config';
import { getValidateMessages, labelTip } from '@/utils/common';

const SensitiveWordsForm: FC = () => {
  const { formatMessage } = useIntl();
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const { data, loading } = useRequest(() => querySensitiveWords());

  const onFinish = async (values: any) => {
    setSubmitting(true);
    await updateSensitiveWords(values.words);
    message.success(formatMessage({ id: 'success' }));
    setSubmitting(false);
  };
  return (
    <PageContainer header={{ title: null }}>
      <Card bordered={false} loading={loading}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          validateMessages={getValidateMessages(formatMessage)}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="words"
                initialValue={data}
                label={labelTip(formatMessage, { id: 'config.sensitiveWords.words' })}
              >
                <Input.TextArea autoSize={{ minRows: 5, maxRows: 30 }} maxLength={10240000} />
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
export default SensitiveWordsForm;
