"use client";
import { Todo } from "@/services/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import TodoItem from "./TodoItem";

const getTodos = async () => {
  const result = await axios.get("http://localhost:3001/todos");
  return result.data;
};

const addTodo = async (todo: Todo) => {
  const result = await axios.post("http://localhost:3001/todos", todo);
  return result;
};

const deleteTodo = async (id: string) => {
  const result = await axios.delete(`http://localhost:3001/todos/${id}`);
  return result;
};

const updateTodo = async (todo: Todo) => {
  const result = await axios.put(
    `http://localhost:3001/todos/${todo.id}`,
    todo
  );
  return result;
};

const getFilteredItems = (data: Todo[], filter: string) => {
  if (filter === "전체") {
    return data;
  }
  return data.filter((todo) => todo.completed === true);
};

//SECTION - 리스트페이지
export default function TodoList({ filter }: { filter: string }) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  // useQuery - getTodos
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // useMutation - addTodo
  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // useMutation - deleteTodo
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // useMutation - updateTodo
  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) return <div>로딩중입니다..</div>;
  if (isError) return <div>에러 발생..</div>;

  //삭제 핸들러
  const handleDeleteTodo = (id: string) => {
    deleteMutation.mutate(id);
  };

  //추가 핸들러
  const handleAddTodo = async () => {
    if (title.trim() !== "") {
      addMutation.mutate({
        id: uuidv4(),
        title: title,
        completed: false,
      });
      setTitle("");
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
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <button>추가하기</button>
      </form>
    </>
  );
}
