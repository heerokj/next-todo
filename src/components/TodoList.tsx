"use client";
import { Todo } from "@/services/todo";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const getTodos = async () => {
  try {
    const response = await fetch("http://localhost:3001/todos");
    if (!response.ok) throw Error("에러 발생");
    const todoData = await response.json();

    return todoData;
  } catch (error) {
    console.error(error);
  }
};

export default function TodoList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (isLoading) return <div>로딩중입니다..</div>;
  if (isError) return <div>에러 발생..</div>;

  return (
    <>
      <section>
        <ul>
          {data &&
            data.map((todo: Todo) => (
              <li key={todo.id}>
                <input type="checkbox" id="checkbox" name="checkbox" />
                <label htmlFor="checkbox">{todo.title}</label>
                <button>수정</button>
                <button>삭제</button>
              </li>
            ))}
        </ul>
      </section>
      <form action=""></form>
    </>
  );
}
