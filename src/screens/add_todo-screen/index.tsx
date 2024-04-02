import {View, Button} from 'react-native';
import React, {useContext, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TodoContext} from '../../context/todoListProvider';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackProps} from '../../navigation';
import DataEntryScreen from '../data_entry_screen';
type AddTodoScreenProps = NativeStackScreenProps<StackProps, 'addTodoScreen'>;

const AddTodoScreen = (props: AddTodoScreenProps) => {
  const ref = useRef(null);
  const {setTodoList} = useContext(TodoContext);

  const addHandler = (name: string, description: string) => {
    console.log('add todo screent call llllllllllll');

    setTodoList(prevData => {
      return [...prevData, {name: name, description: description, tasks: []}];
    });

    ref?.current?.close();
    props.navigation.navigate('todoList');
  };
  const buttonHandler = () => {
    console.log('button handler call ');

    ref.current?.open();
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Add Todo List" onPress={buttonHandler} />
      <RBSheet
        ref={ref}
        draggable
        dragOnContent
        closeOnPressMask={true}
        height={800}
        customStyles={{}}>
        <DataEntryScreen title="todo" addHandler={addHandler} />
      </RBSheet>
    </View>
  );
};

export default AddTodoScreen;
