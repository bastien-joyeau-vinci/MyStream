import React from 'react';

interface TodoProps {
  todo: {
    todo: string;
    id: number;
    completed: boolean;
  };
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <div>
      <p>{todo.todo}</p>
    </div>
  );
};

export default Todo;