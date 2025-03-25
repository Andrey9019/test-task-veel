"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { Todo } from "@/app/types";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get<Todo[]>(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      setTodos(res.data);
    } catch {
      setError("Error load todo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <p className="text-xl text-center mt-4">Loaging...</p>;

  if (error)
    return (
      <div className="flex flex-col items-center">
        <p className="text-xl text-center mt-4">{error}</p>
        <button
          className="text-xl text-center mt-4 cursor-pointer border rounded-full p-2"
          onClick={fetchTodos}
        >
          Try again
        </button>
      </div>
    );

  return (
    <ul className=" flex flex-col mx-auto mt-6 p-4">
      {todos.map((todo) => (
        <li key={todo.id} className="p-2 flex justify-between border-b">
          <p>{todo.title}</p>
          <p
            className={`${todo.completed ? "text-green-600" : "text-red-600"}`}
          >
            {todo.completed ? "Completed" : "Not Completed"}
          </p>
        </li>
      ))}
    </ul>
  );
};
export default TodoList;
