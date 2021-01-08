import React, { FC, useState } from 'react';
import { Button, Card, Divider, Form, Input, message, Popconfirm, Space, Table } from 'antd';
import { Access, FormattedMessage, useAccess, useIntl } from 'umi';
import { useRequest } from '@@/plugin-request/request';
import { PageContainer } from '@ant-design/pro-layout';
import { DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import update from 'immutability-helper';
import { createDndContext, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableRow from '@/components/TableDraggable';
import { deleteGroup, queryGroups, updateGroupOrder } from '@/services/user';
import { parseSorter } from '@/utils/tables';
import us from '@/utils/utils.less';
import GroupForm from './GroupForm';

const GroupList: FC = () => {
  const { formatMessage } = useIntl();
  const [params, setParams] = useState<any>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<any>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<any>>([]);
  const [form] = Form.useForm();
  const access = useAccess();
  const { data, run, loading } = useRequest(() => queryGroups(params));
  const moveRow = async (dragIndex: number, hoverIndex: number) => {
    if (dragIndex === hoverIndex) return;
    const dragRow = data[dragIndex];
    const updatedData = update(data, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRow],
      ],
    });
    await updateGroupOrder(updatedData.map((item: any) => item.id));
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
    await deleteGroup(ids);
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
    { title: formatMessage({ id: 'group.name' }), dataIndex: 'name', sorter: true, width: 200 },
    {
      title: formatMessage({ id: 'group.type' }),
      dataIndex: 'type',
      sorter: true,
      render: (val: any) => <FormattedMessage id={`group.type.${val}`} />,
    },
    { title: formatMessage({ id: 'group.reputation' }), dataIndex: 'reputation' },
    {
      title: formatMessage({ id: 'group.isTrusted' }),
      dataIndex: 'isTrusted',
      render: (val: any) => (val ? <CheckOutlined /> : <CloseOutlined />),
    },
    { title: formatMessage({ id: 'group.order' }), dataIndex: 'order', sorter: true, width: 100 },
    {
      title: formatMessage({ id: 'table.action' }),
      render: (text: any, record: any) => (
        <Space split={<Divider type="vertical" />} size={0}>
          <Access accessible={access['group:edit']}>
            <a onClick={() => handleEdit(record)}>
              <FormattedMessage id="edit" />
            </a>
          </Access>
          {record.id > 10 && (
            <Access accessible={access['group:delete']}>
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
  return (
    <PageContainer header={{ title: null }}>
      <Card bordered={false}>
        <div className={us.mb3}>
          <Form form={form} onFinish={handleSearch} layout="inline">
            <Form.Item name="Q_Contains_name" label={formatMessage({ id: 'group.name' })}>
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
            <Access accessible={access['group:add']}>
              <Button type="primary" onClick={handleAdd}>
                <PlusOutlined /> <FormattedMessage id="add" />
              </Button>
            </Access>
            <Access accessible={access['group:delete']}>
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
              getCheckboxProps: (record) => ({ disabled: record.id <= 10 }),
            }}
            columns={columns as any}
            dataSource={data}
            pagination={false}
            onChange={handleTableChange}
            size="middle"
          />
        </DndProvider>
      </Card>
      <GroupForm
        formValues={formValues}
        valuesList={data ?? []}
        visible={modalVisible}
        setVisible={setModalVisible}
        refresh={run}
        moduleName="group"
      />
    </PageContainer>
  );
};
export default GroupList;
