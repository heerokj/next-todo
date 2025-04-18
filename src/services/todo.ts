import { Todo } from "@/types/todo";
import axios from "axios";

export const getTodos = async () => {
  try {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/todos`);
    return result.data;
  } catch (error) {
    console.error("투두리스트 불러오기 실패:", error);
    throw new Error("투두리스트 불러오기 실패");
  }
};

export const addTodo = async (todo: Todo) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_PORT}/todos`,
      todo
    );
    return result;
  } catch (error) {
    console.error("투두리스트 추가 실패:", error);
    throw new Error("투두리스트 추가 실패");
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const result = await axios.delete(
      `${process.env.NEXT_PUBLIC_PORT}/todos/${id}`
    );
    return result;
  } catch (error) {
    console.error("투두리스트 삭제 실패:", error);
    throw new Error("투두리스트 삭제 실패");
  }
};

export const updateTodo = async (todo: Todo) => {
  try {
    const result = await axios.put(
      `${process.env.NEXT_PUBLIC_PORT}/todos/${todo.id}`,
      todo
    );
    return result;
  } catch (error) {
    console.error("투두리스트 수정 실패:", error);
    throw new Error("투두리스트 수정 실패");
  }
};
