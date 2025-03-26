"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "@/app/api/api";
import { Todo } from "@/app/types";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const itsID = new Date().getTime();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.addTodo,
    onSuccess: (newTodo) => {
      queryClient.setQueryData(["todos"], (oldTodos: Todo[] | undefined) => [
        ...(oldTodos || []),

        { ...newTodo, id: itsID },
      ]);
      setTitle("");
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) return;

    createTodoMutation.mutate({
      userId: 1,
      title,
      completed: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-1/3 mx-auto mt-10"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Text a new todo..."
        className=" p-2 border-b border-l"
      />
      <button
        type="submit"
        className="text-xl text-center mt-4 cursor-pointer border rounded-full p-2"
      >
        {createTodoMutation.isPending ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
};
export default TodoForm;
