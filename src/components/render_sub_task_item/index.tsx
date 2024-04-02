import React, {useContext, useRef, useState} from 'react';
import {RenderItemParams} from 'react-native-draggable-flatlist';
import RBSheet from 'react-native-raw-bottom-sheet';
import DataEntryScreen from '../../screens/data_entry_screen';
import {Task} from '../dragable_list';
import {Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import SubTaskList from '../sub_task_list';
import {TodoContext} from '../../context/todoListProvider';
type RenderSubTaskItemProps = Task & {
  todoIndex: number;
};
const RenderSubTaskItem = ({
  item,
  drag,
  isActive,
  getIndex,
}: RenderItemParams<RenderSubTaskItemProps>) => {
  const ref = useRef(null);
  const {setTodoList} = useContext(TodoContext);

  const taskIndex = getIndex() ?? 0;
  const [isExpand, setExpand] = useState(false);
  const buttonHandler = () => {
    ref.current?.open();
  };
  const addHandler = (subTaskName: string, subTaskDescription: string) => {
    setTodoList(prevData => {
      return prevData.map((element, index) => {
        if (index === item.todoIndex) {
          return {
            ...element,
            tasks: element.tasks.map((task, index) => {
              if (index === taskIndex) {
                return {
                  ...task,
                  subTasks: [
                    ...task.subTasks,
                    {name: subTaskName, description: subTaskDescription},
                  ],
                };
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
    ref.current?.close();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onLongPress={drag}
      disabled={isActive}
      onPress={() => setExpand(!isExpand)}
      style={[
        styles.rowItem,
        {
          backgroundColor: 'blue',
          height: isExpand ? 500 : 100,
          paddingVertical: isExpand ? 50 : 0,
        },
      ]}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.description}</Text>
      {isExpand ? (
        <SubTaskList
          itemData={item.subTasks}
          todoListIndex={item.todoIndex}
          taskIndex={taskIndex}
        />
      ) : (
        <Button title="Add Sub Task" onPress={buttonHandler} />
      )}
      <RBSheet
        ref={ref}
        draggable
        dragOnContent
        closeOnPressMask={true}
        height={800}
        customStyles={{}}>
        <DataEntryScreen title="Sub Task" addHandler={addHandler} />
      </RBSheet>
    </TouchableOpacity>
  );
};

export default RenderSubTaskItem;

const styles = StyleSheet.create({
  rowItem: {
    // height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: 350,
    // paddingHorizontal: 40,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
