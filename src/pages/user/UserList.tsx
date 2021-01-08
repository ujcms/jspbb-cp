import React, { FC, useState } from 'react';
import { Badge, Button, Card, Divider, Form, message, Popconfirm, Space, Table } from 'antd';
import { Access, FormattedMessage, useAccess, useIntl } from 'umi';
import moment from 'moment';
import { useRequest } from '@@/plugin-request/request';
import { PageContainer } from '@ant-design/pro-layout';
import { ProFormText, QueryFilter } from '@ant-design/pro-form';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { deleteUser, queryUsers } from '@/services/user';
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
import UserForm from './UserForm';

const UserList: FC = () => {
  const { formatMessage } = useIntl();
  const [params, setParams] = useState<any>({});
  const [filters, setFilters] = useState<any>({});
  const [sorter, setSorter] = useState<any>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<object>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<any>>([]);
  const [form] = Form.useForm();
  const access = useAccess();
  const { data, run, loading } = useRequest(
    () =>
      queryUsers({
        ...params,
        ...parseFilters(filters),
        ...parseSorter(sorter),
        pageSize: getLocalSettingsPageSize('users'),
      }),
    { formatResult },
  );
  const handleAdd = () => {
    setFormValues({});
    setModalVisible(true);
  };
  const handleEdit = (values: any) => {
    setFormValues(values);
    setModalVisible(true);
  };
  const handelDelete = async (ids: Array<any>) => {
    await deleteUser(ids);
    setSelectedRowKeys(selectedRowKeys.filter((key) => ids.indexOf(key) !== -1));
    run().then(() => message.success(formatMessage({ id: 'success' })));
  };
  const handleTableChange = async (
    currentPagination: any,
    currentFilters: any,
    currentSorter: any,
  ) => {
    setLocalSettingsPageSize('users', currentPagination.pageSize);
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
      title: formatMessage({ id: 'user.username' }),
      dataIndex: 'username',
      key: 'Q_Contains_username',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'username'),
      filterDropdown,
      filterIcon,
      filteredValue: filters.Q_Contains_username || null,
    },
    {
      title: formatMessage({ id: 'user.group' }),
      dataIndex: ['group', 'name'],
      key: 'Q_EQ_group-name',
      sorter: true,
      sortName: 'group-name',
      sortOrder: getSortOrder(sorter, ['group', 'name']),
      filterDropdown,
      filterIcon,
      filteredValue: filters.Q_Contains_username || null,
    },
    {
      title: formatMessage({ id: 'user.mobile' }),
      dataIndex: 'mobile',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'mobile'),
    },
    {
      title: formatMessage({ id: 'user.email' }),
      display: 'none',
      dataIndex: 'email',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'email'),
    },
    {
      title: formatMessage({ id: 'user.ext.loginDate' }),
      dataIndex: ['ext', 'loginDate'],
      key: 'Q_GE_MuserExt-loginDate_DateTime,Q_LE_MuserExt-loginDate_DateTime',
      sorter: true,
      sortName: 'MuserExt-loginDate',
      sortOrder: getSortOrder(sorter, ['ext', 'loginDate']),
      filterDropdown: filterDropdownDate,
      filteredValue:
        filters['Q_GE_MuserExt-loginDate_DateTime,Q_LE_MuserExt-loginDate_DateTime'] || null,
      filterIcon,
      render: (val: any) => <>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</>,
    },
    {
      title: formatMessage({ id: 'user.ext.loginCount' }),
      dataIndex: ['ext', 'loginCount'],
      key: 'Q_GE_MuserExt-loginCount_Int,Q_LE_Mext__userExt-loginCount_Int',
      sorter: true,
      sortName: 'MuserExt-loginCount',
      sortOrder: getSortOrder(sorter, ['ext', 'loginCount']),
      filterDropdown: filterDropdownNumber,
      filteredValue:
        filters['Q_GE_Mext__userExt-loginCount_Int,Q_LE_Mext__userExt-loginCount_Int'] || null,
      filterIcon,
    },
    {
      title: formatMessage({ id: 'user.status' }),
      dataIndex: 'status',
      key: 'Q_In_status_Int',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'status'),
      filteredValue: filters.Q_In_status_Int || null,
      filters: [0, 1].map((item) => ({
        text: formatMessage({ id: `user.status.${item}` }),
        value: item,
      })),
      render: (val: any) => (
        <Badge
          status={val === 0 ? 'success' : 'error'}
          text={formatMessage({ id: `user.status.${val}` })}
        />
      ),
    },
    {
      title: formatMessage({ id: 'table.action' }),
      display: 'always',
      render: (text: any, record: any) => (
        <Space split={<Divider type="vertical" />} size={0}>
          <Access accessible={access['user:edit']}>
            <a onClick={() => handleEdit(record)}>
              <FormattedMessage id="edit" />
            </a>
          </Access>
          {record.id > 1 && (
            <Access accessible={access['user:delete']}>
              <Popconfirm
                title={formatMessage({ id: 'confirmDelete' })}
                onConfirm={() => handelDelete([record.id])}
              >
                <a>
                  <FormattedMessage id="delete" />
                </a>
              </Popconfirm>
            </Access>
          )}
        </Space>
      ),
    },
  ];
  const moduleName = 'user';
  const [localColumns, setLocalColumns] = useState<ColumnState[]>(
    mergeColumns(columns, getLocalColumnsFromStorage(moduleName)),
  );
  return (
    <PageContainer header={{ title: null }}>
      <Card bordered={false}>
        <QueryFilter form={form} onFinish={handleSearch} onReset={handleReset} layout="inline">
          {/* <ProFormText name='Q_Contains_username' label={formatMessage({'id': 'user.username'})}/> */}
          <ProFormText name="Q_Contains_mobile" label={formatMessage({ id: 'user.mobile' })} />
          <ProFormText name="Q_Contains_email" label={formatMessage({ id: 'user.email' })} />
        </QueryFilter>
        <div className={us.mb3}>
          <Space>
            <Access accessible={access['user:add']}>
              <Button type="primary" onClick={handleAdd}>
                <PlusOutlined /> <FormattedMessage id="add" />
              </Button>
            </Access>
            <Access accessible={access['user:delete']}>
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
            {/* <TableColumnsSetting name="users" columns={columns} localColumns={localColumns} setLocalColumns={setLocalColumns}/> */}
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
          onRow={(values: any, index?: number) => ({
            index,
            onDoubleClick: () => handleEdit(values),
          })}
          loading={loading}
          rowSelection={{
            selectedRowKeys,
            onChange: (currentSelectedRowKeys) => setSelectedRowKeys(currentSelectedRowKeys),
            getCheckboxProps: (record) => ({ disabled: record.id <= 1 }),
          }}
          // columns={filterByLocalColumns(columns, localColumns)}
          columns={filterColumns(columns, localColumns)}
          dataSource={data?.list}
          pagination={getTablePagination(data, formatMessage)}
          onChange={handleTableChange}
          size="middle"
        />
      </Card>
      <UserForm
        formValues={formValues}
        valuesList={data?.list ?? []}
        visible={modalVisible}
        setVisible={setModalVisible}
        refresh={run}
        moduleName={moduleName}
      />
    </PageContainer>
  );
};
export default UserList;
