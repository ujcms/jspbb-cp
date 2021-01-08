import React, { FC, useState } from 'react';
import { Button, Card, Divider, Form, Input, message, Popconfirm, Space, Table } from 'antd';
import { Access, FormattedMessage, useAccess, useIntl } from 'umi';
import { useRequest } from '@@/plugin-request/request';
import { PageContainer } from '@ant-design/pro-layout';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import update from 'immutability-helper';
import { createDndContext, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableRow from '@/components/TableDraggable';
import { deleteRole, queryRoles, updateRoleOrder } from '@/services/user';
import { parseSorter } from '@/utils/tables';
import us from '@/utils/utils.less';
import RoleForm from './RoleForm';
// import {TableEditableCell, TableEditableRow} from "@/components/TableEditable";

const RoleList: FC = () => {
  const { formatMessage } = useIntl();
  const [params, setParams] = useState<any>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<any>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<any>>([]);
  const [form] = Form.useForm();
  const access = useAccess();
  const { data, run, loading } = useRequest(() => queryRoles(params));
  const moveRow = async (dragIndex: number, hoverIndex: number) => {
    if (dragIndex === hoverIndex) return;
    const dragRow = data[dragIndex];
    const updatedData = update(data, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRow],
      ],
    });
    await updateRoleOrder(updatedData.map((item: any) => item.id));
    run().then(() => message.success(formatMessage({ id: 'success' })));
  };
  const handleAdd = () => {
    setFormValues({});
    setModalVisible(true);
  };
  const handleEdit = (values: any) => {
    setFormValues(values);
    setModalVisible(true);
  };
  const handelDelete = async (ids: Array<any>) => {
    await deleteRole(ids);
    setSelectedRowKeys(selectedRowKeys.filter((key) => ids.indexOf(key) !== -1));
    run().then(() => message.success(formatMessage({ id: 'success' })));
  };
  const handleTableChange = async (pagination: any, filters: any, sorter: any) => {
    await setParams({ ...params, ...parseSorter(sorter) });
    run().then();
  };
  const handleSearch = async (values: any) => {
    await setParams(values);
    run().then();
  };
  const handleReset = async () => {
    await setParams({});
    run().then();
    form.resetFields();
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns = [
    { title: 'ID', dataIndex: 'id', sorter: true, width: 80 },
    {
      title: formatMessage({ id: 'role.name' }),
      dataIndex: 'name',
      sorter: true,
      width: 200,
      // onCell: (record: any) => ({dataIndex: 'name', rules: [{required: true, message: formatMessage({'id': 'validation.required'})}], maxLength: 100, editable: true, record, handleUpdate})
    },
    {
      title: formatMessage({ id: 'role.description' }),
      dataIndex: 'description',
      // onCell: (record: any) => ({dataIndex: 'description', maxLength: 255, editable: true, record, handleUpdate})
    },
    {
      title: formatMessage({ id: 'role.order' }),
      dataIndex: 'order',
      sorter: true,
      width: 100,
      // onCell: (record: any) => ({dataIndex: 'order', type: 'number', rules: [{required: true, message: formatMessage({'id': 'validation.required'})}], maxLength: 9, editable: true, record, handleUpdate})
    },
    {
      title: formatMessage({ id: 'table.action' }),
      render: (text: any, record: any) => (
        <Space split={<Divider type="vertical" />} size={0}>
          <Access accessible={access['role:edit']}>
            <a onClick={() => handleEdit(record)}>
              <FormattedMessage id="edit" />
            </a>
          </Access>
          <Access accessible={access['role:delete']}>
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
  return (
    <PageContainer header={{ title: null }}>
      <Card bordered={false}>
        <div className={us.mb3}>
          <Form form={form} onFinish={handleSearch} layout="inline">
            <Form.Item name="Q_Contains_name" label={formatMessage({ id: 'role.name' })}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  <FormattedMessage id="search" />
                </Button>
                <Button onClick={handleReset}>
                  <FormattedMessage id="reset" />
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
        <div className={us.mb3}>
          <Space>
            <Access accessible={access['role:add']}>
              <Button type="primary" onClick={handleAdd}>
                <PlusOutlined /> <FormattedMessage id="add" />
              </Button>
            </Access>
            <Access accessible={access['role:delete']}>
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
            <span>
              (<FormattedMessage id="pagination.total" values={{ total: data?.length }} />)
            </span>
          </Space>
        </div>
        <DndProvider
          manager={React.useRef(createDndContext(HTML5Backend)).current.dragDropManager as any}
        >
          <Table
            rowKey="id"
            // components={{body: {row: TableEditableRow, cell: TableEditableCell}}}
            components={{ body: { row: DraggableRow } }}
            onRow={(values: any, index?: number) => ({
              index,
              moveRow,
              onDoubleClick: () => handleEdit(values),
            })}
            loading={loading}
            rowSelection={{
              selectedRowKeys,
              onChange: (currentSelectedRowKeys) => setSelectedRowKeys(currentSelectedRowKeys),
            }}
            columns={columns as any}
            dataSource={data}
            pagination={false}
            onChange={handleTableChange}
            size="middle"
          />
        </DndProvider>
      </Card>
      <RoleForm
        formValues={formValues}
        valuesList={data ?? []}
        visible={modalVisible}
        setVisible={setModalVisible}
        refresh={run}
        moduleName="role"
      />
    </PageContainer>
  );
};
export default RoleList;
