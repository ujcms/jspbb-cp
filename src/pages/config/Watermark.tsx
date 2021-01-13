import React, {FC, useState} from 'react';
import {Button, Card, Input, Form, Col, Row, message, Select, Radio,} from 'antd';
import {useIntl, FormattedMessage} from 'umi';
import {useRequest} from "@@/plugin-request/request";
import {PageContainer} from '@ant-design/pro-layout';
import {queryWatermark, updateWatermark} from '@/services/config';
import {getValidateMessages, labelTip} from '@/utils/common';


const WatermarkForm: FC = () => {
  const {formatMessage} = useIntl();
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const {data, loading} = useRequest(() => queryWatermark());

  const onFinish = async (values: any) => {
    setSubmitting(true);
    await updateWatermark(values);
    message.success(formatMessage({id: 'success'}));
    setSubmitting(false);
  };
  return (
    <PageContainer header={{title: null}}>
      <Card bordered={false} loading={loading}>
        <Form layout="vertical" form={form} initialValues={data} onFinish={onFinish} validateMessages={getValidateMessages(formatMessage)}>
          <Row gutter={16}>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="enabled" label={formatMessage({id: 'config.watermark.enabled'})} rules={[{required: true}]}>
                <Radio.Group options={[true, false].map(item => ({value: item, label: formatMessage({'id': item ? 'yes' : 'no'})}))}/>
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="overlay" label={formatMessage({id: 'config.watermark.overlay'})} rules={[{required: true}]}>
                <Input maxLength={255}/>
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="position" label={formatMessage({id: 'config.watermark.position'})} rules={[{required: true}]}>
                <Select options={[1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => ({value: item, label: formatMessage({id: `config.watermark.position.${item}`})}))}/>
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="dissolve" label={labelTip(formatMessage, {id: 'config.watermark.dissolve'})} rules={[{required: true, pattern: /^[0-9]*$/, message: formatMessage({id: 'validation.digits'})}]}>
                <Input maxLength={2} addonAfter="%"/>
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="minWidth" label={labelTip(formatMessage, {id: 'config.watermark.minWidth'})} rules={[{required: true, pattern: /^[0-9]*$/, message: formatMessage({id: 'validation.digits'})}]}>
                <Input maxLength={10} addonAfter="px"/>
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="minHeight" label={labelTip(formatMessage, {id: 'config.watermark.minHeight'})} rules={[{required: true, pattern: /^[0-9]*$/, message: formatMessage({id: 'validation.digits'})}]}>
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

export default WatermarkForm;
