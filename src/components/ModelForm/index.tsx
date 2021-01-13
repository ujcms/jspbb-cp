import React, {FC, useEffect, useState} from 'react';
import {Button, Form, message, Modal, Popconfirm, Space, Switch, Tag, Tooltip} from 'antd';
import {FormattedMessage, useIntl} from 'umi';
import {
  getLocalSettingsContinuous,
  getModalTitle,
  setLocalSettingsContinuous,
} from '@/utils/common';
import {Access, useAccess} from '@@/plugin-access/access';
import us from '@/utils/utils.less';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons/lib';
import {FormInstance} from 'antd/es/form';

export interface FormRenderParams {
  bean: any;
  isEdit: boolean;
  formatMessage: any;
  form: FormInstance;
  submitLoading: boolean;
  onFinish: (values: any) => Promise<any>;
}

export interface TableModelFormProps {
  formValues: any;
  valuesList: Array<any>;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  refresh: () => Promise<any>;
  moduleName: string;
}

export interface ModelFormProps {
  title: string;
  formValues: any;
  valuesList: Array<any>;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  refresh: () => Promise<any>;
  moduleName: string;
  unsaved: boolean;
  setUnsaved: (unsaved: boolean) => void;
  showStatus?: (isEdit: boolean, bean: any, formatMessage: any) => any;

  queryBean: (id: number) => Promise<any>;
  createBean?: (data: any) => Promise<any>;
  updateBean: (data: any) => Promise<any>;
  deleteBean: (ids: number[]) => Promise<any>;
  deleteDisabled?: (bean: any) => boolean;
  formRender: (params: FormRenderParams) => React.ReactNode;
  onReload?: (bean: any) => Promise<any>;
  onInit?: () => Promise<any>;
  modelProps?: any;
  formProps?: any;
}

export const modalFormLayout = {labelCol: {span: 5}, wrapperCol: {span: 18}};

const ModelForm: FC<ModelFormProps> = ({title, formValues, valuesList, visible, setVisible, refresh, moduleName, unsaved, setUnsaved, showStatus, queryBean, createBean, updateBean, deleteBean, deleteDisabled, onInit, onReload, formRender, modelProps}) => {
  const {formatMessage} = useIntl();
  const [form] = Form.useForm();
  const access = useAccess();
  const [list, setList] = useState<number[]>([]);
  const [bean, setBean] = useState<any>({});
  const index = list.indexOf(bean.id);
  const isEdit: boolean = bean.id !== undefined;
  const [continuous, setContinuous] = useState<boolean>(getLocalSettingsContinuous(moduleName));
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [prevLoading, setPrevLoading] = useState<boolean>(false);
  const [nextLoading, setNextLoading] = useState<boolean>(false);
  const reload = async (id?: number) => {
    let tempBean = {};
    if (id !== undefined) tempBean = await queryBean(id);
    await setBean(tempBean);
    setUnsaved(false);
    if (onReload) await onReload(tempBean);
    form.resetFields();
    return tempBean;
  };
  const init = async () => {
    await setBean({});
    if (onInit) await onInit();
    form.resetFields();
    reload(formValues.id).then();
    setList(valuesList.map((value) => value.id));
  };
  useEffect(() => {
    if (visible) init().then();
  }, [visible]);
  const modalTitle = getModalTitle(formatMessage, isEdit, bean.id, title);
  const onContinuousChange = (checked: boolean) => {
    setContinuous(checked);
    setLocalSettingsContinuous(moduleName, checked);
  };
  const onCancel = () => setVisible(false);
  const onPrev = async () => {
    setPrevLoading(true);
    await reload(list[index - 1]);
    setPrevLoading(false);
  };
  const onNext = async () => {
    setNextLoading(true);
    await reload(list[index + 1]);
    setNextLoading(false);
  };
  const onDelete = async () => {
    setDeleteLoading(true);
    await deleteBean([bean.id]);
    if (continuous && list.length > 1) {
      list.splice(index, 1);
      await reload(list[index >= list.length ? list.length - 1 : index]);
    } else {
      setVisible(false);
    }
    setDeleteLoading(false);
    refresh().then();
    message.success(formatMessage({id: 'success'}));
  };
  const onFinish = async (values: any) => {
    setSubmitLoading(true);
    if (isEdit) await updateBean({...values, id: bean.id}); else if (!isEdit && createBean) await createBean(values);
    if (continuous) await reload(bean.id); else setVisible(false);
    setSubmitLoading(false);
    refresh().then();
    message.success(formatMessage({id: 'success'}));
  };
  return (
    <Modal title={modalTitle} width={768} visible={visible} onCancel={onCancel} maskClosable={!unsaved} footer={null} {...modelProps}>
      <Space className={us.mb3}>
        {isEdit ? (<>
          <Access accessible={access['role:add']}><Button type="primary" onClick={() => reload()}><PlusOutlined/><FormattedMessage id="add"/></Button></Access>
          <Access accessible={access['role:delete']}>
            <Popconfirm title={formatMessage({id: 'confirmDelete'})} onConfirm={onDelete} disabled={deleteDisabled ? deleteDisabled(bean) : false}>
              <Button disabled={deleteDisabled ? deleteDisabled(bean) : false} loading={deleteLoading}><DeleteOutlined/> <FormattedMessage id="delete"/></Button>
            </Popconfirm>
          </Access>
          <Button onClick={onPrev} loading={prevLoading} disabled={index <= 0}><FormattedMessage id="form.prev"/></Button>
          <Button onClick={onNext} loading={nextLoading} disabled={index >= list.length - 1}><FormattedMessage id="form.next"/></Button>
        </>) : null}
        <Button type="primary" onClick={onCancel}><FormattedMessage id="back"/></Button>
        <Tooltip title={formatMessage({id: 'form.continuous'})}><Switch defaultChecked={continuous} checked={continuous} onChange={onContinuousChange} size="small"/></Tooltip>
        {unsaved && <Tag color="red"><FormattedMessage id="unsaved"/></Tag>}
        {showStatus && showStatus(isEdit, bean, formatMessage)}
      </Space>
      {formRender({bean, formatMessage, form, submitLoading, isEdit, onFinish})}
    </Modal>
  );
};
export default ModelForm;
