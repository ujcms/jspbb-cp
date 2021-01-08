import React, { FC, useState } from 'react';
import { Badge, Button, Card, Divider, Form, message, Popconfirm, Space, Table } from 'antd';
import { Access, FormattedMessage, useAccess, useIntl } from 'umi';
import moment from 'moment';
import { useRequest } from '@@/plugin-request/request';
import { PageContainer } from '@ant-design/pro-layout';
import { ProFormText, QueryFilter } from '@ant-design/pro-form';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { deleteComment, queryCommentList } from '@/services/content';
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
import CommentForm from './CommentForm';

const CommentList: FC = () => {
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
      queryCommentList({
        ...params,
        ...parseFilters(filters),
        ...parseSorter(sorter),
        pageSize: getLocalSettingsPageSize('comments'),
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
    await deleteComment(ids);
    setSelectedRowKeys(selectedRowKeys.filter((key) => ids.indexOf(key) !== -1));
    run().then(() => message.success(formatMessage({ id: 'success' })));
  };
  const handleTableChange = async (
    currentPagination: any,
    currentFilters: any,
    currentSorter: any,
  ) => {
    setLocalSettingsPageSize('comments', currentPagination.pageSize);
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
      title: formatMessage({ id: 'comment.markdown' }),
      dataIndex: 'markdown',
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'comment.user' }),
      dataIndex: ['user', 'username'],
      key: 'Q_Contains_user-username',
      sorter: true,
      sortName: 'user-username',
      sortOrder: getSortOrder(sorter, ['user', 'username']),
    },
    {
      title: formatMessage({ id: 'comment.created' }),
      dataIndex: 'created',
      key: 'Q_GE_created_DateTime,Q_LE_created_DateTime',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'created'),
      filterDropdown: filterDropdownDate,
      filteredValue: filters['Q_GE_created_DateTime,Q_LE_created_DateTime'] || null,
      filterIcon,
      render: (val: any) => <>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</>,
    },
    {
      title: formatMessage({ id: 'comment.editUser' }),
      dataIndex: ['editUser', 'username'],
      key: 'Q_Contains_editUser__user-username',
      sorter: true,
      sortName: 'editUser__user-username',
      sortOrder: getSortOrder(sorter, ['editUser', 'username']),
      filterDropdown,
      filterIcon,
      filteredValue: filters['Q_Contains_editUser__user-username'] || null,
      display: 'none',
    },
    {
      title: formatMessage({ id: 'comment.editDate' }),
      dataIndex: 'editDate',
      key: 'Q_GE_editDate_DateTime,Q_LE_editDate_DateTime',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'editDate'),
      filterDropdown: filterDropdownDate,
      filteredValue: filters['Q_GE_created_DateTime,Q_LE_created_DateTime'] || null,
      filterIcon,
      render: (val: any) => <>{val && moment(val).format('YYYY-MM-DD HH:mm:ss')}</>,
      display: 'none',
    },
    {
      title: formatMessage({ id: 'comment.refType' }),
      dataIndex: 'refType',
      key: 'Q_In_refType',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'refType'),
      filteredValue: filters.Q_In_refType || null,
      filters: ['question', 'answer', 'comment'].map((item) => ({
        text: formatMessage({ id: `comment.refType.${item}` }),
        value: item,
      })),
      render: (val: any) => <FormattedMessage id={`comment.refType.${val}`} />,
      display: 'none',
    },
    {
      title: formatMessage({ id: 'comment.refId' }),
      dataIndex: 'refId',
      key: 'Q_GE_refId_Long,Q_LE_refId_Long',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'refId'),
      filterDropdown: filterDropdownNumber,
      filteredValue: filters['Q_GE_refId_Int,Q_LE_refId_Long'] || null,
      filterIcon,
      display: 'none',
    },
    {
      title: formatMessage({ id: 'comment.status' }),
      dataIndex: 'status',
      key: 'Q_In_status_Int',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'status'),
      filteredValue: filters.Q_In_status_Int || null,
      filters: [0, 1, 2, 3].map((item) => ({
        text: formatMessage({ id: `comment.status.${item}` }),
        value: item,
      })),
      render: (val: any) => (
        <Badge
          status={val === 0 ? 'success' : 'error'}
          text={formatMessage({ id: `comment.status.${val}` })}
        />
      ),
    },
    {
      title: formatMessage({ id: 'comment.ip' }),
      dataIndex: 'ip',
      key: 'Q_Contains_ip',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'ip'),
      filterDropdown,
      filterIcon,
      filteredValue: filters.Q_Contains_ip || null,
      display: 'none',
    },
    {
      title: formatMessage({ id: 'comment.ipCountry' }),
      dataIndex: 'ipCountry',
      key: 'Q_Contains_ipCountry',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'ipCountry'),
      filterDropdown,
      filterIcon,
      filteredValue: filters.Q_Contains_ipCountry || null,
      display: 'none',
    },
    {
      title: formatMessage({ id: 'comment.ipProvince' }),
      dataIndex: 'ipProvince',
      key: 'Q_Contains_ipProvince',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'ipProvince'),
      filterDropdown,
      filterIcon,
      filteredValue: filters.Q_Contains_ipProvince || null,
      display: 'none',
    },
    {
      title: formatMessage({ id: 'comment.ipCity' }),
      dataIndex: 'ipCity',
      key: 'Q_Contains_ipCity',
      sorter: true,
      sortOrder: getSortOrder(sorter, 'ipCity'),
      filterDropdown,
      filterIcon,
      filteredValue: filters.Q_Contains_ipCity || null,
      display: 'none',
    },
    {
      title: formatMessage({ id: 'table.action' }),
      display: 'always',
      render: (text: any, record: any) => (
        <Space split={<Divider type="vertical" />} size={0}>
          <Access accessible={access['comment:edit']}>
            <a onClick={() => handleEdit(record)}>
              <FormattedMessage id="edit" />
            </a>
          </Access>
          <Access accessible={access['comment:delete']}>
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
  const moduleName = 'comment';
  const [localColumns, setLocalColumns] = useState<ColumnState[]>(
    mergeColumns(columns, getLocalColumnsFromStorage(moduleName)),
  );
  return (
    <PageContainer header={{ title: null }}>
      <Card bordered={false}>
        <QueryFilter form={form} onFinish={handleSearch} onReset={handleReset} layout="inline">
          <ProFormText
            name="Q_Contains_markdown"
            label={formatMessage({ id: 'comment.markdown' })}
          />
          <ProFormText
            name="Q_Contains_user-username"
            label={formatMessage({ id: 'comment.user' })}
          />
        </QueryFilter>
        <div className={us.mb3}>
          <Space>
            <Access accessible={access['comment:add']}>
              <Button type="primary" onClick={handleAdd}>
                <PlusOutlined /> <FormattedMessage id="add" />
              </Button>
            </Access>
            <Access accessible={access['comment:delete']}>
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
          onRow={(values: any, index?: number) => ({
            index,
            onDoubleClick: () => handleEdit(values),
          })}
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
      <CommentForm
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
export default CommentList;
