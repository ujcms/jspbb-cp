import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, InputNumber } from 'antd';
import styles from './index.less';

const EditableContext = React.createContext<any>({});

export const TableEditableRow: React.FC = ({ index, ...props }: any) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} className={`${props.className} ${styles.editableRow}`} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  dataIndex: string;
  type?: string;
  rules?: [];
  maxLength?: number;
  record: any;
  editable: boolean;
  handleUpdate: (record: any) => Promise<any>;
  children: React.ReactNode;
}

export const TableEditableCell: React.FC<EditableCellProps> = ({
  dataIndex,
  type,
  rules,
  maxLength,
  record,
  editable,
  handleUpdate,
  children,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) inputRef?.current?.focus();
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      if (record[dataIndex] !== values[dataIndex]) await handleUpdate({ ...record, ...values });
      toggleEdit();
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;

  if (editable) {
    const inputProps = { ref: inputRef, onPressEnter: save, onBlur: save, maxLength };
    childNode = editing ? (
      <Form.Item name={dataIndex} rules={rules} style={{ margin: 0 }}>
        {type === 'number' ? (
          <InputNumber {...inputProps} onDoubleClick={(e) => e.preventDefault()} />
        ) : (
          <Input {...inputProps} />
        )}
      </Form.Item>
    ) : (
      <div
        className={styles.editableCellValueWrap}
        onClick={toggleEdit}
        style={{ paddingRight: 24 }}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
