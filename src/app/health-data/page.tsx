
export default function AjustesCuestionarioPage() {
  return (
    <main className="app-content" role="main">
      <div className="content-wrap">
        {/* Encabezado */}
        <header className="section-head">
          <div>
            <h1 className="section-title">Ajustes del cuestionario</h1>
            <p className="section-subtitle">
              Actualiza tus datos para afinar tus rutinas y recomendaciones.
            </p>
          </div>
        </header>

        {/* GRID de tarjetas */}
        <section className="cards-grid">
          {/* Datos físicos */}
          <article className="card">
            <header className="card__head">
              <h2 className="card__title">Datos físicos</h2>
            </header>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="peso" className="form-label">Peso</label>
                <div className="unit-input">
                  <input
                    id="peso"
                    name="peso"
                    type="number"
                    inputMode="decimal"
                    className="form-input"
                    placeholder="Ej. 74"
                    min={20}
                    max={400}
                    step={0.1}
                    defaultValue=""
                  />
                  <span className="unit">kg</span>
                </div>
                <small className="hint">Rango recomendado: 20–400 kg.</small>
              </div>

              <div className="form-group">
                <label htmlFor="estatura" className="form-label">Estatura</label>
                <div className="unit-input">
                  <input
                    id="estatura"
                    name="estatura"
                    type="number"
                    inputMode="numeric"
                    className="form-input"
                    placeholder="Ej. 175"
                    min={100}
                    max={250}
                    step={1}
                    defaultValue=""
                  />
                  <span className="unit">cm</span>
                </div>
                <small className="hint">Rango recomendado: 100–250 cm.</small>
              </div>
            </div>

              {/*  <div className="stat">
              <div className="stat__title">IMC estimado</div>
              <div className="stat__value">—</div>
              <div className="stat__hint">Se calculará al guardar con tus datos.</div>
             
            </div>*/}
          </article>

          {/* Nivel */}
          <article className="card">
            <header className="card__head">
              <h2 className="card__title">Nivel</h2>
            </header>

            <div className="form-group">
              <div className="segmented" role="tablist" aria-label="Selecciona tu nivel">
                <input type="radio" id="niv-bajo" name="nivel" value="BAJO" hidden defaultChecked />
                <label htmlFor="niv-bajo">Bajo</label>

                <input type="radio" id="niv-intermedio" name="nivel" value="INTERMEDIO" hidden />
                <label htmlFor="niv-intermedio">Intermedio</label>

                <input type="radio" id="niv-avanzado" name="nivel" value="AVANZADO" hidden />
                <label htmlFor="niv-avanzado">Avanzado</label>
              </div>
              <small className="hint">Elige el que más te represente.</small>
            </div>
          </article>

          {/* Alergias */}
          <article className="card">
            <header className="card__head">
              <h2 className="card__title">Alergias</h2>
            </header>

            <div className="chips-list">
              {/* Reemplaza con tu catálogo si quieres */}
              {[
                ["al-lacteos", "Lácteos"],
                ["al-gluten", "Gluten"],
                ["al-cacahuate", "Cacahuate"],
                ["al-mariscos", "Mariscos"],
                ["al-huevo", "Huevo"],
                ["al-soya", "Soya"],
              ].map(([id, label]) => (
                <div key={id} className="chip-check">
                  <input type="checkbox" id={id} hidden />
                  <label className="chip" htmlFor={id}>{label}</label>
                </div>
              ))}
            </div>
          </article>

          {/* Condición física */}
          <article className="card">
            <header className="card__head">
              <h2 className="card__title">Condición física</h2>
            </header>

            <div className="chips-list">
              {[
                ["cf-asma", "Asma"],
                ["cf-rodilla", "Lesión de rodilla"],
                ["cf-lumbar", "Dolor lumbar"],
                ["cf-hipertension", "Hipertensión"],
              ].map(([id, label]) => (
                <div key={id} className="chip-check">
                  <input type="checkbox" id={id} hidden />
                  <label className="chip" htmlFor={id}>{label}</label>
                </div>
              ))}
            </div>

            <small className="hint">Selecciona todas las que apliquen.</small>
          </article>
        </section>

        {/* Acciones */}
        <div className="actions-bar">
          <button className="btn btn--ghost" type="button">Cancelar</button>
          <button className="btn btn--primary" type="submit">Guardar cambios</button>
        </div>
      </div>
    </main>
  );
}
