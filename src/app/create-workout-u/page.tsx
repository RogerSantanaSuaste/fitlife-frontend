"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { healthController } from "@/controllers/healthController"
import { routineManagerController } from "@/controllers/routineManagerController"
import type { Food } from "@/models/foods"
import type { Exercise } from "@/models/exercises"

export default function CreateWorkoutUPage() {
  const router = useRouter()
  const [recommendedFoods, setRecommendedFoods] = useState<Food[] | null>(null)
  const [recommendedExercises, setRecommendedExercises] = useState<Exercise[] | null>(null)
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([])
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])
  const [nombre, setNombre] = useState<string>("")
  const [userId, setUserId] = useState<string | null>(null)
  const [dias, setDias] = useState<("LUNES" | "MARTES" | "MIERCOLES" | "JUEVES" | "VIERNES" | "SABADO" | "DOMINGO")[]>([
    "LUNES",
    "MIERCOLES",
    "VIERNES",
  ])
  const [activeTab, setActiveTab] = useState<"exercises" | "foods">("exercises")

  useEffect(() => {
    const session = localStorage.getItem("userSession")
    if (session) {
      try {
        const user = JSON.parse(session)
        setUserId(user.userId || null)
      } catch (error: any) {
        console.error("Error parsing user session:", error.message)
        alert(`Error al obtener la sesión del usuario: ${error.message}`)
      }
    }
  }, [])

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (!userId) return
        const recommendations = await healthController.getRecommendedFoodsAndExercises(userId)
        setRecommendedFoods(recommendations.alimentos)
        setRecommendedExercises(recommendations.ejercicios)
      } catch (error) {
        console.error("Error al obtener recomendaciones:", error)
      }
    }

    fetchRecommendations()
  }, [userId])

  const saveRoutine = async () => {
    if (!userId) return

    const routineData = {
      usuario_id: userId,
      nombre,
      dias,
      ejercicios: selectedExercises,
      alimentos: selectedFoods,
    }

    try {
      await routineManagerController.createRoutine(routineData)
      alert("Rutina guardada con éxito")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error al guardar la rutina:", error)
      alert("Error al guardar la rutina")
    }
  }

  const removeExercise = (id: string) => {
    setSelectedExercises((prev) => prev.filter((ex) => ex.id !== id))
  }

  const removeFo = (id: string) => {
    setSelectedFoods((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <main className="app-content" role="main">
      <div className="content-wrap">
        <header className="section-head">
          <div>
            <h1 className="section-title">Crear rutina</h1>
            <p className="section-subtitle">Selecciona ejercicios y alimentos para crear tu rutina personalizada</p>
          </div>
        </header>

        <section className="builder-grid">
          <aside className="catalog">
            <div className="catalog-head">
              <div className="tab-group">
                <button
                  className={`tab-btn ${activeTab === "exercises" ? "active" : ""}`}
                  onClick={() => setActiveTab("exercises")}
                  type="button"
                >
                  <svg className="tab-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Ejercicios
                  {recommendedExercises && recommendedExercises.length > 0 && (
                    <span className="tab-badge">{recommendedExercises.length}</span>
                  )}
                </button>
                <button
                  className={`tab-btn ${activeTab === "foods" ? "active" : ""}`}
                  onClick={() => setActiveTab("foods")}
                  type="button"
                >
                  <svg className="tab-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Alimentos
                  {recommendedFoods && recommendedFoods.length > 0 && (
                    <span className="tab-badge">{recommendedFoods.length}</span>
                  )}
                </button>
              </div>
            </div>

            {activeTab === "exercises" && (
              <ul className="catalog-list">
                {recommendedExercises && recommendedExercises.length > 0 ? (
                  recommendedExercises.map((ex) => (
                    <li className="catalog-item" key={ex.id}>
                      <div className="catalog-media">
                        <img className="catalog-thumb" src={ex.gif_url || "/placeholder.svg"} alt={ex.nombre} />
                      </div>
                      <div className="catalog-body">
                        <h3 className="catalog-name">{ex.nombre}</h3>
                        <div className="catalog-meta">
                          <span className="meta-badge meta-badge--category">{ex.categoria}</span>
                          <span className="meta-badge meta-badge--level">{ex.nivel}</span>
                        </div>
                        <div className="catalog-stats">
                          <div className="stat-item">
                            <span className="stat-label">Series</span>
                            <span className="stat-value">{ex.series_recomendadas}</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Reps</span>
                            <span className="stat-value">{ex.repeticiones_recomendadas}</span>
                          </div>
                        </div>
                        <div className="catalog-details">
                          <div className="detail-row">
                            <span className="detail-label">Músculo principal:</span>
                            <span className="detail-value">{ex.musculo_principal}</span>
                          </div>
                          {ex.musculo_secundario && (
                            <div className="detail-row">
                              <span className="detail-label">Músculo secundario:</span>
                              <span className="detail-value">{ex.musculo_secundario}</span>
                            </div>
                          )}
                        </div>
                        <button
                          className="btn btn--small btn--primary btn--add"
                          type="button"
                          onClick={() =>
                            setSelectedExercises((prev) => {
                              if (prev.find((e) => e.id === ex.id)) return prev
                              return [...prev, ex]
                            })
                          }
                          disabled={selectedExercises.some((e) => e.id === ex.id)}
                        >
                          {selectedExercises.some((e) => e.id === ex.id) ? (
                            <>
                              <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Añadido
                            </>
                          ) : (
                            <>
                              <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              Añadir
                            </>
                          )}
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="empty-state">
                    <svg className="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <p className="empty-text">No hay ejercicios recomendados</p>
                  </li>
                )}
              </ul>
            )}

            {activeTab === "foods" && (
              <ul className="catalog-list">
                {recommendedFoods && recommendedFoods.length > 0 ? (
                  recommendedFoods.map((food) => (
                    <li className="catalog-item catalog-item--food" key={food.id}>
                      <div className="catalog-media">
                        <img className="catalog-thumb" src={food.imagen || "/placeholder.svg"} alt={food.nombre} />
                      </div>
                      <div className="catalog-body">
                        <h3 className="catalog-name">{food.nombre}</h3>
                        <button
                          className="btn btn--small btn--primary btn--add"
                          type="button"
                          onClick={() =>
                            setSelectedFoods((prev) => {
                              if (prev.find((f) => f.id === food.id)) return prev
                              return [...prev, food]
                            })
                          }
                          disabled={selectedFoods.some((f) => f.id === food.id)}
                        >
                          {selectedFoods.some((f) => f.id === food.id) ? (
                            <>
                              <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Añadido
                            </>
                          ) : (
                            <>
                              <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              Añadir
                            </>
                          )}
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="empty-state">
                    <svg className="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <p className="empty-text">No hay alimentos recomendados</p>
                  </li>
                )}
              </ul>
            )}
          </aside>

          <section className="card builder">
            <div className="builder-header">
              <h2 className="builder-title">Tu rutina</h2>
              <p className="builder-subtitle">Configura los detalles de tu rutina personalizada</p>
            </div>

            <div className="form-group">
              <label className="form-label">Nombre de la rutina</label>
              <input
                className="form-input"
                placeholder="Ej. Full Body Express"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="divider" />

            <div className="selected-section">
              <div className="selected-header">
                <h3 className="selected-title">
                  <svg className="selected-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Ejercicios
                  {selectedExercises.length > 0 && <span className="selected-count">{selectedExercises.length}</span>}
                </h3>
              </div>
              <ul className="selected-list">
                {selectedExercises.length > 0 ? (
                  selectedExercises.map((ex) => (
                    <li className="selected-item" key={ex.id}>
                      <img className="selected-thumb" src={ex.gif_url || "/placeholder.svg"} alt={ex.nombre} />
                      <div className="selected-body">
                        <h4 className="selected-name">{ex.nombre}</h4>
                        <p className="selected-meta">
                          {ex.categoria} • {ex.nivel}
                        </p>
                      </div>
                      <button
                        className="btn-remove"
                        type="button"
                        onClick={() => removeExercise(ex.id)}
                        aria-label="Eliminar ejercicio"
                      >
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="empty-state empty-state--compact">
                    <p className="empty-text">Añade ejercicios desde el catálogo</p>
                  </li>
                )}
              </ul>
            </div>

            <div className="divider" />

            <div className="selected-section">
              <div className="selected-header">
                <h3 className="selected-title">
                  <svg className="selected-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Alimentos
                  {selectedFoods.length > 0 && <span className="selected-count">{selectedFoods.length}</span>}
                </h3>
              </div>
              <ul className="selected-list">
                {selectedFoods.length > 0 ? (
                  selectedFoods.map((food) => (
                    <li className="selected-item" key={food.id}>
                      <img className="selected-thumb" src={food.imagen || "/placeholder.svg"} alt={food.nombre} />
                      <div className="selected-body">
                        <h4 className="selected-name">{food.nombre}</h4>
                      </div>
                      <button
                        className="btn-remove"
                        type="button"
                        onClick={() => removeFo(food.id)}
                        aria-label="Eliminar alimento"
                      >
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="empty-state empty-state--compact">
                    <p className="empty-text">Añade alimentos desde el catálogo</p>
                  </li>
                )}
              </ul>
            </div>

            <div className="actions-bar">
              <button className="btn btn--ghost" type="button" onClick={() => router.push("/workout-u")}>
                Cancelar
              </button>
              <button
                className="btn btn--primary"
                type="button"
                onClick={saveRoutine}
                disabled={!nombre || (selectedExercises.length === 0 && selectedFoods.length === 0)}
              >
                <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Guardar rutina
              </button>
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}
