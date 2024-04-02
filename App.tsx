import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from './src/navigation';
import TodoListProvider from './src/context/todoListProvider';
// import DragableNestedList from './src/components/dragable_nested_list';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <TodoListProvider>
        <Navigation />
      </TodoListProvider>
      {/* <DragableNestedList /> */}
    </GestureHandlerRootView>
  );
};

export default App;
