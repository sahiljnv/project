import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodoList from './screens/todo_list';
import AddTodoScreen from './screens/add_todo-screen';

export type StackProps = {
  addTodoScreen: undefined;
  todoList: undefined;
};
const Stack = createNativeStackNavigator<StackProps>();
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="addTodoScreen"
          component={AddTodoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="todoList"
          component={TodoList}
          options={{title: 'Todo List'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
