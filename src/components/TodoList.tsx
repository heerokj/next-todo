"use client";
import { Todo } from "@/services/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export const getTodos = async () => {
  const result = await axios.get("http://localhost:3001/todos");
  return result.data;
};

export const deleteTodo = async (id: string) => {
  const result = await axios.delete(`http://localhost:3001/todos/${id}`);
  return result;
};

//SECTION - 리스트페이지
export default function TodoList() {
  const queryClient = useQueryClient();

  //useQuery - getTodos
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // useMutation - deleteTodo
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) return <div>로딩중입니다..</div>;
  if (isError) return <div>에러 발생..</div>;

  const handleDeleteTodo = (id: string) => {
    deleteMutation.mutate(id);
  };

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
                <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
              </li>
            ))}
        </ul>
      </section>
      <form action=""></form>
    </>
  );
}
