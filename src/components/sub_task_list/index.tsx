import React, {useContext} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {TodoContext} from '../../context/todoListProvider';

type SubTask = {
  name: string;
  description: string;
};
type DragableList = {
  itemData: SubTask[];
  todoListIndex: number;
  taskIndex: number;
};
const SubTaskList = (props: DragableList) => {
  const {setTodoList} = useContext(TodoContext);

  const changeSubTaskPosition = (subTasks: SubTask[]) => {
    setTodoList(prevData => {
      return prevData.map((element, index) => {
        if (index === props.todoListIndex) {
          return {
            ...element,
            tasks: element.tasks.map((task, index) => {
              if (index === props.taskIndex) {
                return {...task, subTasks: subTasks};
              } else {
                return task;
              }
            }),
          };
        } else {
          return element;
        }
      });
    });
  };
  const renderItem = ({item, drag, isActive}: RenderItemParams<SubTask>) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={drag}
        disabled={isActive}
        style={[styles.rowItem, {backgroundColor: 'red'}]}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>{item.description}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <DraggableFlatList
      style={{width: '100%'}}
      data={props.itemData}
      onDragEnd={({data}) => changeSubTaskPosition(data)}
      keyExtractor={item => item.name}
      renderItem={renderItem}
    />
  );
};

export default SubTaskList;

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: 300,
    // paddingHorizontal: 40,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
