import { addTodo, deleteTodo, getTodos, updateTodo } from "@/services/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useTodo() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    addMutation,
    deleteMutation,
    updateMutation,
  };
}
