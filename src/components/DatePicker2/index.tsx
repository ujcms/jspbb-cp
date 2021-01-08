import React, { FC } from 'react';
import { DatePicker } from 'antd';
import { DatePickerProps } from 'antd/es/date-picker';
import moment from 'moment';

const DatePicker2: FC<DatePickerProps> = (props) => {
  const { value, defaultValue, ...rest } = props;
  const dateValue = value && typeof value === 'string' ? moment(value) : value;
  const defaultDateValue =
    defaultValue && typeof defaultValue === 'string' ? moment(defaultValue) : defaultValue;
  return <DatePicker value={dateValue} defaultValue={defaultDateValue} {...rest} />;
};
export default DatePicker2;
