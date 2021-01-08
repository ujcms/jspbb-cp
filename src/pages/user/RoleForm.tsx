import React, { FC, useState } from 'react';
import { Button, Form, Input, Tree } from 'antd';
import { FormInstance } from 'antd/es/form';
import { FormattedMessage, useIntl } from 'umi';
import ModelForm, {
  FormRenderParams,
  modalFormLayout,
  TableModelFormProps,
} from '@/components/ModelForm';
import { createRole, deleteRole, queryRole, updateRole } from '@/services/user';
import { getValidateMessages } from '@/utils/common';
import { getNodeKeys, getPerms, getPermsTreeData } from '@/utils/perms';

const RoleForm: FC<TableModelFormProps> = (props: TableModelFormProps) => {
  const { formatMessage } = useIntl();
  const [unsaved, setUnsaved] = useState<boolean>(false);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const treeData = getPermsTreeData(formatMessage);
  const treeDataKeys = getNodeKeys(treeData);
  const handelCheck = async (keys: string[], e: any, form: FormInstance) => {
    setUnsaved(true);
    setCheckedKeys(keys);
    // 如果没有权限，不作为空串，作为null。
    const perms = getPerms(treeData, keys.concat(e.halfCheckedKeys)).join(';') || null;
    form.setFieldsValue({ perms });
  };
  const onReload = async (bean: any) =>
    setCheckedKeys(
      bean.perms ? bean.perms.split(';').filter((item: string) => treeDataKeys.includes(item)) : [],
    );
  const onInit = async () => setCheckedKeys([]);
  const formRender = ({ bean, form, onFinish, submitLoading }: FormRenderParams) => {
    return (
      <Form
        form={form}
        initialValues={bean}
        onFinish={onFinish}
        onValuesChange={() => setUnsaved(true)}
        validateMessages={getValidateMessages(formatMessage)}
        {...modalFormLayout}
      >
        <Form.Item
          name="name"
          label={formatMessage({ id: 'role.name' })}
          rules={[{ required: true }]}
        >
          <Input maxLength={100} autoFocus />
        </Form.Item>
        <Form.Item name="description" label={formatMessage({ id: 'role.description' })}>
          <Input.TextArea rows={3} maxLength={2000} />
        </Form.Item>
        <Form.Item name="perms" hidden>
          <Input />
        </Form.Item>
        <Form.Item label={formatMessage({ id: 'role.perms' })}>
          <Tree
            checkedKeys={checkedKeys}
            onCheck={(keys: any, e: any) => handelCheck(keys, e, form)}
            treeData={treeData}
            checkable
            selectable={false}
          />
        </Form.Item>
        <Form.Item
          name="order"
          initialValue={bean.order !== undefined ? undefined : 999999}
          label={formatMessage({ id: 'role.order' })}
          rules={[{ required: true }]}
        >
          <Input maxLength={10} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitLoading} disabled={!unsaved}>
            <FormattedMessage id="save" />
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return (
    <ModelForm
      title="menu.user.role"
      queryBean={queryRole}
      createBean={createRole}
      updateBean={updateRole}
      deleteBean={deleteRole}
      onReload={onReload}
      onInit={onInit}
      unsaved={unsaved}
      setUnsaved={setUnsaved}
      formRender={formRender}
      {...props}
    />
  );
};
export default RoleForm;
