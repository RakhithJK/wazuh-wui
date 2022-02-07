import React, { useState } from 'react';
import {
  WuiDragDropContext,
  WuiDraggable,
  WuiDroppable,
  WuiPanel,
  wuiDragDropReorder,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

const makeId = htmlIdGenerator();

const makeList = (number, start = 1) =>
  Array.from({ length: number }, (v, k) => k + start).map(el => {
    return {
      content: `Item ${el}`,
      id: makeId(),
    };
  });

export default () => {
  const [list, setList] = useState(makeList(3));
  const onDragEnd = ({ source, destination }) => {
    if (source && destination) {
      const items = wuiDragDropReorder(list, source.index, destination.index);

      setList(items);
    }
  };
  return (
    <WuiDragDropContext onDragEnd={onDragEnd}>
      <WuiDroppable droppableId="DROPPABLE_AREA" spacing="m" withPanel>
        {list.map(({ content, id }, idx) => (
          <WuiDraggable spacing="m" key={id} index={idx} draggableId={id}>
            {(provided, state) => (
              <WuiPanel hasShadow={state.isDragging}>
                {content}
                {state.isDragging && ' ✨'}
              </WuiPanel>
            )}
          </WuiDraggable>
        ))}
      </WuiDroppable>
    </WuiDragDropContext>
  );
};
