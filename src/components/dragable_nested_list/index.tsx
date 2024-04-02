import React, {useContext} from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';

import {TodoContext} from '../../context/todoListProvider';
import RenderTaskItem from '../render_task_item';
const DragableNestedList = () => {
  const {setTodoList, todoList} = useContext(TodoContext);

  return (
    <DraggableFlatList
      data={todoList}
      onDragEnd={({data}) => setTodoList(data)}
      keyExtractor={(item, index) => index.toString()}
      renderItem={RenderTaskItem}
    />
  );
};

export default DragableNestedList;
