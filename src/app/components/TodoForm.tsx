"use client";

import { useState } from "react";
import axios from "axios";

import { Todo } from "@/app/types";

type TodoFormProps = {
  onAddTodo: (todo: Todo) => void;
};

const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    setLoading(true);

    const itsID = new Date().getTime();

    const newTodo: Todo = {
      userId: 1,
      id: itsID,
      title,
      completed: false,
    };

    // onAddTodo(newTodo);

    try {
      const res = await axios.post<Todo>(
        "https://jsonplaceholder.typicode.comtodos",
        newTodo
      );
      onAddTodo({ ...res.data, id: itsID });

      if (res.data.id !== itsID) {
        return;
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Error adding todo");
    } finally {
      setTitle("");
      setLoading(false);
    }
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
      <button className="text-xl text-center mt-4 cursor-pointer border rounded-full p-2">
        {loading ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
};
export default TodoForm;
