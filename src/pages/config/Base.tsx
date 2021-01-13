import React, {FC, useState} from 'react';
import {Button, Card, Input, Form, Select, Col, Row, message,} from 'antd';
import {useIntl, FormattedMessage} from 'umi';
import {PageContainer} from '@ant-design/pro-layout';
import {useRequest} from "@@/plugin-request/request";
import {queryBase, updateBase, queryTemplateDirs} from '@/services/config';
import {getValidateMessages} from "@/utils/common";

const {Option} = Select;

const BaseForm: FC = () => {
  const {formatMessage} = useIntl();
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const {data, loading} = useRequest(() => queryBase());
  const {data: templateDirs, loading: templateDirsLoading} = useRequest(() => queryTemplateDirs());

  const onFinish = async (values: any) => {
    setSubmitting(true);
    await updateBase(values);
    message.success(formatMessage({id: 'success'}));
    setSubmitting(false);
  };
  return (
    <PageContainer header={{title: null}}>
      <Card bordered={false} loading={loading}>
        <Form layout="vertical" form={form} initialValues={data} onFinish={onFinish} validateMessages={getValidateMessages(formatMessage)}>
          <Row gutter={16}>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="themeNormal" label={formatMessage({id: 'config.base.themeNormal'})} rules={[{required: true}]}>
                {!(templateDirs instanceof Array) ? (<Input maxLength={100}/>) :
                  <Select loading={templateDirsLoading}><Option key={0} value=""><FormattedMessage id="pleaseSelect"/></Option>{templateDirs.map(dir => <Option key={dir} value={dir}>{dir}</Option>)}</Select>}
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="themeMobile" label={formatMessage({id: 'config.base.themeMobile'})} rules={[{required: true}]}>
                {!(templateDirs instanceof Array) ? (<Input maxLength={100}/>) :
                  <Select loading={templateDirsLoading}><Option key={0} value=""><FormattedMessage id="pleaseSelect"/></Option>{templateDirs.map(dir => <Option key={dir} value={dir}>{dir}</Option>)}</Select>}
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="siteName" label={formatMessage({id: 'config.base.siteName'})} rules={[{required: true}]}>
                <Input maxLength={100}/>
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item name="siteKeywords" label={formatMessage({id: 'config.base.siteKeywords'})}>
                <Input maxLength={450}/>
              </Form.Item>
            </Col>
            <Col span={24} lg={24} xxl={12}>
              <Form.Item name="siteDescription" label={formatMessage({id: 'config.base.siteDescription'})}>
                <Input maxLength={2000}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}><Col><Form.Item><Button type="primary" htmlType="submit" loading={submitting}><FormattedMessage id="save"/></Button></Form.Item></Col></Row>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default BaseForm;
