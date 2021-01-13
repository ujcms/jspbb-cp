import React, {FC, useState} from 'react';
import {Button, Col, Form, Input, Radio, Row} from 'antd';
import {FormattedMessage} from 'umi';
import DatePicker2 from '@/components/DatePicker2';
import {deleteAnswer, queryAnswer, updateAnswer} from '@/services/content';
import {getValidateMessages} from '@/utils/common';
import ModelForm, {FormRenderParams, TableModelFormProps} from '@/components/ModelForm';

const AnswerForm: FC<TableModelFormProps> = (props: TableModelFormProps) => {
  const [unsaved, setUnsaved] = useState<boolean>(false);
  const showStatus = (isEdit: boolean, bean: any, formatMessage: any) =>
    isEdit && bean.status !== undefined && <span>({formatMessage({id: 'answer.status'})}: {formatMessage({id: `answer.status.${bean.status}`})})</span>;
  const formRender = ({formatMessage, bean, form, onFinish, submitLoading}: FormRenderParams) => {
    return (
      <Form form={form} onFinish={onFinish} onValuesChange={() => setUnsaved(true)} validateMessages={getValidateMessages(formatMessage)} initialValues={{bean, ext: bean.ext ?? {}}} layout="vertical">
        <Row gutter={16}>
          <Col span={24}><Form.Item name={['ext', 'markdown']} label={formatMessage({id: 'answer.ext.markdown'})} rules={[{required: true}]}><Input.TextArea autoSize={{minRows: 5, maxRows: 20}} maxLength={10240000}/></Form.Item></Col>
          <Col span={24}><Form.Item name={['ext', 'sensitiveWords']} label={formatMessage({id: 'answer.ext.sensitiveWords'})}><Input maxLength={2000}/></Form.Item></Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name={['bean', 'status']} label={formatMessage({id: 'answer.status'})} rules={[{required: true}]}>
              <Radio.Group options={[0, 1, 2, 3].map((item) => ({value: item, label: formatMessage({id: `answer.status.${item}`})}))}/>
            </Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name={['bean', 'accepted']} label={formatMessage({id: 'answer.accepted'})} rules={[{required: true}]}>
              <Radio.Group options={[true, false].map((item) => ({value: item, label: formatMessage({id: item ? 'yes' : 'no'})}))}/>
            </Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['bean', 'acceptDate']} label={formatMessage({id: 'answer.acceptDate'})}><DatePicker2 format="YYYY-MM-DD HH:mm:ss"/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name={['bean', 'ext', 'editCount']} label={formatMessage({id: 'answer.ext.editCount'})} rules={[{required: true, pattern: /^[0-9]*$/, message: formatMessage({id: 'validation.digits'})}]}>
              <Input maxLength={10}/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name={['bean', 'ups']} label={formatMessage({id: 'answer.ups'})} rules={[{required: true, pattern: /^[0-9]*$/, message: formatMessage({id: 'validation.digits'})}]}><Input maxLength={10}/></Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name={['bean', 'downs']} label={formatMessage({id: 'answer.downs'})} rules={[{required: true, pattern: /^[0-9]*$/, message: formatMessage({id: 'validation.digits'})}]}><Input maxLength={10}/></Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name={['bean', 'commentCount']} label={formatMessage({id: 'answer.commentCount'})} rules={[{required: true, pattern: /^[0-9]*$/, message: formatMessage({id: 'validation.digits'})}]}>
              <Input maxLength={10}/>
            </Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name={['bean', 'favoriteCount']} label={formatMessage({id: 'answer.favoriteCount'})} rules={[{required: true, pattern: /^[0-9]*$/, message: formatMessage({id: 'validation.digits'})}]}>
              <Input maxLength={10}/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['bean', 'created']} label={formatMessage({id: 'answer.created'})} rules={[{required: true}]}><DatePicker2 format="YYYY-MM-DD HH:mm:ss"/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['bean', 'editDate']} label={formatMessage({id: 'answer.editDate'})}><DatePicker2 format="YYYY-MM-DD HH:mm:ss"/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['bean', 'user', 'username']} label={formatMessage({id: 'answer.user'})} rules={[{required: true}]}><Input disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}> <Form.Item name={['bean', 'editUser', 'username']} label={formatMessage({id: 'answer.editUser'})}><Input disabled/></Form.Item></Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'ip']} label={formatMessage({id: 'answer.ext.ip'})} rules={[{required: true}]}><Input disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'ipProvince']} label={formatMessage({id: 'answer.ext.ipProvince'})}><Input disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'ipCountry']} label={formatMessage({id: 'answer.ext.ipCountry'})}><Input disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'ipCity']} label={formatMessage({id: 'answer.ext.ipCity'})}><Input disabled/></Form.Item></Col>
        </Row>
        <Row gutter={16}><Col><Form.Item><Button type="primary" htmlType="submit" loading={submitLoading} disabled={!unsaved}><FormattedMessage id="save"/></Button></Form.Item></Col></Row>
      </Form>
    );
  };
  return <ModelForm title="menu.content.answer" queryBean={queryAnswer} updateBean={updateAnswer} deleteBean={deleteAnswer} unsaved={unsaved} setUnsaved={setUnsaved} formRender={formRender} showStatus={showStatus}
                    modelProps={{width: '100%', style: {top: 20}}} {...props}/>;
};
export default AnswerForm;
