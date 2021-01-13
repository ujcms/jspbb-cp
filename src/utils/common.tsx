import React from 'react';
import {Tooltip} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
import {FormattedMessage} from 'umi';

export const labelTip = (formatMessage: (descriptor: { id: string, defaultMessage?: string }) => string, {id, tipId}: { id: string; tipId?: string }) => {
  const tip = tipId || `${id}.tooltip`;
  const tooltip = formatMessage({id: tip, defaultMessage: tip});
  // 有 .tooltip 国际化内容且不为空，则显示 tooltip 。
  return tooltip && tooltip !== tip ? (
    <span>
      <FormattedMessage id={id} defaultMessage={id}/>
      <Tooltip title={tooltip}>
        <QuestionCircleOutlined style={{marginLeft: 4}}/>
      </Tooltip>
    </span>
  ) : formatMessage({id, defaultMessage: id});
};

export const getModalTitle = (formatMessage: (descriptor: { id: string, defaultMessage?: string }) => string, isEdit: boolean, id: string | number, name: string) => {
  return `${formatMessage({'id': name})} - ${isEdit ? `${formatMessage({'id': 'edit'})} (ID: ${id})` : formatMessage({'id': 'add'})}`;
};
export const formatResult = (result: any) => ({list: result.content, total: result.totalElements, pageSize: result.size, current: result.number + 1});

export const getValidateMessages = (formatMessage: (descriptor: { id: string, defaultMessage?: string }) => string) => ({
  required: formatMessage({id: 'validation.required'}),
  email: formatMessage({id: 'validation.email'}),
});

const LOCAL_SETTINGS = 'jspbb-local-settings';
const LOCAL_SETTINGS_PAGE_SIZE = 'pageSize';
const LOCAL_SETTINGS_COLUMNS = 'columns';
const LOCAL_SETTINGS_CONTINUOUS = 'continuous';


const fetchLocalSettings = () => {
  const settings = localStorage.getItem(LOCAL_SETTINGS);
  return settings ? JSON.parse(settings) : {};
};
const storeLocalSettings = (settings: any) => {
  if (settings) {
    localStorage.setItem(LOCAL_SETTINGS, JSON.stringify(settings));
  } else {
    localStorage.removeItem(LOCAL_SETTINGS);
  }
};

export const getLocalSettings = (name: string) => fetchLocalSettings()[name] || {};
export const getLocalSettingsPageSize = (name: string) => getLocalSettings(name)[LOCAL_SETTINGS_PAGE_SIZE];
export const setLocalSettingsPageSize = (name: string, pageSize: number | undefined) => {
  const settings = fetchLocalSettings();
  settings[name] = {...settings[name], pageSize};
  storeLocalSettings(settings);
};
export const getLocalSettingsColumns = (name: string) => getLocalSettings(name)[LOCAL_SETTINGS_COLUMNS] || [];
export const setLocalSettingsColumns = (name: string, columns: string[]) => {
  const settings = fetchLocalSettings();
  settings[name] = {...settings[name], columns};
  storeLocalSettings(settings);
};
export const getLocalSettingsContinuous = (name: string) => getLocalSettings(name)[LOCAL_SETTINGS_CONTINUOUS] || false;
export const setLocalSettingsContinuous = (name: string, continuous: boolean) => {
  const settings = fetchLocalSettings();
  settings[name] = {...settings[name], continuous};
  storeLocalSettings(settings);
};
