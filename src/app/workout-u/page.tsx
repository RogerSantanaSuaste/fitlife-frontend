"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Routine } from "@/models/routines";
import { routineManagerController } from "@/controllers/routineManagerController";
import { AssignedRoutinesResponse } from "@/models/routineManager";

export default function RutinasPage() {
  const [rutinas, setRutinas] = useState<Routine[]>([]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const session = localStorage.getItem("userSession");
  const toggleFav = (id: string) =>
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));

  const removeMyRoutine = (routineId: string) => {
    const user = session ? JSON.parse(session) : null;
    if (!user) {
      alert("Usuario no autenticado");
      return;
    }
    const userId = user.userId;
    routineManagerController.unassignRoutine(userId, routineId)
      .then(() => {
        setRutinas((arr) => arr.filter((r) => r.id !== routineId));
      })
      .catch((error) => {
        alert(`Error al eliminar rutina: ${error.message}`);
      });
  }


  useEffect(() => {
    if (!session) return;
    const fetchRoutines = async () => {
      const user = JSON.parse(session)
      const userId = user.userId || null;
      if (!userId) {
        alert("Usuario no autenticado");
        return;
      }
      try {
        const assignedRoutinesResponse: AssignedRoutinesResponse[] = await routineManagerController.getAssignedRoutines(userId);
        const routines: Routine[] = assignedRoutinesResponse.map(ar => ({
          ...ar.routineDetails
        }))
        setRutinas(routines);
      } catch (error: any) {
        alert(`Error fetching routines: ${error.message}`);
      }
    }
    fetchRoutines();
  }, [session]);

  return (
    <main className="app-content">
      <div className="content-wrap">
        {/* Encabezado */}
        <header className="section-head">
          <h1 className="section-title">Mis Rutinas</h1>
          <div className="section-tools">
            <Link href="/create-workout-u" className="btn btn--primary">
              Crear rutina
            </Link>
          </div>
        </header>

        {/* Lista */}
        <ul className="routine-list" id="routineList">
          {rutinas.map((r) => {
            const fav = !!favorites[r.id];

            return (
              <li
                key={r.id}
                className="routine"
                data-text={`${r.nombre} ${r.dias.join(" ")}`}
              >
                <div className="routine-main">
                  <div className="routine-title">{r.nombre}</div>
                  <p className="card__text" style={{ margin: "6px 0 10px" }}>
                    {r.ejercicios.length} ejercicios • {r.alimentos.length} comidas
                  </p>
                </div>

                <div className="routine-actions">
                  {/* ❤️ favorito */}
                  <input
                    type="checkbox"
                    id={`fav-${r.id}`}
                    className="fav"
                    hidden
                    checked={fav}
                    onChange={() => toggleFav(r.id)}
                  />
                  <label htmlFor={`fav-${r.id}`} className="icon-like" aria-label="Favorito">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                      <path
                        className="heart-line"
                        d="M12.1 21.35l-1.1-1.01C6.14 16 3 13.13 3 9.5 3 7.01 5.01 5 7.5 5c1.54 0 3.04.73 4 1.87C12.46 5.73 13.96 5 15.5 5 17.99 5 20 7.01 20 9.5c0 3.63-3.14 6.5-7.99 10.84l-.91.79z"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"
                      />
                      <path
                        className="heart-fill"
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      />
                    </svg>
                  </label>

                  {/* 🗑 eliminar */}
                  <button className="icon-delete" aria-label="Eliminar" onClick={() => removeMyRoutine(r.id)}>
                    <svg viewBox="0 0 26 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  </button>

                  {/* Ver -> redirige SIEMPRE a /workout */}
                  <Link
                    href={`/workout/${r.id}`}
                    className="btn btn--ghost btn--pill"
                    aria-label={`Ver rutina ${r.nombre}`}
                  >
                    Ver
                  </Link>
                </div>
              </li>
            );
          })}

          {rutinas.length === 0 && (
            <li className="routine routine--empty" aria-live="polite">
              No hay rutinas disponibles.
            </li>
          )}
        </ul>
      </div>
    </main>
  );
}
