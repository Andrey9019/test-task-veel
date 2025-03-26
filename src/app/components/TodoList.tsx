"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "@/app/api/api";
import { Todo } from "@/app/types";
import TodoForm from "./TodoForm";

export const TodoList = () => {
  const queryClient = useQueryClient();

  const {
    data: todos,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: todoListApi.getTodoList,
  });

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["todos"], (oldTodos: Todo[] | undefined) =>
        oldTodos ? oldTodos.filter((todo) => todo.id !== id) : []
      );
    },
  });

  if (isLoading) return <p className="text-xl text-center mt-4">Loaging...</p>;

  if (isError)
    return (
      <div className="flex flex-col items-center">
        <p className="text-xl text-center mt-4">
          Виникла помилка, спробуй ще раз
        </p>
        <button
          className="text-xl text-center mt-4 cursor-pointer border rounded-full p-2"
          onClick={todoListApi.getTodoList}
        >
          Try again
        </button>
      </div>
    );

  return (
    <div className="">
      <TodoForm />
      <ul className=" flex flex-col mx-auto mt-6 p-4">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className="p-2 flex items-center justify-between border-b"
          >
            <p>{todo.title}</p>
            <div className="flex items-center">
              <p
                className={`${
                  todo.completed ? "text-green-600" : "text-red-600"
                }`}
              >
                {todo.completed ? "Completed" : "Not Completed"}
              </p>
              <button
                type="button"
                className="ml-2 p-1 border rounded cursor-pointer"
                onClick={() => deleteTodoMutation.mutate(todo.id)}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
