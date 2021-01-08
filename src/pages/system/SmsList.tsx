import React, { FC, useState } from 'react';
import { Badge, Button, Card, Divider, Form, message, Popconfirm, Space, Table } from 'antd';
import { Access, FormattedMessage, useAccess, useIntl } from 'umi';
import moment from 'moment';
import { useRequest } from '@@/plugin-request/request';
import { PageContainer } from '@ant-design/pro-layout';
import { ProFormText, QueryFilter } from '@ant-design/pro-form';
import { DeleteOutlined } from '@ant-design/icons';
import us from '@/utils/utils.less';
import { formatResult, getLocalSettingsPageSize, setLocalSettingsPageSize } from '@/utils/common';
import {
  filterDropdown,
  filterDropdownDate,
  filterDropdownNumber,
  filterIcon,
  getSortOrder,
  getTablePagination,
  parseFilters,
  parsePagination,
  parseSorter,
} from '@/utils/tables';
import ColumnsSetting, {
  ColumnState,
  filterColumns,
  getLocalColumnsFromStorage,
  mergeColumns,
} from '@/components/ColumnsSetting';
import { deleteSms, querySmsList } from '@/services/system';

const SmsList: FC = () => {
  const { formatMessage } = useIntl();
  const [params, setParams] = useState<any>({});
  const [filters, setFilters] = useState<any>({});
  const [sorter, setSorter] = useState<any>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<any>>([]);
  const [form] = Form.useForm();
  const access = useAccess();
  const { data, run, loading } = useRequest(
    () =>
      querySmsList({
        ...params,
        ...parseFilters(filters),
        ...parseSorter(sorter),
        pageSize: getLocalSettingsPageSize('sms'),
      }),
    { formatResult },
  );
  const handelDelete = async (ids: Array<any>) => {
    await deleteSms(ids);
    setSelectedRowKeys(selectedRowKeys.filter((key) => ids.indexOf(key) !== -1));
    run().then(() => message.success(formatMessage({ id: 'success' })));
  };
  const handleTableChange = async (
    currentPagination: any,
    currentFilters: any,
    currentSorter: any,
  ) => {
    setLocalSettingsPageSize('sms', currentPagination.pageSize);
    await setParams({ ...params, ...parsePagination(currentPagination) });
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
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'id'),
      width: 80,
    },
    {
      title: formatMessage({ id: 'sms.type' }),
      dataIndex: 'type',
      key: 'Q_In_type',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'type'),
      filteredValue: filters.Q_In_type || null,
      filters: ['mobile', 'email'].map((item) => ({
        text: formatMessage({ id: `sms.type.${item}` }),
        value: item,
      })),
      render: (val: any) => <FormattedMessage id={`sms.type.${val}`} />,
    },
    {
      title: formatMessage({ id: 'sms.usage' }),
      dataIndex: 'usage',
      key: 'Q_In_usage',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'usage'),
      filteredValue: filters.Q_In_usage || null,
      filters: ['signUp', 'changeEmail', 'changeMobile', 'resetPassword'].map((item) => ({
        text: formatMessage({ id: `sms.usage.${item}` }),
        value: item,
      })),
      render: (val: any) => <FormattedMessage id={`sms.usage.${val}`} />,
    },
    {
      title: formatMessage({ id: 'sms.receiver' }),
      dataIndex: 'receiver',
      key: 'Q_Contains_receiver',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'receiver'),
      filterDropdown,
      filterIcon,
      filteredValue: filters.Q_Contains_receiver || null,
    },
    {
      title: formatMessage({ id: 'sms.sendDate' }),
      dataIndex: 'sendDate',
      key: 'Q_GE_sendDate_DateTime,Q_LE_sendDate_DateTime',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'sendDate'),
      filterDropdown: filterDropdownDate,
      filteredValue: filters['Q_GE_sendDate_DateTime,Q_LE_sendDate_DateTime'] || null,
      filterIcon,
      render: (val: any) => <>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</>,
    },
    {
      title: formatMessage({ id: 'sms.code' }),
      dataIndex: 'code',
      key: 'Q_Contains_code',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'code'),
      filterDropdown,
      filterIcon,
      filteredValue: filters.Q_Contains_code || null,
      display: 'none',
    },
    {
      title: formatMessage({ id: 'sms.tryCount' }),
      dataIndex: 'tryCount',
      key: 'Q_GE_tryCount_Int,Q_LE_tryCount_Int',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'tryCount'),
      filterDropdown: filterDropdownNumber,
      filteredValue: filters['Q_GE_tryCount_Int,Q_LE_tryCount_Int'] || null,
      filterIcon,
    },
    {
      title: formatMessage({ id: 'sms.status' }),
      dataIndex: 'status',
      key: 'Q_In_status_Int',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'status'),
      filteredValue: filters.Q_In_status_Int || null,
      filters: [0, 1, 2, 3, 4].map((item) => ({
        text: formatMessage({ id: `sms.status.${item}` }),
        value: item,
      })),
      render: (val: any) => (
        <Badge
          status={val === 1 ? 'success' : 'error'}
          text={formatMessage({ id: `sms.status.${val}` })}
        />
      ),
    },
    {
      title: formatMessage({ id: 'sms.ip' }),
      dataIndex: 'ip',
      key: 'Q_Contains_ip',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'ip'),
    },
    {
      title: formatMessage({ id: 'sms.ipCountry' }),
      dataIndex: 'country',
      key: 'Q_Contains_country',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'country'),
      filterDropdown,
      filterIcon,
      filteredValue: filters.Q_Contains_country || null,
      display: 'none',
    },
    {
      title: formatMessage({ id: 'sms.ipProvince' }),
      dataIndex: 'province',
      key: 'Q_Contains_province',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'province'),
      filterDropdown,
      filterIcon,
      filteredValue: filters.Q_Contains_province || null,
      display: 'none',
    },
    {
      title: formatMessage({ id: 'sms.ipCity' }),
      dataIndex: 'city',
      key: 'Q_Contains_city',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'city'),
      filterDropdown,
      filterIcon,
      filteredValue: filters.Q_Contains_city || null,
      display: 'none',
    },
    {
      title: formatMessage({ id: 'table.action' }),
      display: 'always',
      render: (text: any, record: any) => (
        <Space split={<Divider type="vertical" />} size={0}>
          <Access accessible={access['sms:delete']}>
            <Popconfirm
              title={formatMessage({ id: 'confirmDelete' })}
              onConfirm={() => handelDelete([record.id])}
            >
              <a>
                <FormattedMessage id="delete" />
              </a>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];
  const moduleName = 'sms';
  const [localColumns, setLocalColumns] = useState<ColumnState[]>(
    mergeColumns(columns, getLocalColumnsFromStorage(moduleName)),
  );
  return (
    <PageContainer header={{ title: null }}>
      <Card bordered={false}>
        <QueryFilter form={form} onFinish={handleSearch} onReset={handleReset} layout="inline">
          <ProFormText name="Q_Contains_ip" label={formatMessage({ id: 'sms.ip' })} />
        </QueryFilter>
        <div className={us.mb3}>
          <Space>
            <Access accessible={access['sms:delete']}>
              <Popconfirm
                title={formatMessage({ id: 'confirmDelete' })}
                onConfirm={() => handelDelete(selectedRowKeys)}
                disabled={!hasSelected}
              >
                <Button disabled={!hasSelected}>
                  <DeleteOutlined /> <FormattedMessage id="delete" />
                </Button>
              </Popconfirm>
            </Access>
            <ColumnsSetting
              moduleName={moduleName}
              columns={columns}
              localColumns={localColumns}
              setLocalColumns={setLocalColumns}
            />
            <span>
              (<FormattedMessage id="pagination.total" values={{ total: data?.total }} />)
            </span>
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
export default SmsList;
