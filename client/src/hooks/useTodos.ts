import { useEffect, useState } from "react";
import { todoApi } from "../api/todoApi";
import type { Todo } from "../types/todo";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    try {
      const data = await todoApi.fetchTodos();
      setTodos(data);
    } catch (err) {
      // エラー時はコンソールに出力して空配列をセット
      // ネットワークエラーやAPI未起動時のデバッグに役立ちます
      // eslint-disable-next-line no-console
      console.error("Failed to fetch todos:", err);
      setTodos([]);
    }
  };

  const addTodo = async () => {
    if (!title.trim()) return;

    try {
      await todoApi.addTodo(title);
      setTitle("");
      // 追加後に一覧を再取得して表示を更新
      await fetchTodos();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to add todo:", err);
    }
  };

  const toggleTodo = async (id: string, isCompleted: boolean) => {
    try {
      await todoApi.updateTodo(id, !isCompleted);
      setTodos(
        todos.map((t) =>
          t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
        )
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to update todo:", err);
    }
  };

  const deleteTodo = async (id: string) => {
    const isConfirmed = window.confirm("本当に削除しますか？");
    if (!isConfirmed) return;

    try {
      await todoApi.deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to delete todo:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    title,
    setTitle,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};