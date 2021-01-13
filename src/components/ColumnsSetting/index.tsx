import React, {FC, useContext} from 'react';
import {useIntl} from '@ant-design/pro-provider';
import {SettingOutlined} from '@ant-design/icons';
import {Checkbox, ConfigProvider, Popover, Tooltip} from 'antd';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import DnDItem from './DndItem';
import DragIcon from './DragIcon';
import {filterColumns, getLocalColumnsFromStorage, mergeColumns, setLocalColumnsToStorage} from "./utils";
import {ColumnState} from "./typing";
import './index.less';

const CheckboxListItem: React.FC<{
  moduleName: string;
  column: ColumnState;
  className?: string;
  localColumns: ColumnState[];
  setLocalColumns: (localColumns: ColumnState[]) => void;
}> = ({moduleName, column, className, localColumns, setLocalColumns}) => {
  return (
    <span className={`${className}-list-item`} key={column.key}>
      <DragIcon/>
      <Checkbox
        onChange={(e) => {
          const tempLocalColumns = [...localColumns];
          const index = tempLocalColumns.findIndex(item => item.key === column.key);
          if (index < 0) return;
          tempLocalColumns[index].show = e.target.checked;
          setLocalColumns(tempLocalColumns);
          setLocalColumnsToStorage(moduleName, tempLocalColumns);
        }}
        checked={column.show}
      >
        {column.title}
      </Checkbox>
    </span>
  );
};

const CheckboxList: React.FC<{
  moduleName: string;
  className?: string;
  localColumns: ColumnState[];
  setLocalColumns: (localColumns: ColumnState[]) => void;
}> = ({moduleName, className, localColumns, setLocalColumns}) => {
  if (localColumns.length <= 0) return null;
  const move = (id: string, targetIndex: number) => {
    const tempLocalColumns = [...localColumns];
    const index = tempLocalColumns.findIndex(item => item.key === id);
    if (index < 0) return;
    const tempColumn = tempLocalColumns[index];
    tempLocalColumns.splice(index, 1);
    if (targetIndex === 0) {
      tempLocalColumns.unshift(tempColumn);
    } else {
      tempLocalColumns.splice(targetIndex, 0, tempColumn);
    }
    setLocalColumns(tempLocalColumns);
    setLocalColumnsToStorage(moduleName, tempLocalColumns);
  };
  return (
    <div className={`${className}-list`}>
      <DndProvider backend={HTML5Backend}>
        {localColumns.map((column, index) => {
          return (
            <DnDItem index={index} id={column.key} key={column.key} end={move}>
              <CheckboxListItem
                moduleName={moduleName}
                column={column}
                localColumns={localColumns}
                setLocalColumns={setLocalColumns}
                className={className}
              />
            </DnDItem>
          );
        })}
      </DndProvider>
    </div>
  );
};

const ColumnsSetting: FC<{
  moduleName: string;
  columns: any[];
  localColumns: ColumnState[];
  setLocalColumns: (localColumns: ColumnState[]) => void;
}> = ({moduleName, columns, localColumns, setLocalColumns}) => {
  const setAllChecked = (checked: boolean = true) => {
    const tempLocalColumns = [...localColumns];
    for (let i = 0, len = tempLocalColumns.length; i < len; i += 1) tempLocalColumns[i].show = checked;
    setLocalColumns(tempLocalColumns);
    setLocalColumnsToStorage(moduleName, tempLocalColumns);
  };
  const resetColumns = () => {
    const tempLocalColumns = mergeColumns(columns, []);
    setLocalColumns(tempLocalColumns);
    setLocalColumnsToStorage(moduleName, tempLocalColumns);
  };
  // 选中的 key 列表
  const selected = localColumns.filter(column => column.show);
  // 是否已经选中
  const indeterminate = selected.length > 0 && selected.length !== localColumns.length;
  const checked = selected.length > 0 && selected.length === localColumns.length;
  const intl = useIntl();
  const {getPrefixCls} = useContext(ConfigProvider.ConfigContext);
  const className = getPrefixCls('pro-table-column-setting');
  return (
    <Popover
      arrowPointAtCenter
      title={
        <div className={`${className}-title`}>
          <Checkbox indeterminate={indeterminate} checked={checked} onChange={(e) => setAllChecked(e.target.checked)}>{intl.getMessage('tableToolBar.columnDisplay', '列展示')}</Checkbox>
          <a onClick={() => resetColumns()}>{intl.getMessage('tableToolBar.reset', '重置')}</a>
        </div>
      }
      overlayClassName={`${className}-overlay`}
      trigger="click"
      placement="bottomRight"
      content={<CheckboxList moduleName={moduleName} className={className} localColumns={localColumns} setLocalColumns={setLocalColumns}/>}
    >
      <Tooltip title={intl.getMessage('tableToolBar.columnSetting', '列设置')}>
        <SettingOutlined/>
      </Tooltip>
    </Popover>
  );
};
export default ColumnsSetting;
export {mergeColumns, filterColumns, getLocalColumnsFromStorage, ColumnState};
