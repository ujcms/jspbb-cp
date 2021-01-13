import React from "react";
import {Button, DatePicker, Input, InputNumber} from "antd";
import {FormattedMessage} from "umi";
import moment from "moment";
import {FilterDropdownProps} from "antd/lib/table/interface";
import {SearchOutlined} from "@ant-design/icons/lib";

export const parseSorter = (sorter: any) => ({'Q_OrderBy': sorter.column ? `${sorter.column.sortName || sorter.field}${sorter.order === 'descend' ? '_desc' : ''}` : undefined});
export const parsePagination = (pagination: any) => ({page: pagination.current, pageSize: pagination.pageSize});
export const getSortOrder = (sorter: any, name: string | Array<string>) => String(sorter.field) === String(name) && sorter.order;
export const filterIcon = (filtered: boolean) => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>;

export const parseFilters = (filter: any) => Object.keys(filter).reduce((obj, key) => {
  const value = filter[key];
  if (!value || value.length <= 0) return obj;
  const map = {...obj};
  const i = key.indexOf(',');
  if (i > 0 && i < key.length - 1) {
    if (value[0]) {
      const beginKey = key.substring(0, i);
      const beginValue = value[0];
      if (beginKey && beginValue) map[beginKey] = beginValue;
    }
    if (value.length > 1 && value[1]) {
      const endKey = key.substring(i + 1);
      const endValue = value[1];
      if (endKey && endValue) map[endKey] = endValue;
    }
  } else {
    map[key] = value;
  }
  return map;
}, {});

export const getTablePagination = (pagination: any, formatMessage: (descriptor: {}, values: {}) => string) => ({
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ['10', '20', '50', '100', '200', '500'],
  showTotal: (total: number) => formatMessage({'id': 'pagination.total'}, {total}),
  total: pagination?.total,
  pageSize: pagination?.pageSize,
  current: pagination?.current
});

export const filterDropdown = ({setSelectedKeys, selectedKeys, confirm, clearFilters}: FilterDropdownProps) => (
  <div style={{padding: 8}}>
    <Input value={selectedKeys[0]} onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])} onPressEnter={confirm} style={{width: 188, marginBottom: 8, display: 'block'}}/>
    <Button type="primary" onClick={confirm} size="small" style={{width: 90, marginRight: 8}}><SearchOutlined/> <FormattedMessage id="table.filterConfirm"/></Button>
    <Button onClick={clearFilters} size="small" style={{width: 90}}><FormattedMessage id="table.filterReset"/></Button>
  </div>
);

export const filterDropdownDate = ({setSelectedKeys, selectedKeys, confirm, clearFilters}: FilterDropdownProps) => (
  <div style={{padding: 8}}>
    <div style={{marginBottom: 8}}>
      <DatePicker value={selectedKeys[0] && moment(selectedKeys[0]) || undefined} onChange={value => setSelectedKeys([value?.format() || '', selectedKeys[1]])} style={{width: 170}}
                  showTime={{defaultValue: moment().startOf('day')}}/>
      <span>~</span>
      <DatePicker value={selectedKeys[1] && moment(selectedKeys[1]) || undefined} onChange={value => setSelectedKeys([selectedKeys[0], value?.format() || ''])} style={{width: 170}}
                  showTime={{defaultValue: moment().startOf('day')}}/>
    </div>
    <Button type="primary" onClick={confirm} size="small" style={{width: 90, marginLeft: 80}}><SearchOutlined/> <FormattedMessage id="table.filterConfirm"/></Button>
    <Button onClick={clearFilters} size="small" style={{width: 90, marginLeft: 11}}><FormattedMessage id="table.filterReset"/></Button>
  </div>
);

export const filterDropdownNumber = ({setSelectedKeys, selectedKeys, confirm, clearFilters}: FilterDropdownProps) => (
  <div style={{padding: 8}}>
    <div style={{marginBottom: 8}}>
      <InputNumber value={selectedKeys[0] as any} onChange={(value: number | string | undefined) => setSelectedKeys([value as any, selectedKeys[1]])} onPressEnter={confirm}/>
      <span>~</span>
      <InputNumber value={selectedKeys[1] as any} onChange={(value: number | string | undefined) => setSelectedKeys([selectedKeys[0], value as any])} onPressEnter={confirm}/>
    </div>
    <Button type="primary" onClick={confirm} size="small" style={{width: 90, marginRight: 10}}><SearchOutlined/> <FormattedMessage id="table.filterConfirm"/></Button>
    <Button onClick={clearFilters} size="small" style={{width: 90}}><FormattedMessage id="table.filterReset"/></Button>
  </div>
);
