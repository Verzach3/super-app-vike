import { todoItems, type TodoItem } from "../../database/todoItems";

export async function onNewTodo({ text }: TodoItem) {
  console.log("Servidor")
  todoItems.push({ text });
  return { todoItems };
}
