import React, {FC, useState} from 'react';
import {Button, Checkbox, Col, Form, Input, Row, Select, Switch} from 'antd';
import {FormattedMessage, useIntl} from 'umi';
import ModelForm, {FormRenderParams, TableModelFormProps} from '@/components/ModelForm';
import {createGroup, deleteGroup, queryGroup, updateGroup} from '@/services/user';
import {getValidateMessages, labelTip} from '@/utils/common';

const GroupForm: FC<TableModelFormProps> = (props: TableModelFormProps) => {
  const {formatMessage} = useIntl();
  const [unsaved, setUnsaved] = useState<boolean>(false);
  const formRender = ({bean, form, onFinish, submitLoading}: FormRenderParams) => {
    return (
      <Form form={form} initialValues={bean} onFinish={onFinish} onValuesChange={() => setUnsaved(true)} validateMessages={getValidateMessages(formatMessage)} layout="vertical">
        <Row gutter={16}>
          <Col span={24} lg={12} xxl={6}><Form.Item name="name" label={formatMessage({id: 'group.name'})} rules={[{required: true}]}><Input maxLength={100} autoFocus/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name="type" label={formatMessage({id: 'group.type'})}>
              {bean.type === 0 ? <FormattedMessage id="group.type.0"/> : <Select options={[1, 2].map((item) => ({value: item, label: formatMessage({id: `group.type.${item}`})}))}/>}
            </Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name="reputation" label={formatMessage({id: 'group.reputation'})} rules={[{required: true}]}><Input maxLength={10}/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name="order" initialValue={bean.order !== undefined ? undefined : 999999} label={formatMessage({id: 'group.order'})} rules={[{required: true}]}><Input maxLength={10}/></Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={12}><Form.Item name="description" label={formatMessage({id: 'group.description'})}><Input maxLength={2000}/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name="uploadMax" label={labelTip(formatMessage, {id: 'group.uploadMax'})} rules={[{required: true}]}><Input maxLength={10}/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name="uploadWithin" label={labelTip(formatMessage, {id: 'group.uploadWithin'})} rules={[{required: true}]}><Input maxLength={10} addonAfter={formatMessage({id: 'hour'})}/></Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name="questionMax" label={labelTip(formatMessage, {id: 'group.questionMax'})} rules={[{required: true}]}><Input maxLength={10}/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name="questionWithin" label={labelTip(formatMessage, {id: 'group.questionWithin'})} rules={[{required: true}]}><Input maxLength={10} addonAfter={formatMessage({id: 'minute'})}/></Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name="answerMax" label={labelTip(formatMessage, {id: 'group.answerMax'})} rules={[{required: true}]}><Input maxLength={10}/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name="answerWithin" label={labelTip(formatMessage, {id: 'group.answerWithin'})} rules={[{required: true}]}><Input maxLength={10} addonAfter={formatMessage({id: 'minute'})}/></Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name="commentMax" label={labelTip(formatMessage, {id: 'group.commentMax'})} rules={[{required: true}]}><Input maxLength={10}/></Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name="commentWithin" label={labelTip(formatMessage, {id: 'group.commentWithin'})} rules={[{required: true}]}><Input maxLength={10} addonAfter={formatMessage({id: 'minute'})}/></Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name="messageMax" label={labelTip(formatMessage, {id: 'group.messageMax'})} rules={[{required: true}]}><Input maxLength={10}/></Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name="messageWithin" label={labelTip(formatMessage, {id: 'group.messageWithin'})} rules={[{required: true}]}><Input maxLength={10} addonAfter={formatMessage({id: 'minute'})}/></Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} lg={12} xxl={6}><Form.Item name="isTrusted" label={labelTip(formatMessage, {id: 'group.isTrusted'})} valuePropName="checked"><Switch/></Form.Item></Col>
          <Col span={24} lg={12}>
            <Form.Item name="permList" initialValue={bean.roleList?.map((role: any) => role.id)} label={formatMessage({id: 'user.roles'})}>
              <Checkbox.Group options={['questionEdit', 'questionDelete', 'answerEdit', 'answerDelete', 'commentEdit', 'commentDelete'].map((item: any) => ({label: formatMessage({id: `group.perms.${item}`}), value: item}))}/>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item><Button type="primary" htmlType="submit" loading={submitLoading} disabled={!unsaved}><FormattedMessage id="save"/></Button></Form.Item>
      </Form>
    );
  };
  return (
    <ModelForm title="menu.user.group" queryBean={queryGroup} createBean={(data: any) => createGroup({...data, perms: data?.permList?.join(',')})} updateBean={(data: any) => updateGroup({...data, perms: data?.permList?.join(',')})}
               deleteBean={deleteGroup} unsaved={unsaved} setUnsaved={setUnsaved} formRender={formRender} deleteDisabled={(bean) => bean.id <= 10} modelProps={{width: '100%', style: {top: 20}}} {...props}/>
  );
};
export default GroupForm;
