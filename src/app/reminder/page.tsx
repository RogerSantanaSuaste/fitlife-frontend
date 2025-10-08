"use client";

import { useState } from "react";

type Todo = {
  id: string;
  title: string;
  dataText: string;
  done: boolean;
};

const INITIAL: Todo[] = [
  { id: "t1", title: "Hacer pierna", dataText: "hacer pierna tren inferior gimnasio 7am", done: false },
  { id: "t2", title: "Hacer pecho", dataText: "hacer pecho press banca 18:00 fuerza", done: false },
  { id: "t3", title: "Tomar agua (2L)", dataText: "tomar agua 2 litros hidratación cada hora", done: false },
  { id: "t4", title: "Hacer pierna", dataText: "hacer pierna tren inferior gimnasio 7am", done: false },
  { id: "t5", title: "Hacer pecho", dataText: "hacer pecho press banca 18:00 fuerza", done: false },
  { id: "t6", title: "Tomar agua (2L)", dataText: "tomar agua 2 litros hidratación cada hora", done: false },
];

export default function RecordatoriosPage() {
  const [todos, setTodos] = useState<Todo[]>(INITIAL);

  const toggle = (id: string) =>
    setTodos((arr) => arr.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id: string) =>
    setTodos((arr) => arr.filter((t) => t.id !== id));

  return (
    <main className="app-content">
      <div className="content-wrap">
        {/* Encabezado */}
        <header className="section-head">
          <h1 className="section-title">Recordatorios</h1>
        </header>

        {/* Lista */}
        <ul className="todo-list" id="todoList">
          {todos.map((todo) => (
            <li key={todo.id} className="todo" data-text={todo.dataText}>
              <div className="todo-left">
                {/* completado */}
                <input
                  type="checkbox"
                  id={`done-${todo.id}`}
                  className="done"
                  hidden
                  checked={todo.done}
                  onChange={() => toggle(todo.id)}
                />
                <label
                  htmlFor={`done-${todo.id}`}
                  className="chk"
                  aria-label="Completar"
                />
                <div className="todo-title">{todo.title}</div>
              </div>

              <div className="todo-right">
                {/* eliminar */}
                <button
                  className="icon-delete"
                  aria-label="Eliminar"
                  onClick={() => remove(todo.id)}
                >
                  <svg
                    viewBox="0 0 26 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
