import { ColumnType } from 'antd/lib/table';
import { ColumnState } from '@/components/ColumnsSetting/typing';

const COLUMNS_SETTING = 'columns-setting';

function getColumnKey({ dataIndex, key }: ColumnType<any>): string | undefined {
  if (dataIndex) return Array.isArray(dataIndex) ? dataIndex.join('.') : dataIndex.toString();
  return key?.toString();
}

export const mergeColumns = (columns: any[], localColumns: ColumnState[]) => {
  const tempLocalColumns = [...localColumns];
  // 去除不存在的列
  for (let i = 0, len = tempLocalColumns.length; i < len; ) {
    if (columns.findIndex((column) => getColumnKey(column) === tempLocalColumns[i].key) < 0) {
      tempLocalColumns.splice(i, 1);
      len -= 1;
    } else {
      i += 1;
    }
  }
  // 增加未记录的列
  columns.forEach((column) => {
    const columnKey = getColumnKey(column);
    if (!columnKey) return;
    if (tempLocalColumns.findIndex((item) => item.key === columnKey) < 0) {
      tempLocalColumns.push({
        key: columnKey,
        title: column.title as string,
        show: column.display !== 'none',
      });
    }
  });
  return tempLocalColumns;
};

export const filterColumns = (columns: any[], localColumns: ColumnState[]) => {
  const tempColumns = [...columns];
  if (localColumns.length === 0) return tempColumns.filter((column) => column.display !== 'none');
  return tempColumns
    .sort((a, b) => {
      let indexA = localColumns.findIndex((item) => item.key === getColumnKey(a));
      if (indexA < 0) indexA = columns.findIndex((item) => getColumnKey(item) === getColumnKey(a));
      let indexB = localColumns.findIndex((item) => item.key === getColumnKey(b));
      if (indexB < 0) indexB = columns.findIndex((item) => getColumnKey(item) === getColumnKey(b));
      return indexA - indexB;
    })
    .filter((column) => {
      const columnState = localColumns.find((item) => item.key === getColumnKey(column));
      return !columnState || columnState.show;
    });
};

const fetchLocalColumnsSetting = () => {
  const settings = localStorage.getItem(COLUMNS_SETTING);
  return settings ? JSON.parse(settings) : {};
};
const storeLocalColumnsSetting = (settings: { [moduleName: string]: ColumnState[] }) => {
  if (settings) {
    localStorage.setItem(COLUMNS_SETTING, JSON.stringify(settings));
  } else {
    localStorage.removeItem(COLUMNS_SETTING);
  }
};

export const getLocalColumnsFromStorage = (moduleName: string) =>
  fetchLocalColumnsSetting()[moduleName] || [];
export const setLocalColumnsToStorage = (moduleName: string, columns: ColumnState[]) => {
  const settings = fetchLocalColumnsSetting();
  settings[moduleName] = columns;
  storeLocalColumnsSetting(settings);
};
