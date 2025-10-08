"use client";

import { useRouter } from "next/navigation";


export default function CreateWorkoutUPage() {
  const router = useRouter();

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
              <select className="select" disabled>
                <option>Categoría</option>
              </select>
            </div>

            <ul className="catalog-list">
              <li className="empty">
                Aquí se listará tu catálogo de ejercicios cuando conectes la data.
              </li>
            </ul>
          </aside>

          {/* Constructor (placeholder) */}
          <section className="card builder">
            <div className="builder-row">
              <div className="form-group">
                <label className="form-label">Título</label>
                <input className="form-input" placeholder="Ej. Full Body Express" />
              </div>

              

              <div className="form-group">
                <label className="form-label">Duración</label>
                <div className="unit-input">
                  <input className="form-input" type="number" min={5} max={180} step={5} placeholder="25" />
                  <span className="unit">min</span>
                </div>
              </div>
            </div>

            <div className="divider" />
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

            <h3 className="card__title" style={{ marginTop: 10 }}>Ejercicios seleccionados</h3>
            <ul className="selected-list">
              <li className="empty">Todavía no has añadido ejercicios.</li>
            </ul>

            <h3 className="card__title" style={{ marginTop: 1 }}>Alimentos seleccionados</h3>
            <ul className="selected-list">
              <li className="empty">Todavía no has añadido Alimentos.</li>
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
