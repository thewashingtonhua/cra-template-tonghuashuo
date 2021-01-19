import React, { useState, useCallback } from 'react';
import { TodoItem } from '../src/TodoItem/TodoItem';

export default {
  title: 'Example/TodoItem',
  component: TodoItem,
};

const SingleTemplate = (args) => <TodoItem {...args} />

export const Single = SingleTemplate.bind({});
Single.args = {
  data: {
    content: 'some random text',
    time: new Date('2021-01-03 00:23:56'),
    status: 'wip',
  },
};

const ListTemplate = (args) => args.datas.map(data => <TodoItem key={data.time} data={data} />);

export const List = ListTemplate.bind({});
List.args = {
  datas: [
    {
      content: 'some random text',
      time: new Date('2021-01-04 00:08:46'),
      status: 'wip',
    },
    {
      content: 'another random text',
      time: new Date('2021-01-05 00:11:23'),
      status: 'done',
    }
  ],
};

const DynamicListTemplate = (args) => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');

  const addTodo = useCallback((text) => {
    const todo = {
      id: Date.now().toString,
      content: text,
      time: new Date(),
      status: 'wip',
    };
    setTodos([todo, ...todos]);
  }, [todos]);

  function onChange(e) {
    setValue(e.target.value);
  }

  function submit() {
    addTodo(value);
    setValue('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    }
  }

  function onClick() {
    submit();
  }

  return (
    <div className="app">
      <h1>Web</h1>
      <div>
        <input type="text" value={value} onChange={onChange} onKeyDown={handleKeyDown}/>
        <button onClick={onClick}>Add</button>
      </div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} data={todo} />
      ))}
    </div>
  );
}
export const DynamicList = DynamicListTemplate.bind({});
DynamicList.args = {}
