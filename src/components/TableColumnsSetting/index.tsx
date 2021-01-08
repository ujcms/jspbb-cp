import React, { FC, useState } from 'react';
import { Button } from 'antd';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import { SettingOutlined } from '@ant-design/icons';
import TransferModal from './TransferModal';

interface TableColumnsSettingProps {
  name: string;
  columns: any[];
  localColumns: string[];
  setLocalColumns: (localColumns: string[]) => void;
}

export interface TransferModalProps extends TableColumnsSettingProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const TableColumnsSetting: FC<TableColumnsSettingProps> = (props: TableColumnsSettingProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>
        <SettingOutlined /> <FormattedMessage id="table.columnsSetting" />
      </Button>
      <TransferModal visible={visible} setVisible={setVisible} {...props} />
    </>
  );
};
export { filterByLocalColumns } from './TransferModal';
export default TableColumnsSetting;
