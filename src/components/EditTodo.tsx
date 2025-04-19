"use client";
import React, { useRef, useState } from "react";
import { Todo } from "@/types/todo";
import { v4 as uuidv4 } from "uuid";

type Prop = {
  onAddTodo: (todo: Todo) => void;
  isPending: boolean;
};

export default function EditTodo({ onAddTodo, isPending }: Prop) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");

  // title 추가 핸들러
  const handleAddTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() !== "") {
      const addTodoData = {
        id: uuidv4(),
        title: title,
        completed: false,
      };

      // 추가된 todo를 onAddTodo함수로!
      onAddTodo(addTodoData);
      setTitle("");

      //input 창 포커스
      if (inputRef.current !== null) {
        inputRef.current.disabled = false;
        inputRef.current.focus();
      }
    } else {
      alert("타이틀을 입력해주세요.");
      return;
    }
  };

  return (
    <form onSubmit={handleAddTitle} className="flex justify-between">
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        ref={inputRef}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
        className="border-1 mr-2 px-2 p-1"
      />
      <button className="border-1 p-1 px-2  bg-gray-500 hover:bg-gray-400 text-white">
        {isPending ? "추가중... " : "추가하기"}
      </button>
    </form>
  );
}
