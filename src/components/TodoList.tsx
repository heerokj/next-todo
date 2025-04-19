"use client";
import TodoItem from "./TodoItem";
import { Todo } from "@/types/todo";
import useTodo from "@/hooks/useTodo";
import EditTodo from "./EditTodo";

const getFilteredItems = (data: Todo[], filter: string) => {
  if (filter === "전체") {
    return data;
  }
  return data.filter((todo) => todo.completed === true);
};

//SECTION - 리스트페이지
export default function TodoList({ filter }: { filter: string }) {
  const {
    data,
    isLoading,
    isError,
    addMutation,
    deleteMutation,
    updateMutation,
  } = useTodo();

  if (isLoading) return <div>로딩중입니다.. 잠시만 기다려주세요😊</div>;
  if (isError) return <div>에러 발생..</div>;

  //삭제 핸들러
  const handleDeleteTodo = (id: string) => {
    deleteMutation.mutate(id);
  };

  //추가 핸들러
  const handleAddTodo = (addTodoData: Todo) => {
    addMutation.mutate(addTodoData);
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
      <EditTodo onAddTodo={handleAddTodo} isPending={addMutation.isPending} />
    </>
  );
}
