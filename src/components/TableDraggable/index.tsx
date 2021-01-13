import React from 'react';
import {useDrag, useDrop} from 'react-dnd';
import styles from './index.less';

const type = 'DraggableRow';
const DraggableRow = ({index, moveRow, className, style, ...restProps}: { index: number, moveRow: any, className: string, style: {} }) => {
  const ref = React.useRef() as any;
  const [{isOver, dropClassName}, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const {index: dragIndex} = monitor.getItem() || {};
      if (dragIndex === index) return {};
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? styles.dropOverDownward : styles.dropOverUpward,
      };
    },
    drop: (item: any) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: {type, index},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className} ${isOver ? dropClassName : ''}`}
      style={{cursor: 'move', ...style}}
      {...restProps}
    />
  );
};
export default DraggableRow;
