import React, {FC, useState} from 'react';
import {Button, Card, Input, Form, Col, Row, message,} from 'antd';
import {useIntl, FormattedMessage} from 'umi';
import {useRequest} from "@@/plugin-request/request";
import {PageContainer} from '@ant-design/pro-layout';
import {queryUpload, updateUpload} from '@/services/config';
import {getValidateMessages, labelTip} from '@/utils/common';


const UploadForm: FC = () => {
  const {formatMessage} = useIntl();
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const {data, loading} = useRequest(() => queryUpload());

  const onFinish = async (values: any) => {
    setSubmitting(true);
    await updateUpload(values);
    message.success(formatMessage({id: 'success'}));
    setSubmitting(false);
  };
  return (
    <PageContainer header={{title:null}}>
      <Card bordered={false} loading={loading}>
        <Form layout="vertical" form={form} initialValues={data} onFinish={onFinish} validateMessages={getValidateMessages(formatMessage)}>
          <Row gutter={16}>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="fileTypes" label={labelTip(formatMessage,{id: 'config.upload.fileTypes'})}>
                <Input maxLength={255}/>
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="fileLimit" label={labelTip(formatMessage,{id: 'config.upload.fileLimit', tipId: 'config.upload.limit.tooltip'})} rules={[{required: true, pattern: /^[0-9]*$/, message: formatMessage({id: 'validation.digits'})}]}>
                <Input maxLength={10} addonAfter="KB"/>
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="imageTypes" label={labelTip(formatMessage,{id: 'config.upload.imageTypes'})}>
                <Input maxLength={255}/>
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="imageLimit" label={labelTip(formatMessage,{id: 'config.upload.imageLimit', tipId: 'config.upload.limit.tooltip'})} rules={[{required: true, pattern: /^[0-9]*$/, message: formatMessage({id: 'validation.digits'})}]}>
                <Input maxLength={10} addonAfter="KB"/>
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="videoTypes" label={labelTip(formatMessage,{id: 'config.upload.videoTypes'})}>
                <Input maxLength={255}/>
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="videoLimit" label={labelTip(formatMessage,{id: 'config.upload.videoLimit', tipId: 'config.upload.limit.tooltip'})} rules={[{required: true, pattern: /^[0-9]*$/, message: formatMessage({id: 'validation.digits'})}]}>
                <Input maxLength={10} addonAfter="KB"/>
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="imageMaxWidth" label={labelTip(formatMessage,{id: 'config.upload.imageMaxWidth'})} rules={[{required: true, pattern: /^[0-9]*$/, message: formatMessage({id: 'validation.digits'})}]}>
                <Input maxLength={10} addonAfter="px"/>
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="imageMaxHeight" label={labelTip(formatMessage,{id: 'config.upload.imageMaxHeight'})} rules={[{required: true, pattern: /^[0-9]*$/, message: formatMessage({id: 'validation.digits'})}]}>
                <Input maxLength={10} addonAfter="px"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}><Col><Form.Item><Button type="primary" htmlType="submit" loading={submitting}><FormattedMessage id="save"/></Button></Form.Item></Col></Row>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default UploadForm;
