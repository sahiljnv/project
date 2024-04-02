import React, {useContext} from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';

import {TodoContext} from '../../context/todoListProvider';
import RenderSubTaskItem from '../render_sub_task_item';
export type Task = {
  name: string;
  description: string;
  subTasks: {
    name: string;
    description: string;
  }[];
};
type DragableList = {
  itemData: Task[];
  todoListIndex: number;
};
const DragableList = (props: DragableList) => {
  const {setTodoList} = useContext(TodoContext);

  const changeTasksPosition = (tasks: Task[]) => {
    setTodoList(prevData => {
      return prevData.map((element, index) => {
        if (index === props.todoListIndex) {
          return {
            ...element,
            tasks: tasks,
          };
        } else {
          return element;
        }
      });
    });
  };
  return (
    <DraggableFlatList
      data={props.itemData}
      onDragEnd={({data}) => changeTasksPosition(data)}
      keyExtractor={item => item.name}
      renderItem={({item, drag, getIndex, isActive}) => (
        <RenderSubTaskItem
          item={{
            description: item.description,
            name: item.name,
            subTasks: item.subTasks,
            todoIndex: props.todoListIndex,
          }}
          drag={drag}
          getIndex={getIndex}
          isActive={isActive}
        />
      )}
    />
  );
};

export default DragableList;
