import React, { FC, useState } from 'react';
import { Button, Col, Form, Input, Radio, Row, Select } from 'antd';
import { FormattedMessage } from 'umi';
import DatePicker2 from '@/components/DatePicker2';
import { deleteQuestion, queryQuestion, updateQuestion } from '@/services/content';
import { getValidateMessages } from '@/utils/common';
import ModelForm, { FormRenderParams, TableModelFormProps } from '@/components/ModelForm';

const QuestionForm: FC<TableModelFormProps> = (props: TableModelFormProps) => {
  const [unsaved, setUnsaved] = useState<boolean>(false);
  const showStatus = (isEdit: boolean, bean: any, formatMessage: any) =>
    isEdit &&
    bean.status !== undefined && (
      <span>
        ({formatMessage({ id: 'question.status' })}:{' '}
        {formatMessage({ id: `question.status.${bean.status}` })})
      </span>
    );
  const formRender = ({ formatMessage, bean, form, onFinish, submitLoading }: FormRenderParams) => {
    return (
      <>
        <Form
          form={form}
          onFinish={onFinish}
          onValuesChange={() => setUnsaved(true)}
          validateMessages={getValidateMessages(formatMessage)}
          initialValues={{ bean, ext: bean.ext ?? {} }}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={['ext', 'title']}
                label={formatMessage({ id: 'question.ext.title' })}
                rules={[{ required: true }]}
              >
                <Input maxLength={255} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name={['ext', 'markdown']}
                label={formatMessage({ id: 'question.ext.markdown' })}
                rules={[{ required: true }]}
              >
                <Input.TextArea autoSize={{ minRows: 5, maxRows: 20 }} maxLength={10240000} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} lg={12} xxl={12}>
              <Form.Item
                name={['bean', 'status']}
                label={formatMessage({ id: 'question.status' })}
                rules={[{ required: true }]}
              >
                <Radio.Group
                  options={[0, 1, 2, 3].map((item) => ({
                    value: item,
                    label: formatMessage({ id: `question.status.${item}` }),
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name={['bean', 'created']}
                label={formatMessage({ id: 'question.created' })}
                rules={[{ required: true }]}
              >
                <DatePicker2 format="YYYY-MM-DD HH:mm:ss" />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name={['bean', 'editDate']}
                label={formatMessage({ id: 'question.editDate' })}
              >
                <DatePicker2 format="YYYY-MM-DD HH:mm:ss" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name={['bean', 'views']}
                label={formatMessage({ id: 'question.views' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={19} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name={['bean', 'ups']}
                label={formatMessage({ id: 'question.ups' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name={['bean', 'downs']}
                label={formatMessage({ id: 'question.downs' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name={['bean', 'ext', 'editCount']}
                label={formatMessage({ id: 'question.ext.editCount' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name={['bean', 'answerCount']}
                label={formatMessage({ id: 'question.answerCount' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name={['bean', 'commentCount']}
                label={formatMessage({ id: 'question.commentCount' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name={['bean', 'favoriteCount']}
                label={formatMessage({ id: 'question.favoriteCount' })}
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: formatMessage({ id: 'validation.digits' }),
                  },
                ]}
              >
                <Input maxLength={10} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name={['bean', 'user', 'username']}
                label={formatMessage({ id: 'question.user' })}
                rules={[{ required: true }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name={['bean', 'editUser', 'username']}
                label={formatMessage({ id: 'question.editUser' })}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name={['bean', 'activeUser', 'username']}
                label={formatMessage({ id: 'question.activeUser' })}
                rules={[{ required: true }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name={['ext', 'activeType']}
                label={formatMessage({ id: 'question.ext.activeType' })}
                rules={[{ required: true }]}
              >
                <Select
                  options={['asked', 'answered', 'commented', 'edited'].map((item) => ({
                    label: formatMessage({ id: `question.ext.activeType.${item}` }),
                    value: item,
                  }))}
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name={['ext', 'ip']}
                label={formatMessage({ id: 'question.ext.ip' })}
                rules={[{ required: true }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name={['ext', 'ipProvince']}
                label={formatMessage({ id: 'question.ext.ipProvince' })}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name={['ext', 'ipCountry']}
                label={formatMessage({ id: 'question.ext.ipCountry' })}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24} lg={12} xxl={6}>
              <Form.Item
                name={['ext', 'ipCity']}
                label={formatMessage({ id: 'question.ext.ipCity' })}
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitLoading}
                  disabled={!unsaved}
                >
                  <FormattedMessage id="save" />
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </>
    );
  };
  return (
    <ModelForm
      title="menu.content.question"
      queryBean={queryQuestion}
      updateBean={updateQuestion}
      deleteBean={deleteQuestion}
      unsaved={unsaved}
      setUnsaved={setUnsaved}
      formRender={formRender}
      showStatus={showStatus}
      modelProps={{ width: '100%', style: { top: 20 } }}
      {...props}
    />
  );
};
export default QuestionForm;
