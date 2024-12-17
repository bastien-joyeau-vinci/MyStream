import { Plus } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import "./App.css";

// ---------------------------TODO LIST AVEC REACT TYPESCRIPT : ADD DELETE CHECKED-------------------------------- //

export default function App() {
// -----------MouseTracker------------ //
  const [checked, setChecked] = useState(true);
  const handleChecked2 = (value: boolean) => {
    setChecked(value);
  };
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if(!checked) return;

    const onMouseMove = (e: { clientX: number; clientY: number; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }

    console.log('add event listener');
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      console.log('remove event listener');
      document.removeEventListener('mousemove', onMouseMove);
    }

  }, [checked]);
  // -----------MouseTracker------------ //



  const [todos, setTodos] = useState([
    {
      todo: "Faire les courses",
      id: Date.now(),
      completed: false,
    },
  ]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fromData = new FormData(e.currentTarget);
    const todo = fromData.get("todo") as string;

    const newTodo = {
      todo: todo,
      id: Date.now(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    e.currentTarget.reset();
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleChecked = (id: number) => {
    const newtodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newtodos);
  };

  return (
    <div>


      <div className="">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          handleChecked2(!checked);
        }}
        className="checkbox checkbox-primary"
      />
        <h1 className = "text-primary">Mouse position</h1>
        <p className="text-info">X: {mousePosition.x}</p>
        <p className="text-warning">Y: {mousePosition.y}</p>
      </div>

      <br />
      <br />
      <br />
      <br />

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label className="input input-bordered flex items-center gap-2">
          <input name="todo" type="text" className="grow" placeholder="Todo" />
          <button type="submit" className="btn btn-outline btn-sm">
            <Plus size={16} />
          </button>
        </label>
      </form>

      <div className="mt-8 flex flex-col gap-4">
        {todos.map((todo) => (
          <Todo
            todo={todo}
            key={todo.id}
            onDelete={() => {
              handleDelete(todo.id);
            }}
            onToggleCompleted={() => {
              handleChecked(todo.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

const Todo = (props: {
  todo: { todo: string; id: number; completed: boolean };
  onDelete?: () => void;
  onToggleCompleted?: () => void;
}) => {
  return (
    <div className="flex items-center gap-4">
      <input
        type="checkbox"
        checked={props.todo.completed}
        onChange={() => {
          props.onToggleCompleted?.();
        }}
        className="checkbox checkbox-success"
      />

      <p>{props.todo.todo}</p>
      <button
        onClick={() => {
          props.onDelete?.();
        }}
        className="btn btn-error btn-sm"
      >
        Delete
      </button>
    </div>
  );
};
