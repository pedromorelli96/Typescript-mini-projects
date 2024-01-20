import { todos } from "./store/todos";
import type { Todo } from "./types/todos";
import { elements } from "./utils/elements";
import { renderTodos } from "./utils/render-todos";

function showError(message: string): void {
    elements.errorPopup.container.classList.remove("hidden");
    elements.errorPopup.message.textContent = message;
}

function hideError(): void {
    elements.errorPopup.container.classList.add("hidden");
}

elements.form.onsubmit = (event) => {
    event.preventDefault();
    const value = elements.todoInput.value.trim();
    if (value === "") {
        showError("Todo cannot be empty");
        return;
    }

    const newTodo = {
        id: todos.length + 1,
        title: value,
        completed: false,
    } satisfies Todo;

    todos.push(newTodo);
    elements.todoInput.value = "";

    renderTodos();
};

elements.clearTodoInputButton.onclick = () => {
    elements.todoInput.value = "";
    hideError();
};

elements.errorPopup.closeButton.onclick = hideError;

elements.clearCompleted.onclick = () => {
    const incompleteTodos = todos.filter((todo) => !todo.completed);
    todos.splice(0, todos.length, ...incompleteTodos);
    renderTodos();
};
