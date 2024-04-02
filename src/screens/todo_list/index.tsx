import {View} from 'react-native';
import React from 'react';
import DragableNestedList from '../../components/dragable_nested_list';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackProps} from '../../navigation';
type TodoListProps = NativeStackScreenProps<StackProps, 'todoList'>;
const TodoList = (props: TodoListProps) => {
  return (
    <View style={{flex: 1}}>
      <DragableNestedList />
    </View>
  );
};

export default TodoList;
