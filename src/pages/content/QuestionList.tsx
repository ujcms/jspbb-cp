import React, {FC, useState} from 'react';
import {Badge, Button, Card, Divider, Form, message, Popconfirm, Space, Table} from 'antd';
import {Access, FormattedMessage, useAccess, useIntl} from 'umi';
import moment from 'moment';
import {useRequest} from "@@/plugin-request/request";
import {PageContainer} from '@ant-design/pro-layout';
import {ProFormText, QueryFilter} from "@ant-design/pro-form";
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {deleteQuestion, queryQuestionList} from '@/services/content';
import us from '@/utils/utils.less';
import {formatResult, getLocalSettingsPageSize, setLocalSettingsPageSize} from "@/utils/common";
import {filterDropdown, filterDropdownDate, filterDropdownNumber, filterIcon, getSortOrder, getTablePagination, parseFilters, parsePagination, parseSorter} from "@/utils/tables";
import ColumnsSetting, {ColumnState, filterColumns, getLocalColumnsFromStorage, mergeColumns} from "@/components/ColumnsSetting";
import QuestionForm from "./QuestionForm";

const QuestionList: FC = () => {
  const {formatMessage} = useIntl();
  const [params, setParams] = useState<any>({});
  const [filters, setFilters] = useState<any>({});
  const [sorter, setSorter] = useState<any>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<object>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<any>>([]);
  const [form] = Form.useForm();
  const access = useAccess();
  const {data, run, loading} = useRequest(() => queryQuestionList({...params, ...parseFilters(filters), ...parseSorter(sorter), pageSize: getLocalSettingsPageSize('questions')}), {formatResult});
  const handleAdd = () => {
    setFormValues({});
    setModalVisible(true);
  };
  const handleEdit = (values: any) => {
    setFormValues(values);
    setModalVisible(true);
  };
  const handelDelete = async (ids: Array<any>) => {
    await deleteQuestion(ids);
    setSelectedRowKeys(selectedRowKeys.filter(key => ids.indexOf(key) !== -1));
    run().then(() => message.success(formatMessage({id: 'success'})));
  };
  const handleTableChange = async (currentPagination: any, currentFilters: any, currentSorter: any) => {
    setLocalSettingsPageSize('questions', currentPagination.pageSize);
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
    {title: "ID", dataIndex: 'id', sorter: true, sortOrder: getSortOrder(sorter, 'id'), width: 80},
    {
      title: formatMessage({'id': 'question.ext.title'}), dataIndex: ['ext', 'title'], key: 'Q_Contains_MquestionExt-title', sorter: true, sortName: "questionExt-title", sortOrder: getSortOrder(sorter, ['ext', 'title']),
    }, {
      title: formatMessage({'id': 'question.user'}), dataIndex: ['user', 'username'], key: 'Q_Contains_user-username', sorter: true, sortName: "user-username", sortOrder: getSortOrder(sorter, ['user', 'username']),
      filterDropdown, filterIcon, filteredValue: filters['Q_Contains_user-username'] || null,
    }, {
      title: formatMessage({'id': 'question.editUser'}), dataIndex: ['editUser', 'username'], key: 'Q_Contains_editUser__user-username',
      sorter: true, sortName: "editUser__user-username", sortOrder: getSortOrder(sorter, ['editUser', 'username']),
      filterDropdown, filterIcon, filteredValue: filters['Q_Contains_editUser__user-username'] || null, display: 'none',
    }, {
      title: formatMessage({'id': 'question.activeUser'}), dataIndex: ['activeUser', 'username'], key: 'Q_Contains_activeUser__user-username',
      sorter: true, sortName: "activeUser__user-username", sortOrder: getSortOrder(sorter, ['activeUser', 'username']),
      filterDropdown, filterIcon, filteredValue: filters['Q_Contains_activeUser__user-username'] || null, display: 'none',
    }, {
      title: formatMessage({'id': 'question.created'}), dataIndex: 'created', key: 'Q_GE_created_DateTime,Q_LE_created_DateTime', sorter: true, sortOrder: getSortOrder(sorter, 'created'),
      filterDropdown: filterDropdownDate, filteredValue: filters['Q_GE_created_DateTime,Q_LE_created_DateTime'] || null, filterIcon,
      render: (val: any) => <>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</>
    }, {
      title: formatMessage({'id': 'question.editDate'}), dataIndex: 'editDate', key: 'Q_GE_editDate_DateTime,Q_LE_editDate_DateTime', sorter: true, sortOrder: getSortOrder(sorter, 'editDate'),
      filterDropdown: filterDropdownDate, filteredValue: filters['Q_GE_created_DateTime,Q_LE_created_DateTime'] || null, filterIcon,
      render: (val: any) => <>{val && moment(val).format('YYYY-MM-DD HH:mm:ss')}</>, display: 'none',
    }, {
      title: formatMessage({'id': 'question.views'}), dataIndex: 'views', key: 'Q_GE_views_Long,Q_LE_views_Long', sorter: true, sortOrder: getSortOrder(sorter, 'views'),
      filterDropdown: filterDropdownNumber, filteredValue: filters['Q_GE_views_Long,Q_LE_views_Long'] || null, filterIcon,
    }, {
      title: formatMessage({'id': 'question.ups'}), dataIndex: 'ups', key: 'Q_GE_ups_Int,Q_LE_ups_Int', sorter: true, sortOrder: getSortOrder(sorter, 'ups'),
      filterDropdown: filterDropdownNumber, filteredValue: filters['Q_GE_ups_Int,Q_LE_ups_Int'] || null, filterIcon, display: 'none',
    }, {
      title: formatMessage({'id': 'question.downs'}), dataIndex: 'downs', key: 'Q_GE_downs_Int,Q_LE_downs_Int', sorter: true, sortOrder: getSortOrder(sorter, 'downs'),
      filterDropdown: filterDropdownNumber, filteredValue: filters['Q_GE_downs_Int,Q_LE_downs_Int'] || null, filterIcon, display: 'none',
    }, {
      title: formatMessage({'id': 'question.answerCount'}), dataIndex: 'answerCount', key: 'Q_GE_answerCount_Int,Q_LE_answerCount_Int', sorter: true, sortOrder: getSortOrder(sorter, 'answerCount'),
      filterDropdown: filterDropdownNumber, filteredValue: filters['Q_GE_answerCount_Int,Q_LE_answerCount_Int'] || null, filterIcon,
    }, {
      title: formatMessage({'id': 'question.favoriteCount'}), dataIndex: 'favoriteCount', key: 'Q_GE_favoriteCount_Int,Q_LE_favoriteCount_Int', sorter: true, sortOrder: getSortOrder(sorter, 'favoriteCount'),
      filterDropdown: filterDropdownNumber, filteredValue: filters['Q_GE_favoriteCount_Int,Q_LE_favoriteCount_Int'] || null, filterIcon, display: 'none',
    }, {
      title: formatMessage({'id': 'question.commentCount'}), dataIndex: 'commentCount', key: 'Q_GE_commentCount_Int,Q_LE_commentCount_Int', sorter: true, sortOrder: getSortOrder(sorter, 'commentCount'),
      filterDropdown: filterDropdownNumber, filteredValue: filters['Q_GE_commentCount_Int,Q_LE_commentCount_Int'] || null, filterIcon, display: 'none',
    }, {
      title: formatMessage({'id': 'question.ext.editCount'}), dataIndex: ['ext', 'editCount'], key: 'Q_GE_MquestionExt-editCount_Int,Q_LE_MquestionExt-editCount_Int',
      sorter: true, sortName: 'MquestionExt-editCount', sortOrder: getSortOrder(sorter, ['ext', 'editCount']),
      filterDropdown: filterDropdownNumber, filteredValue: filters['Q_GE_MquestionExt-editCount_Int,Q_LE_MquestionExt-editCount_Int'] || null, filterIcon, display: 'none',
    }, {
      title: formatMessage({'id': 'question.ext.activeType'}), dataIndex: ['ext', 'activeType'], key: 'Q_In_MquestionExt-activeType', sorter: true, sortOrder: getSortOrder(sorter, ['ext', 'activeType']),
      filteredValue: filters['Q_In_MquestionExt-activeType'] || null, filters: ['asked', 'answered', 'commented', 'edited'].map(item => ({text: formatMessage({'id': `question.ext.activeType.${item}`}), value: item})),
      render: (val: any) => <FormattedMessage id={`question.ext.activeType.${val}`}/>, display: 'none',
    }, {
      title: formatMessage({'id': 'question.status'}), dataIndex: 'status', key: 'Q_In_status_Int', sorter: true, sortOrder: getSortOrder(sorter, 'status'),
      filteredValue: filters.Q_In_status_Int || null, filters: [0, 1, 2, 3].map(item => ({text: formatMessage({'id': `question.status.${item}`}), value: item})),
      render: (val: any) => <Badge status={val === 0 ? 'success' : 'error'} text={formatMessage({'id': `question.status.${val}`})}/>
    }, {
      title: formatMessage({'id': 'question.ext.ip'}), dataIndex: ['ext', 'ip'], key: 'Q_Contains_MquestionExt-ip', sorter: true, sortName: "MquestionExt-ip", sortOrder: getSortOrder(sorter, ['ext', 'ip']),
      filterDropdown, filterIcon, filteredValue: filters['Q_Contains_MquestionExt-ip'] || null, display: 'none',
    }, {
      title: formatMessage({'id': 'question.ext.ipCountry'}), dataIndex: ['ext', 'ipCountry'], key: 'Q_Contains_MquestionExt-ipCountry',
      sorter: true, sortName: "MquestionExt-ipCountry", sortOrder: getSortOrder(sorter, ['ext', 'ipCountry']),
      filterDropdown, filterIcon, filteredValue: filters['Q_Contains_MquestionExt-ipCountry'] || null, display: 'none',
    }, {
      title: formatMessage({'id': 'question.ext.ipProvince'}), dataIndex: ['ext', 'ipProvince'], key: 'Q_Contains_MquestionExt-ipProvince',
      sorter: true, sortName: "MquestionExt-ipProvince", sortOrder: getSortOrder(sorter, ['ext', 'ipProvince']),
      filterDropdown, filterIcon, filteredValue: filters['Q_Contains_MquestionExt-ipProvince'] || null, display: 'none',
    }, {
      title: formatMessage({'id': 'question.ext.ipCity'}), dataIndex: ['ext', 'ipCity'], key: 'Q_Contains_MquestionExt-ipCity',
      sorter: true, sortName: "MquestionExt-ipCity", sortOrder: getSortOrder(sorter, ['ext', 'ipCity']),
      filterDropdown, filterIcon, filteredValue: filters['Q_Contains_MquestionExt-ipCity'] || null, display: 'none',
    }, {
      title: formatMessage({'id': 'table.action'}), display: 'always',
      render: (text: any, record: any) => (
        <Space split={<Divider type="vertical"/>} size={0}>
          <Access accessible={access['question:edit']}><a onClick={() => handleEdit(record)}><FormattedMessage id="edit"/></a></Access>
          <Access accessible={access['question:delete']}><Popconfirm title={formatMessage({'id': 'confirmDelete'})} onConfirm={() => handelDelete([record.id])}><a><FormattedMessage id="delete"/></a></Popconfirm></Access>
        </Space>
      ),
    }
  ];
  const moduleName = "question";
  const [localColumns, setLocalColumns] = useState<ColumnState[]>(mergeColumns(columns, getLocalColumnsFromStorage(moduleName)));
  return (
    <PageContainer header={{title: null}}>
      <Card bordered={false}>
        <QueryFilter form={form} onFinish={handleSearch} onReset={handleReset} layout="inline">
          <ProFormText name='Q_Contains_MquestionExt-title' label={formatMessage({'id': 'question.ext.title'})}/>
          <ProFormText name='Q_Contains_MquestionExt-markdown' label={formatMessage({'id': 'question.ext.markdown'})}/>
        </QueryFilter>
        <div className={us.mb3}>
          <Space>
            <Access accessible={access['question:add']}>
              <Button type="primary" onClick={handleAdd}><PlusOutlined/> <FormattedMessage id="add"/></Button>
            </Access>
            <Access accessible={access['question:delete']}>
              <Popconfirm title={formatMessage({'id': 'confirmDelete'})} onConfirm={() => handelDelete(selectedRowKeys)} disabled={!hasSelected}>
                <Button disabled={!hasSelected}><DeleteOutlined/> <FormattedMessage id="delete"/></Button>
              </Popconfirm>
            </Access>
            {/* <TableColumnsSetting name="questions" columns={columns} localColumns={localColumns} setLocalColumns={setLocalColumns}/> */}
            <ColumnsSetting moduleName={moduleName} columns={columns} localColumns={localColumns} setLocalColumns={setLocalColumns}/>
            <span>(<FormattedMessage id="pagination.total" values={{total: data?.total}}/>)</span>
          </Space>
        </div>
        <Table
          rowKey="id"
          onRow={(values: any, index?: number) => ({index, onDoubleClick: () => handleEdit(values)})}
          loading={loading}
          rowSelection={{selectedRowKeys, onChange: currentSelectedRowKeys => setSelectedRowKeys(currentSelectedRowKeys)}}
          // columns={filterByLocalColumns(columns, localColumns)}
          columns={filterColumns(columns, localColumns)}
          dataSource={data?.list}
          pagination={getTablePagination(data, formatMessage)}
          onChange={handleTableChange}
          size="middle"
        />
      </Card>
      <QuestionForm formValues={formValues} valuesList={data?.list ?? []} visible={modalVisible} setVisible={setModalVisible} refresh={run} moduleName={moduleName}/>
    </PageContainer>
  );
};
export default QuestionList;
