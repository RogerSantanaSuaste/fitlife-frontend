"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { healthController } from "@/controllers/healthController";
import { routineManagerController } from "@/controllers/routineManagerController";
import { RecommendedFoodsAndExercises } from "@/models/userHealth";
import { Food } from "@/models/foods";
import { Exercise } from "@/models/exercises";

export default function CreateWorkoutUPage() {
  const router = useRouter();
  const [recommendedFoods, setRecommendedFoods] = useState<Food[] | null>(null);
  const [recommendedExercises, setRecommendedExercises] = useState<Exercise[] | null>(null);
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [nombre, setNombre] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [dias, setDias] = useState<("LUNES" | "MARTES" | "MIERCOLES" | "JUEVES" | "VIERNES" | "SABADO" | "DOMINGO")[]>(["LUNES", "MIERCOLES", "VIERNES"]);

  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (session) {
      try {
        const user = JSON.parse(session);
        setUserId(user.userId || null);
      } catch (error: any) {
        console.error("Error parsing user session:", error.message);
        alert(`Error al obtener la sesión del usuario: ${error.message}`);
      }
    }
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (!userId) return;
        const recommendations = await healthController.getRecommendedFoodsAndExercises(userId);
        setRecommendedFoods(recommendations.alimentos);
        setRecommendedExercises(recommendations.ejercicios);
      } catch (error) {
        console.error("Error al obtener recomendaciones:", error);
      }
    };

    fetchRecommendations();
  }, [userId]);

  // Función para guardar la rutina
  const saveRoutine = async () => {
    if (!userId) return;

    const routineData = {
      usuario_id: userId,
      nombre,
      dias,
      ejercicios: selectedExercises,
      alimentos: selectedFoods,
    };

    try {
      await routineManagerController.createRoutine(routineData);
      alert("Rutina guardada con éxito");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al guardar la rutina:", error);
      alert("Error al guardar la rutina");
    }
  };

  return (
    <main className="app-content" role="main">
      <div className="content-wrap">
        <header className="section-head">
          <div>
            <h1 className="section-title">Crear rutina</h1>
            <p className="section-subtitle">
              Estructura base para seleccionar ejercicios, ajustar series/reps y duración.
            </p>
          </div>
        </header>

        <section className="builder-grid">
          {/* Catálogo (placeholder) */}
          <aside className="catalog">
            <div className="catalog-head">
              <input className="form-input" placeholder="Buscar ejercicio…" disabled />

            </div>

            <ul className="catalog-list">
              {
                recommendedExercises && recommendedExercises.length > 0 ? (
                  recommendedExercises.map((ex) => (
                    <li className="catalog-item" key={ex.id}>
                      <img className="catalog-thumb" src={ex.gif_url} alt={ex.nombre} />
                      <div className="catalog-body">
                        <h3 className="catalog-name">{ex.nombre}</h3>
                        <p>Categoria: {ex.categoria}</p>
                        <p>Nivel: {ex.nivel}</p>
                        <p>Series Recomendadas: {ex.series_recomendadas}</p>
                        <p>Repeticiones Recomendas: {ex.repeticiones_recomendadas}</p>
                        <p>Musculo Principal: {ex.musculo_principal}</p>
                        <p>Musculo Secundario: {ex.musculo_secundario}</p>
                        {ex.contraindicaciones.length > 0 && (
                          <div>
                            <strong>Contraindicaciones:</strong>
                            <ul>
                              {ex.contraindicaciones && ex.contraindicaciones.map((c) => (
                                <li key={c}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {ex.instrucciones.length > 0 && (
                          <div>
                            <strong>Instrucciones:</strong>
                            <ol>
                              {ex.instrucciones && ex.instrucciones.map((inst, index) => (
                                <li key={index}>{inst}</li>
                              ))}
                            </ol>
                          </div>
                        )}
                        <button
                          className="btn btn--small btn--primary"
                          type="button"
                          onClick={() => setSelectedExercises((prev) => {
                            if (prev.find((e) => e.id === ex.id)) return prev;
                            return [...prev, ex];
                          })}
                        >
                          Añadir
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="empty">No hay ejercicios recomendados.</li>
                )}
            </ul>
            <ul className="catalog-list">
              {
                recommendedFoods && recommendedFoods.length > 0 ? (
                  recommendedFoods.map((food) => (
                    <li className="catalog-item" key={food.id}>
                      <img className="catalog-thumb" src={food.imagen} alt={food.nombre} />
                      <div className="catalog-body">
                        <h3 className="catalog-name">{food.nombre}</h3>
                        <button
                          className="btn btn--small btn--primary"
                          type="button"
                          onClick={() => setSelectedFoods((prev) => {
                            if (prev.find((f) => f.id === food.id)) return prev;
                            return [...prev, food];
                          })}
                        >
                          Añadir
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="empty">No hay alimentos recomendados.</li>
                )}
            </ul>
          </aside>

          {/* Constructor (placeholder) */}
          <section className="card builder">
            <div className="builder-row">
              <div className="form-group">
                <label className="form-label">Título</label>
                <input className="form-input" placeholder="Ej. Full Body Express" onChange={(e) => {
                  setNombre(e.target.value);
                }} />
              </div>


              {/* Duración (placeholder) 
              <div className="form-group">
                <label className="form-label">Duración</label>
                <div className="unit-input">
                  <input className="form-input" type="number" min={5} max={180} step={5} placeholder="25" />
                  <span className="unit">min</span>
                </div>
              </div>*/}
            </div>

            <div className="divider" />
            {/* Nivel (placeholder) 
            <div className="form-group">
                <label className="form-label">Nivel</label>
                <div className="segmented" role="tablist" aria-label="Nivel">
                  <span>
                    <input id="niv-bajo" type="radio" name="nivel" defaultChecked hidden />
                    <label htmlFor="niv-bajo">Bajo</label>
                  </span>
                  <span>
                    <input id="niv-intermedio" type="radio" name="nivel" hidden />
                    <label htmlFor="niv-intermedio">Intermedio</label>
                  </span>
                  <span>
                    <input id="niv-avanzado" type="radio" name="nivel" hidden />
                    <label htmlFor="niv-avanzado">Avanzado</label>
                  </span>
                </div>
              </div>
              */}

            <h3 className="card__title" style={{ marginTop: 10 }}>Ejercicios seleccionados</h3>
            <ul className="selected-list">
              {selectedExercises.length > 0 ? selectedExercises.map((ex) => (
                <li className="selected-item" key={ex.id}>
                  <img className="selected-thumb" src={ex.gif_url} alt={ex.nombre} />
                  <div className="selected-body">
                    <h3 className="selected-name">{ex.nombre}</h3>
                  </div>
                </li>
              )) : (
                <li className="empty">Todavía no has añadido ejercicios.</li>
              )}
            </ul>

            <h3 className="card__title" style={{ marginTop: 1 }}>Alimentos seleccionados</h3>
            <ul className="selected-list">
              {selectedFoods.length > 0 ? selectedFoods.map((food) => (
                <li className="selected-item" key={food.id}>
                  <img className="selected-thumb" src={food.imagen} alt={food.nombre} />
                  <div className="selected-body">
                    <h3 className="selected-name">{food.nombre}</h3>
                  </div>
                </li>
              )) : (
                <li className="empty">Todavía no has añadido Alimentos.</li>
              )}
            </ul>

            <div className="actions-bar">
              <button className="btn btn--ghost" type="button" onClick={() => router.push("/workout-u")}>
                Cancelar
              </button>
              <button className="btn btn--primary" type="button" disabled>
                Guardar rutina
              </button>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
