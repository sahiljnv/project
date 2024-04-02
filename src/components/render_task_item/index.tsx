import {Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import DragableList from '../dragable_list';
import {
  RenderItemParams,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import {TodoContext, TodoList} from '../../context/todoListProvider';
import RBSheet from 'react-native-raw-bottom-sheet';
import DataEntryScreen from '../../screens/data_entry_screen';
const RenderTaskItem = ({
  item,
  drag,
  isActive,
  getIndex,
}: RenderItemParams<TodoList>) => {
  const {setTodoList, todoList} = useContext(TodoContext);
  const [isExpand, setExpand] = useState(false);

  const itemIndex = getIndex() ?? 0;
  const ref = useRef(null);
  const buttonHandler = () => {
    console.log('todoList >>>>>>>>>>>>. ', itemIndex);

    ref.current?.open();
  };
  const addHandler = (taskName: string, taskDescription: string) => {
    console.log(itemIndex, ';lsdkfjsadlfl;');

    setTodoList(prevData => {
      return prevData.map((element, index) => {
        if (index === itemIndex) {
          return {
            ...element,
            tasks: [
              ...element.tasks,
              {name: taskName, description: taskDescription, subTasks: []},
            ],
          };
        } else {
          return element;
        }
      });
    });
    ref.current?.close();
  };
  return (
    <NestableScrollContainer>
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={drag}
        disabled={isActive}
        onPress={() => setExpand(!isExpand)}
        style={[
          styles.rowItem,
          {
            backgroundColor: 'grey',
            // height: isExpand ? 500 : 100,
            // paddingVertical: isExpand ? 50 : 0,
          },
        ]}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>{item.description}</Text>
        {isExpand ? (
          <DragableList itemData={item.tasks} todoListIndex={itemIndex} />
        ) : (
          <Button title="Add Task" onPress={buttonHandler} />
        )}
        <RBSheet
          ref={ref}
          draggable
          dragOnContent
          closeOnPressMask={true}
          height={800}
          customStyles={{}}>
          <DataEntryScreen title="Task" addHandler={addHandler} />
        </RBSheet>
      </TouchableOpacity>
    </NestableScrollContainer>
  );
};

export default RenderTaskItem;
const styles = StyleSheet.create({
  rowItem: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
