import React, {FC, useState} from 'react';
import {Button, Col, Form, Input, Radio, Row, Select} from 'antd';
import {FormattedMessage} from 'umi';
import DatePicker2 from '@/components/DatePicker2';
import {deleteComment, queryComment, updateComment} from '@/services/content';
import {getValidateMessages} from '@/utils/common';
import ModelForm, {FormRenderParams, TableModelFormProps} from '@/components/ModelForm';

const CommentForm: FC<TableModelFormProps> = (props: TableModelFormProps) => {
  const [unsaved, setUnsaved] = useState<boolean>(false);
  const showStatus = (isEdit: boolean, bean: any, formatMessage: any) =>
    isEdit && bean.status !== undefined && <span>({formatMessage({id: 'comment.status'})}: {formatMessage({id: `comment.status.${bean.status}`})})</span>;
  const formRender = ({formatMessage, bean, form, onFinish, submitLoading}: FormRenderParams) => {
    return (
      <Form form={form} onFinish={onFinish} onValuesChange={() => setUnsaved(true)} validateMessages={getValidateMessages(formatMessage)} initialValues={bean} layout="vertical">
        <Row gutter={16}>
          <Col span={24}><Form.Item name="markdown" label={formatMessage({id: 'comment.markdown'})} rules={[{required: true}]}><Input.TextArea autoSize={{minRows: 5, maxRows: 20}} maxLength={10240000}/></Form.Item></Col>
          <Col span={24}><Form.Item name="sensitiveWords" label={formatMessage({id: 'comment.sensitiveWords'})}><Input maxLength={2000}/></Form.Item></Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} lg={12} xxl={12}>
            <Form.Item name="status" label={formatMessage({id: 'comment.status'})} rules={[{required: true}]}>
              <Radio.Group options={[0, 1, 2, 3].map((item) => ({value: item, label: formatMessage({id: `comment.status.${item}`})}))}/>
            </Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name="created" label={formatMessage({id: 'comment.created'})} rules={[{required: true}]}><DatePicker2 format="YYYY-MM-DD HH:mm:ss"/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name="editDate" label={formatMessage({id: 'comment.editDate'})}><DatePicker2 format="YYYY-MM-DD HH:mm:ss"/></Form.Item></Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name="refType" label={formatMessage({id: 'comment.refType'})} rules={[{required: true}]}>
              <Select options={['question', 'answer', 'comment'].map((item) => ({value: item, label: formatMessage({id: `comment.refType.${item}`}),}))} disabled/>
            </Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name="refId" label={formatMessage({id: 'comment.refId'})} rules={[{required: true}]}><Input maxLength={20} disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['user', 'username']} label={formatMessage({id: 'comment.user'})} rules={[{required: true}]}><Input disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['editUser', 'username']} label={formatMessage({id: 'comment.editUser'})}><Input disabled/></Form.Item></Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} lg={12} xxl={6}><Form.Item name="ip" label={formatMessage({id: 'comment.ip'})} rules={[{required: true}]}><Input disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name="ipProvince" label={formatMessage({id: 'comment.ipProvince'})}><Input disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name="ipCountry" label={formatMessage({id: 'comment.ipCountry'})}><Input disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name="ipCity" label={formatMessage({id: 'comment.ipCity'})}><Input disabled/></Form.Item></Col>
        </Row>
        <Row gutter={16}><Col><Form.Item><Button type="primary" htmlType="submit" loading={submitLoading} disabled={!unsaved}><FormattedMessage id="save"/></Button></Form.Item></Col></Row>
      </Form>
    );
  };
  return <ModelForm title="menu.content.comment" queryBean={queryComment} updateBean={updateComment} deleteBean={deleteComment} unsaved={unsaved} setUnsaved={setUnsaved} formRender={formRender} showStatus={showStatus}
                    modelProps={{width: '100%', style: {top: 20}}} {...props}/>;
};
export default CommentForm;
