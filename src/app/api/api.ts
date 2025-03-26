import { Todo } from "@/app/types";

export const todoListApi = {
  getTodoList: async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    return (await response.json()) as Promise<Todo[]>;
  },

  addTodo: async (newTodo: Omit<Todo, "id">) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(newTodo),
    });
    if (!response.ok) {
      throw new Error("Failed to create todo");
    }
    return (await response.json()) as Promise<Todo>;
  },

  deleteTodo: async (id: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
  },
};
