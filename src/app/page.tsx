import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <main className="">
      <h1 className="text-3xl font-bold text-center mt-4">Todo List</h1>
      <TodoList />
    </main>
  );
}
