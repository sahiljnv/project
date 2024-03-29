import React from 'react';
import DragableNestedList from './src/dragable_nested_list';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <DragableNestedList />
    </GestureHandlerRootView>
  );
};

export default App;
