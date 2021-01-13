import React, {FC, useState} from 'react';
import {Button, Checkbox, Col, Form, Input, Radio, Row, Select} from 'antd';
import {FormattedMessage} from 'umi';
import {useRequest} from '@@/plugin-request/request';
import DatePicker2 from '@/components/DatePicker2';
import {createUser, deleteUser, emailValidation, mobileValidation, queryGroups, queryRoles, queryUser, updateUser, usernameValidation} from '@/services/user';
import {getValidateMessages, labelTip} from '@/utils/common';
import ModelForm, {FormRenderParams, TableModelFormProps} from '@/components/ModelForm';

const UserForm: FC<TableModelFormProps> = (props: TableModelFormProps) => {
  const [unsaved, setUnsaved] = useState<boolean>(false);
  const {data: roleList} = useRequest(() => queryRoles());
  const {data: groupList, loading: groupListLoading} = useRequest(() => queryGroups());
  const showStatus = (isEdit: boolean, bean: any, formatMessage: any) => isEdit && bean.status !== undefined && <span>({formatMessage({id: 'user.status'})}: {formatMessage({id: `user.status.${bean.status}`})})</span>;
  const formRender = ({formatMessage, bean, isEdit, form, onFinish, submitLoading}: FormRenderParams) => {
    return (
      <Form form={form} onFinish={onFinish} onValuesChange={() => setUnsaved(true)} validateMessages={getValidateMessages(formatMessage)} initialValues={{bean, ext: bean.ext ?? {}}} layout="vertical">
        <Row gutter={16}>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name={['bean', 'username']} validateFirst label={labelTip(formatMessage, {id: 'user.username'})} rules={[{required: true}, {
              validator: async (_, value) => {
                if (value !== bean.username) {
                  try {
                    return (await usernameValidation(value)) ? Promise.resolve() : Promise.reject(new Error(formatMessage({id: 'user.error.usernameExist'})),);
                  } catch (reason) {
                    return Promise.reject(reason);
                  }
                }
                return Promise.resolve();
              }
            }]}><Input maxLength={50} autoFocus/></Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['bean', 'home']} label={formatMessage({id: 'user.home'})}><Input maxLength={50}/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'rowPassword']} label={formatMessage({id: 'user.ext.rowPassword'})} rules={[!isEdit ? {required: true} : {}]}><Input type="password" maxLength={50}/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name={['ext', 'confirmPassword']} label={formatMessage({id: 'user.ext.confirmPassword'})} rules={[
              !isEdit ? {required: true} : {}, {validator: (_, value) => value && value !== form.getFieldValue(['ext', 'rowPassword']) ? Promise.reject(new Error(formatMessage({id: 'validation.equal'}))) : Promise.resolve()}
            ]}><Input type="password" maxLength={50}/></Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} lg={12}>
            <Form.Item name="roleIds" initialValue={bean.roleList?.map((role: any) => role.id)} label={formatMessage({id: 'user.roles'})}>
              <Checkbox.Group options={roleList?.map((role: any) => ({label: role.name, value: role.id}))}/>
            </Form.Item>
          </Col>
          <Col span={24} lg={6}>
            <Form.Item name={['bean', 'groupId']} initialValue={bean.groupId === undefined ? 10 : undefined} label={formatMessage({id: 'user.group'})} rules={[{required: true}]}>
              <Select options={groupList?.map((item: any) => ({label: `${item.name}(${formatMessage({id: `group.type.${item.type}`})})`, value: item.id,}))} loading={groupListLoading}/>
            </Form.Item>
          </Col>
          <Col span={24} lg={6}>
            <Form.Item name={['bean', 'status']} initialValue={bean.status === undefined ? 0 : undefined} label={formatMessage({id: 'user.status'})} rules={[{required: true}]}>
              <Radio.Group options={[0, 1, 2].map((item) => ({value: item, label: formatMessage({id: `user.status.${item}`}),}))}/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name={['bean', 'mobile']} validateFirst label={formatMessage({id: 'user.mobile'})} rules={[{
              validator: async (_, value) => {
                if (value !== bean.mobile) {
                  try {
                    return (await mobileValidation(value)) ? Promise.resolve() : Promise.reject(new Error(formatMessage({id: 'user.error.mobileExist'})));
                  } catch (reason) {
                    return Promise.reject(reason);
                  }
                }
                return Promise.resolve();
              }
            }]}><Input maxLength={50}/></Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name={['bean', 'email']} validateFirst label={formatMessage({id: 'user.email'})} rules={[{type: 'email'}, {
              validator: async (_, value) => {
                if (value !== bean.email) {
                  try {
                    return (await emailValidation(value)) ? Promise.resolve() : Promise.reject(new Error(formatMessage({id: 'user.error.emailExist'})),);
                  } catch (reason) {
                    return Promise.reject(reason);
                  }
                }
                return Promise.resolve();
              }
            }]}><Input maxLength={50}/></Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'birthday']} label={formatMessage({id: 'user.ext.birthday'})}><DatePicker2 format="YYYY-MM-DD"/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}>
            <Form.Item name={['ext', 'gender']} label={formatMessage({id: 'user.ext.gender'})}><Select options={['n', 'm', 'f'].map((item) => ({value: item, label: formatMessage({id: `gender.${item}`})}))}/></Form.Item>
          </Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'title']} label={formatMessage({id: 'user.ext.title'})}><Input maxLength={50}/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'location']} label={formatMessage({id: 'user.ext.location'})}><Input maxLength={50}/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['bean', 'created']} label={formatMessage({id: 'user.created'})}><DatePicker2 showTime disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'loginDate']} label={formatMessage({id: 'user.ext.loginDate'})}><DatePicker2 showTime disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'loginCount']} label={formatMessage({id: 'user.ext.loginCount'})}><Input disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'uploadedLength']} label={formatMessage({id: 'user.ext.uploadedLength'})}><Input disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'ipProvince']} label={formatMessage({id: 'user.ext.ipProvince'})}><Input disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'ip']} label={formatMessage({id: 'user.ext.ip'})}><Input disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'ipCountry']} label={formatMessage({id: 'user.ext.ipCountry'})}><Input disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'ipCity']} label={formatMessage({id: 'user.ext.ipCity'})}><Input disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'loginIp']} label={formatMessage({id: 'user.ext.loginIp'})}><Input disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'loginIpCountry']} label={formatMessage({id: 'user.ext.loginIpCountry'})}><Input disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'loginIpProvince']} label={formatMessage({id: 'user.ext.loginIpProvince'})}><Input disabled/></Form.Item></Col>
          <Col span={24} lg={12} xxl={6}><Form.Item name={['ext', 'loginIpCity']} label={formatMessage({id: 'user.ext.loginIpCity'})}><Input disabled/></Form.Item></Col>
        </Row>
        <Row gutter={16}><Col><Form.Item><Button type="primary" htmlType="submit" loading={submitLoading} disabled={!unsaved}><FormattedMessage id="save"/></Button></Form.Item></Col></Row>
      </Form>
    );
  };
  return (
    <ModelForm title="menu.user.user" queryBean={queryUser} createBean={createUser} updateBean={updateUser} deleteBean={deleteUser} unsaved={unsaved} setUnsaved={setUnsaved} formRender={formRender} showStatus={showStatus}
               deleteDisabled={(bean) => bean.id <= 1} modelProps={{width: '100%', style: {top: 20}}} {...props}/>
  );
};
export default UserForm;
