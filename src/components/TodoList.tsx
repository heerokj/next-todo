"use client";

import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "./TodoItem";
import { Todo } from "@/types/todo";
import useTodo from "@/hooks/useTodo";

const getFilteredItems = (data: Todo[], filter: string) => {
  if (filter === "전체") {
    return data;
  }
  return data.filter((todo) => todo.completed === true);
};

//SECTION - 리스트페이지
export default function TodoList({ filter }: { filter: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");

  const {
    data,
    isLoading,
    isError,
    addMutation,
    deleteMutation,
    updateMutation,
  } = useTodo();

  if (isLoading) return <div>로딩중입니다..</div>;
  if (isError) return <div>에러 발생..</div>;

  //삭제 핸들러
  const handleDeleteTodo = (id: string) => {
    deleteMutation.mutate(id);
  };

  //추가 핸들러
  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() !== "") {
      addMutation.mutate({
        id: uuidv4(),
        title: title,
        completed: false,
      });
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

  //completed 변경 핸들러
  const handleChange = (todo: Todo, e: React.ChangeEvent<HTMLInputElement>) => {
    updateMutation.mutate({
      id: todo.id,
      title: todo.title,
      completed: e.target.checked,
    });
  };

  //title 변경 핸들러
  const handleUpdateTodo = (updatedTodoData: Todo) => {
    updateMutation.mutate({
      id: updatedTodoData.id,
      title: updatedTodoData.title,
      completed: updatedTodoData.completed,
    });
  };

  const filteredData = getFilteredItems(data, filter);

  return (
    <>
      <section>
        <ul>
          {filteredData &&
            filteredData.map((todo: Todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onChange={handleChange}
                onDelete={handleDeleteTodo}
                onUpdate={handleUpdateTodo}
              />
            ))}
        </ul>
      </section>
      <form onSubmit={handleAddTodo}>
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
          추가하기
        </button>
      </form>
    </>
  );
}
