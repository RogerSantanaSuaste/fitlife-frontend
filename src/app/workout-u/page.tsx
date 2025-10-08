"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Routine = {
  id: string;
  title: string;
  duration: string;      // "25 min"
  level: "Principiante" | "Intermedio" | "Avanzado";
  favorite: boolean;
};

const INITIAL: Routine[] = [
  { id: "r1", title: "Rutina de pecho", duration: "25 min", level: "Intermedio", favorite: false },
  { id: "r2", title: "Rutina de espalda", duration: "30 min", level: "Principiante", favorite: false },
  { id: "r3", title: "Piernas y glúteos", duration: "40 min", level: "Avanzado", favorite: false },
];

export default function RutinasPage() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Routine[]>(INITIAL);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((r) =>
      `${r.title} ${r.duration} ${r.level}`.toLowerCase().includes(term)
    );
  }, [q, items]);

  const toggleFav = (id: string) =>
    setItems((arr) => arr.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r)));

  const remove = (id: string) =>
    setItems((arr) => arr.filter((r) => r.id !== id));

  return (
    <main className="app-content">
      <div className="content-wrap">
        {/* Encabezado */}
        <header className="section-head">
          <h1 className="section-title">Mis Rutinas</h1>

          <div className="section-tools">
            {/* 🔎 buscador local */}
            <div className="search-mini">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
              <input
                id="routinesSearch"
                type="search"
                placeholder="Buscar rutina..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <Link href="./create-workout-u">
              <button className="btn btn--primary" onClick={() => alert("Vamos a crear una rutina")}>
                Crear rutina
              </button>
            </Link>
          </div>
        </header>

        {/* Lista */}
        <ul className="routine-list" id="routineList">
          {filtered.map((r) => (
            <li
              key={r.id}
              className="routine"
              data-text={`${r.title} ${r.duration} ${r.level}`}
            >
              <div className="routine-main">
                <div className="routine-title">{r.title}</div>
                <div className="routine-meta">
                  <span className="badge">{r.duration}</span>
                  <span className="dot" />
                  <span>{r.level}</span>
                </div>
              </div>

              <div className="routine-actions">
                {/* ❤️ favorito controlado por React + CSS con input/label */}
                <input
                  type="checkbox"
                  id={`fav-${r.id}`}
                  className="fav"
                  hidden
                  checked={r.favorite}
                  onChange={() => toggleFav(r.id)}
                />
                <label htmlFor={`fav-${r.id}`} className="icon-like" aria-label="Favorito">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                    <path
                      className="heart-line"
                      d="M12.1 21.35l-1.1-1.01C6.14 16 3 13.13 3 9.5 3 7.01 5.01 5 7.5 5c1.54 0 3.04.73 4 1.87C12.46 5.73 13.96 5 15.5 5 17.99 5 20 7.01 20 9.5c0 3.63-3.14 6.5-7.99 10.84l-.91.79z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      className="heart-fill"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                </label>

                {/* 🗑 eliminar */}
                <button className="icon-delete" aria-label="Eliminar" onClick={() => remove(r.id)}>
                  <svg viewBox="0 0 26 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>
            </li>
          ))}

          {filtered.length === 0 && (
            <li className="routine routine--empty" aria-live="polite">
              No hay rutinas que coincidan con “{q}”.
            </li>
          )}
        </ul>
      </div>
    </main>
  );
}
