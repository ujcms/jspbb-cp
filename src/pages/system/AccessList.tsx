import React, {FC, useState} from 'react';
import {Button, Card, Divider, Form, message, Popconfirm, Space, Table} from 'antd';
import {Access, FormattedMessage, useAccess, useIntl} from 'umi';
import moment from 'moment';
import {useRequest} from '@@/plugin-request/request';
import {PageContainer} from '@ant-design/pro-layout';
import {ProFormText, QueryFilter} from '@ant-design/pro-form';
import {DeleteOutlined} from '@ant-design/icons';
import us from '@/utils/utils.less';
import {formatResult, getLocalSettingsPageSize, setLocalSettingsPageSize} from '@/utils/common';
import {filterDropdown, filterDropdownDate, filterIcon, getSortOrder, getTablePagination, parseFilters, parsePagination, parseSorter} from '@/utils/tables';
import ColumnsSetting, {ColumnState, filterColumns, getLocalColumnsFromStorage, mergeColumns} from '@/components/ColumnsSetting';
import {deleteAccess, queryAccessList} from '@/services/system';

const AccessList: FC = () => {
  const {formatMessage} = useIntl();
  const [params, setParams] = useState<any>({});
  const [filters, setFilters] = useState<any>({});
  const [sorter, setSorter] = useState<any>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<any>>([]);
  const [form] = Form.useForm();
  const access = useAccess();
  const {data, run, loading} = useRequest(() => queryAccessList({...params, ...parseFilters(filters), ...parseSorter(sorter), pageSize: getLocalSettingsPageSize('access')}), {formatResult});
  const handelDelete = async (ids: Array<any>) => {
    await deleteAccess(ids);
    setSelectedRowKeys(selectedRowKeys.filter((key) => ids.indexOf(key) !== -1));
    run().then(() => message.success(formatMessage({id: 'success'})));
  };
  const handleTableChange = async (currentPagination: any, currentFilters: any, currentSorter: any) => {
    setLocalSettingsPageSize('access', currentPagination.pageSize);
    await setParams({...params, ...parsePagination(currentPagination)});
    await setFilters(currentFilters);
    await setSorter(currentSorter);
    run().then();
  };
  const handleSearch = async (values: any) => {
    await setParams(values);
    run().then();
  };
  const handleReset = async () => {
    form.resetFields();
    await setParams({});
    await setFilters({});
    await setSorter({});
    run().then();
  };
  const hasSelected = selectedRowKeys.length > 0;
  const columns = [
    {title: 'ID', dataIndex: 'id', sorter: true, sortOrder: getSortOrder(sorter, 'id'), width: 80},
    {title: formatMessage({id: 'access.ext.url'}), dataIndex: ['ext', 'url'], key: 'Q_Contains_MaccessExt-url', sorter: true, sortOrder: getSortOrder(sorter, ['ext', 'url'])},
    {
      title: formatMessage({id: 'access.ext.referrer'}), dataIndex: ['ext', 'referrer'], key: 'Q_Contains_MaccessExt-referrer', sorter: true, sortOrder: getSortOrder(sorter, ['ext', 'referrer']),
      filterDropdown, filterIcon, filteredValue: filters['Q_Contains_MaccessExt-referrer'] || null, display: 'none',
    }, {
      title: formatMessage({id: 'access.ext.userAgent'}), dataIndex: ['ext', 'userAgent'], key: 'Q_Contains_MaccessExt-userAgent', sorter: true, sortOrder: getSortOrder(sorter, ['ext', 'userAgent']),
      filterDropdown, filterIcon, filteredValue: filters['Q_Contains_MaccessExt-userAgent'] || null, display: 'none',
    }, {
      title: formatMessage({id: 'access.date'}), dataIndex: 'date', key: 'Q_GE_date_DateTime,Q_LE_date_DateTime', sorter: true, sortOrder: getSortOrder(sorter, 'date'),
      filterDropdown: filterDropdownDate, filteredValue: filters['Q_GE_date_DateTime,Q_LE_date_DateTime'] || null, filterIcon,
      render: (val: any) => <>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</>,
    }, {
      title: formatMessage({id: 'access.ip'}), dataIndex: 'ip', key: 'Q_Contains_ip', sorter: true, sortOrder: getSortOrder(sorter, 'ip'),
      filterDropdown, filterIcon, filteredValue: filters.Q_Contains_ip || null,
    }, {
      title: formatMessage({id: 'access.country'}), dataIndex: 'country', key: 'Q_Contains_country', sorter: true, sortOrder: getSortOrder(sorter, 'country'),
      filterDropdown, filterIcon, filteredValue: filters.Q_Contains_country || null,
    }, {
      title: formatMessage({id: 'access.province'}), dataIndex: 'province', key: 'Q_Contains_province', sorter: true, sortOrder: getSortOrder(sorter, 'province'),
      filterDropdown, filterIcon, filteredValue: filters.Q_Contains_province || null,
    }, {
      title: formatMessage({id: 'access.city'}), dataIndex: 'city', key: 'Q_Contains_city', sorter: true, sortOrder: getSortOrder(sorter, 'city'),
      filterDropdown, filterIcon, filteredValue: filters.Q_Contains_city || null,
    }, {
      title: formatMessage({id: 'access.user'}), dataIndex: ['user', 'username'], key: 'Q_Contains_user-username', sorter: true, sortOrder: getSortOrder(sorter, ['user', 'username']),
      filterDropdown, filterIcon, filteredValue: filters['Q_Contains_user-username'] || null,
    }, {
      title: formatMessage({id: 'access.cookie'}), dataIndex: 'cookie', key: 'Q_Contains_cookie', sorter: true, sortOrder: getSortOrder(sorter, 'cookie'),
      filterDropdown, filterIcon, filteredValue: filters.Q_Contains_cookie || null, display: 'none',
    }, {
      title: formatMessage({id: 'access.source'}), dataIndex: 'source', key: 'Q_Contains_source', sorter: true, sortOrder: getSortOrder(sorter, 'source'),
      filterDropdown, filterIcon, filteredValue: filters.Q_Contains_source || null, display: 'none',
    }, {
      title: formatMessage({id: 'access.browser'}), dataIndex: 'browser', key: 'Q_Contains_browser', sorter: true, sortOrder: getSortOrder(sorter, 'browser'),
      filterDropdown, filterIcon, filteredValue: filters.Q_Contains_browser || null, display: 'none',
    }, {
      title: formatMessage({id: 'access.os'}), dataIndex: 'os', key: 'Q_Contains_os', sorter: true, sortOrder: getSortOrder(sorter, 'os'),
      filterDropdown, filterIcon, filteredValue: filters.Q_Contains_os || null, display: 'none',
    }, {
      title: formatMessage({id: 'access.device'}), dataIndex: 'device', key: 'Q_In_device', sorter: true, sortOrder: getSortOrder(sorter, 'device'),
      filteredValue: filters.Q_In_device || null, filters: [0, 1, 2, 3, 4, 5, 6].map((item) => ({text: formatMessage({id: `access.device.${item}`}), value: item,})),
      render: (val: any) => <FormattedMessage id={`access.device.${val}`}/>, display: 'none',
    }, {
      title: formatMessage({id: 'table.action'}), display: 'always',
      render: (text: any, record: any) => (
        <Space split={<Divider type="vertical"/>} size={0}>
          <Access accessible={access['access:delete']}>
            <Popconfirm title={formatMessage({id: 'confirmDelete'})} onConfirm={() => handelDelete([record.id])}>
              <a><FormattedMessage id="delete"/></a>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];
  const moduleName = 'access';
  const [localColumns, setLocalColumns] = useState<ColumnState[]>(mergeColumns(columns, getLocalColumnsFromStorage(moduleName)));
  return (
    <PageContainer header={{title: null}}>
      <Card bordered={false}>
        <QueryFilter form={form} onFinish={handleSearch} onReset={handleReset} layout="inline">
          <ProFormText name="Q_Contains_MaccessExt-url" label={formatMessage({id: 'access.ext.url'})}/>
          <ProFormText name="Q_Contains_ip" label={formatMessage({id: 'access.ip'})}/>
        </QueryFilter>
        <div className={us.mb3}>
          <Space>
            <Access accessible={access['access:delete']}>
              <Popconfirm title={formatMessage({id: 'confirmDelete'})} onConfirm={() => handelDelete(selectedRowKeys)} disabled={!hasSelected}>
                <Button disabled={!hasSelected}><DeleteOutlined/> <FormattedMessage id="delete"/></Button>
              </Popconfirm>
            </Access>
            <ColumnsSetting moduleName={moduleName} columns={columns} localColumns={localColumns} setLocalColumns={setLocalColumns}/>
            <span>(<FormattedMessage id="pagination.total" values={{total: data?.total}}/>)</span>
          </Space>
        </div>
        <Table
          rowKey="id"
          loading={loading}
          rowSelection={{
            selectedRowKeys,
            onChange: (currentSelectedRowKeys) => setSelectedRowKeys(currentSelectedRowKeys),
          }}
          columns={filterColumns(columns, localColumns)}
          dataSource={data?.list}
          pagination={getTablePagination(data, formatMessage)}
          onChange={handleTableChange}
          size="middle"
        />
      </Card>
    </PageContainer>
  );
};
export default AccessList;
