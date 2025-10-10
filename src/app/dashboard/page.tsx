"use client";

import React from "react";
import { routinesController } from "@/controllers/routinesController";
import { routineManagerController } from "@/controllers/routineManagerController";
import { Routine } from "@/models/routines";

export default function DashboardPage() {
  const [routines, setRoutines] = React.useState<Routine[]>([]);
  const [userId, setUserId] = React.useState("");
  React.useEffect(() => {
    const session = sessionStorage.getItem("userSession");
    if (session) {
      try {
        const user = JSON.parse(session);
        setUserId(user.userId);
      } catch (error: any) {
        console.error("Error parsing user session:", error.message);
        alert(`Error al obtener la sesión del usuario: ${error.message}`);
      }
    }
  }, []);
  React.useEffect(() => {
    if (userId) {
      routinesController.getRecommendedRoutines(userId)
        .then((data) => {
          setRoutines(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching routines:", error);
          alert(`Error al obtener las rutinas recomendadas: ${error.message}`);
        });
    }
  }, [userId]);

  // Función para seleccionar una rutina
  const selectRoutine = (routineId: string) => {
    if (!userId) return;
    try {
      routineManagerController.assignRoutineToUser(userId, routineId);
      alert("Rutina añadida a tu plan!");
    } catch (error: any) {
      console.error("Error assigning routine:", error);
      alert(`Error al asignar la rutina: ${error.message}`);
    }
  }
  return (
    <main className="app-content">
      <div className="content-wrap">
        {/* HERO */}
        <section className="hero">
          <div className="hero__copy">
            <h1>
              Logra tus metas de <span>bienestar</span> con FitLife
            </h1>
            <p>Planes de ejercicio y nutrición diseñados para ti.</p>
            <button className="btn btn--primary">Vamos</button>
          </div>
          <div className="hero__art" aria-hidden />
        </section>

        {/* TABS (radios CSS) */}
        <input type="radio" id="tabRut" name="tab" defaultChecked hidden />
        <input type="radio" id="tabCom" name="tab" hidden />

        <nav className="tabs">
          <label className="tab" htmlFor="tabRut">Rutinas</label>
          <label className="tab" htmlFor="tabCom">Comida</label>
        </nav>

        {/* LISTA RUTINAS */}
        <h2>Rutinas recomendadas</h2>
        <section id="tab-rutinas" className="cards">
          {
            routines.map(routine => (
              <article className="card">
                <header className="card__head">
                  <h3 className="card__title">{routine.nombre}</h3>

                  {/* favorito */}
                  {/*
                  <input type="checkbox" id="fav-r1" className="fav" hidden />
                  */}
                  <label htmlFor="fav-r1" className="icon-like" aria-label="Favorito">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </label>
                </header>
                <p className="card__text">
                  Descripción de la rutina {routine.nombre}
                </p>
                <div className="meta">
                  <span className="badge">Duración: {routine.duration}</span>
                  <span className="rating">Dificultad: {routine.difficulty}</span>
                </div>
                <div className="actions">
                  <button className="btn btn--ghost"
                    onClick={() => selectRoutine(routine.id)}
                  >
                    Añadir
                  </button>
                </div>
              </article>
            ))
          }
          {routines.length === 0 && (
            <p>No hay rutinas recomendadas en este momento.</p>
          )}
        </section>
        {/* TEST - LISTA DE RUTINAS */}
        <section>

          {routines.length === 0 ? (
            <p>Cargando rutinas recomendadas...</p>
          ) : (
            <ul>
              {routines.map((routine) => (
                <li key={routine.id}>{routine.nombre} - {routine.difficulty} - {routine.duration} - {routine.dias.map((dia) => <span key={dia}>{dia}</span>)} </li>
              ))}
            </ul>
          )}
        </section>
        {/* LISTA COMIDAS */}
        <section id="tab-comidas" className="cards">
          <article className="card">
            <header className="card__head">
              <h3 className="card__title">Bowl de Pollo y Quinoa</h3>

              <input type="checkbox" id="fav-c1" className="fav" hidden />
              <label htmlFor="fav-c1" className="icon-like" aria-label="Favorito">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </label>
            </header>
            <p className="card__text">Alto en proteína, bajo en grasas, ideal post-entreno.</p>
            <div className="meta">
              <span className="badge">520 kcal</span>
              <span className="chips">
                <span className="chip">P 45g</span><span className="chip">C 56g</span>
                <span className="chip">G 12g</span><span className="chip">20 min</span>
              </span>
            </div>
            <div className="actions"><button className="btn btn--ghost">Añadir</button></div>
          </article>

          <article className="card">
            <header className="card__head">
              <h3 className="card__title">Avena con Frutos Rojos</h3>

              <input type="checkbox" id="fav-c2" className="fav" hidden />
              <label htmlFor="fav-c2" className="icon-like" aria-label="Favorito">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </label>
            </header>
            <p className="card__text">Carbohidratos complejos y fibra para energía sostenida.</p>
            <div className="meta">
              <span className="badge">380 kcal</span>
              <span className="chips">
                <span className="chip">P 12g</span><span className="chip">C 62g</span>
                <span className="chip">G 8g</span><span className="chip">8 min</span>
              </span>
            </div>
            <div className="actions"><button className="btn btn--ghost">Añadir</button></div>
          </article>
        </section>
      </div>
    </main>
  );
}
