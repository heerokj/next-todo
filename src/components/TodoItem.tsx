import { Todo } from "@/types/todo";
import React, { useState } from "react";

type Props = {
  todo: Todo;
  onChange: (todo: Todo, e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (id: string) => void;
  onUpdate: (todo: Todo) => void;
};

export default function TodoItem({
  todo,
  onChange,
  onDelete,
  onUpdate,
}: Props) {
  const [edited, setEdited] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);

  const handleUpdateTitle = () => {
    setEdited(true);
  };

  const handleEditTodo = (todo: Todo) => {
    if (updatedTitle.trim() !== "") {
      const updatedTodoData = { ...todo, title: updatedTitle };
      //update된 todo를 onUpdate함수로!
      onUpdate(updatedTodoData);
    }
    setEdited(false);
  };

  if (edited) {
    return (
      <li className="flex justify-between border-b-1 py-1">
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          className="p-2"
        />
        <button
          onClick={() => handleEditTodo(todo)}
          className="border-1 p-1 px-2  bg-blue-800 hover:bg-blue-700 text-white"
        >
          완료
        </button>
      </li>
    );
  }

  return (
    <li className="flex justify-between border-b-1 py-1">
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          id="checkbox"
          onChange={(e) => onChange(todo, e)}
          checked={todo.completed}
        />
        <label htmlFor="checkbox">{todo.title}</label>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleUpdateTitle}
          className={`${
            todo.completed === true
              ? ``
              : `border-1 p-1 px-2  bg-blue-800 hover:bg-blue-700 text-white`
          } `}
        >
          {todo.completed === true ? "" : "수정"}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="border-1 p-1 px-2 bg-red-800 hover:bg-red-700 text-white"
        >
          삭제
        </button>
      </div>
    </li>
  );
}
