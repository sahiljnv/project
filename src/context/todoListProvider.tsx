import React, {Dispatch, createContext, useEffect, useState} from 'react';

export type TodoContextProps = {
  todoList: TodoList[];
  setTodoList: Dispatch<React.SetStateAction<TodoList[]>>;
};
export const TodoContext = createContext<TodoContextProps>(
  {} as TodoContextProps,
);
export type TodoList = {
  name: string;
  description: string;
  tasks: {
    name: string;
    description: string;
    subTasks: {
      name: string;
      description: string;
    }[];
  }[];
};
type Props = {
  children?: React.ReactNode;
};

const TodoListProvider = ({children}: Props) => {
  const [todoList, setTodoList] = useState<TodoList[]>([]);
  useEffect(() => {
    console.log('inside context add todoLIst l.................');
  }, [todoList]);
  const value = {
    todoList,
    setTodoList,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoListProvider;
