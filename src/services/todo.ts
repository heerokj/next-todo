import { Todo } from "@/types/todo";
import axios from "axios";

export const getTodos = async () => {
  const result = await axios.get("http://localhost:3001/todos");
  return result.data;
};

export const addTodo = async (todo: Todo) => {
  const result = await axios.post("http://localhost:3001/todos", todo);
  return result;
};

export const deleteTodo = async (id: string) => {
  const result = await axios.delete(`http://localhost:3001/todos/${id}`);
  return result;
};

export const updateTodo = async (todo: Todo) => {
  const result = await axios.put(
    `http://localhost:3001/todos/${todo.id}`,
    todo
  );
  return result;
};
