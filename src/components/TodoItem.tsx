"use client";
import { Todo } from "@/services/todo";
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
      <li>
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
        <button onClick={() => handleEditTodo(todo)}>완료</button>
      </li>
    );
  }

  return (
    <li>
      <input
        type="checkbox"
        id="checkbox"
        onChange={(e) => onChange(todo, e)}
        checked={todo.completed}
      />
      <label htmlFor="checkbox">{todo.title}</label>
      <button onClick={handleUpdateTitle}>
        {todo.completed === true ? "" : "수정"}
      </button>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
}
