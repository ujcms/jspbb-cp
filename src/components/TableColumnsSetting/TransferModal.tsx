import React, {FC, useState} from 'react';
import {Transfer, Modal} from 'antd';
import {useIntl} from 'umi';
import {setLocalSettingsColumns} from "@/utils/common";
import {TransferModalProps} from "@/components/TableColumnsSetting/index";

const TransferModal: FC<TransferModalProps> = ({name, columns, localColumns, setLocalColumns, visible, setVisible}: TransferModalProps) => {
  const {formatMessage} = useIntl();
  const [dataSource] = useState<any[]>(columns.filter(item => (item.dataIndex && item.display !== 'always')).map(item => ({key: item.dataIndex instanceof Array ? item.dataIndex.join('.') : item.dataIndex, title: item.title})));
  const [targetKeys, setTargetKeys] = useState<string[]>(localColumns.filter(item => dataSource.some(ds => ds.key === item)));

  const handleChange = async (keys: string[]) => {
    // 按原 columns 排序
    const sortedKeys = keys.sort((a, b) => dataSource.findIndex(item => item.key === a) - dataSource.findIndex(item => item.key === b));
    setTargetKeys(sortedKeys);
    setLocalColumns(sortedKeys);
    setLocalSettingsColumns(name, sortedKeys);
  };

  return (
    <Modal title={formatMessage({'id': 'table.columnsSetting'})} width={640} visible={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)}>
      <Transfer
        dataSource={dataSource}
        // titles={['Source', 'Target']}
        listStyle={{width: 265, height: 460}}
        targetKeys={targetKeys}
        onChange={handleChange}
        render={item => item.title}
      />
    </Modal>
  );
};
export const filterByLocalColumns = (columns: any[], localColumns: string[]) => {
  if (localColumns.length > 0) return columns.filter(item => (item.display === 'always' || localColumns.indexOf(item.dataIndex instanceof Array ? item.dataIndex.join('.') : item.dataIndex) >= 0));
  return columns.filter(item => (item.display === 'always' || item.display !== 'none'));
};
export default TransferModal;
