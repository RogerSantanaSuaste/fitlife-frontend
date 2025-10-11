"use client";
import React, { useState, useEffect, useMemo } from "react";
import { healthController } from "@/controllers/healthController";
import { allergiesConditionsController } from "@/controllers/allergiesConditionsController";
import { allergiesConditionsResponse } from "@/models/allergiesConditions";
import { Allergy } from "@/models/allergies";
import { Conditions } from "@/models/conditions";
import { useRouter } from "next/navigation";

export default function AjustesCuestionarioPage() {
  const router = useRouter();
  // formState
  const [peso, setPeso] = useState<string>("");
  const [estatura, setEstatura] = useState<string>("");
  const [nivel, setNivel] =
    useState<"BAJO" | "INTERMEDIO" | "AVANZADO">("BAJO");
  // catálogos desde BD
  const [loadingCats, setLoadingCats] = useState(false);
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [conditions, setConditions] = useState<Conditions[]>([]);
  // selección
  const [alergiasSel, setAlergiasSel] = useState<string[]>([]);
  const [condSel, setCondSel] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setLoadingCats(true);
        const cats: allergiesConditionsResponse = await allergiesConditionsController.getAllergiesConditions();
        setAllergies(cats.allergies);
        setConditions(cats.conditions);
      } catch (error) {
        alert("Error cargando catálogos de alergias y condiciones.");
        console.error(error);
      } finally {
        setLoadingCats(false);
      }
    })();
  }, []);

  // helpers
  const pesoOK = useMemo(() => {
    const v = Number(peso);
    return !isNaN(v) && v >= 20 && v <= 400;
  }, [peso]);
  const estOK = useMemo(() => {
    const v = Number(estatura);
    return !isNaN(v) && v >= 100 && v <= 250;
  }, [estatura]);
  const canSubmit = pesoOK && estOK && !loadingCats;
  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    const payload = {
      pesoKg: Number(peso),
      estaturaCm: Number(estatura),
      nivel,
      alergias: alergiasSel,
      condiciones: condSel,
    };

    try {
      const session = sessionStorage.getItem("userSession");
      if (!session) throw new Error("No user session found");
      const user = JSON.parse(session);
      const userId = user.userId;
      if (!userId) throw new Error("User ID not found in session");
      await healthController.sendHealthInfo(userId, payload);
      alert("¡Datos guardados con éxito!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error sending health info:", error);
      alert(`Error al enviar la información de salud: ${error.message}`);
    }
  };

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

        <form onSubmit={onSubmit} noValidate>
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
                      value={peso}
                      onChange={e => setPeso(e.target.value)}
                      required
                      aria-invalid={peso !== "" && !pesoOK}
                    />
                    <span className="unit">kg</span>
                  </div>
                  {!pesoOK && peso !== "" && (
                    <small className="hint error">Rango válido: 20 a 400 kg.</small>
                  )}
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
                      value={estatura}
                      onChange={e => setEstatura(e.target.value)}
                      required
                      aria-invalid={estatura !== "" && !estOK}
                    />
                    <span className="unit">cm</span>
                  </div>
                  {!estOK && estatura !== "" && (
                    <small className="hint error">Rango válido: 100 a 250 cm.</small>
                  )}
                  <small className="hint">Rango recomendado: 100–250 cm.</small>
                </div>
              </div>
            </article>

            {/* Nivel */}
            <article className="card">
              <header className="card__head">
                <h2 className="card__title">Nivel</h2>
              </header>

              <div className="form-group">
                <div className="segmented" role="tablist" aria-label="Selecciona tu nivel">
                  <input
                    type="radio"
                    id="niv-bajo"
                    name="nivel"
                    value="BAJO"
                    checked={nivel === "BAJO"}
                    onChange={() => setNivel("BAJO")}
                    hidden
                  />
                  <label htmlFor="niv-bajo">Bajo</label>

                  <input
                    type="radio"
                    id="niv-intermedio"
                    name="nivel"
                    value="INTERMEDIO"
                    checked={nivel === "INTERMEDIO"}
                    onChange={() => setNivel("INTERMEDIO")}
                    hidden
                  />
                  <label htmlFor="niv-intermedio">Intermedio</label>

                  <input
                    type="radio"
                    id="niv-avanzado"
                    name="nivel"
                    value="AVANZADO"
                    checked={nivel === "AVANZADO"}
                    onChange={() => setNivel("AVANZADO")}
                    hidden
                  />
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
                {loadingCats ? (
                  <span className="hint">Cargando alergias…</span>
                ) : (
                  allergies.map((allergy) => (
                    <div key={allergy.id} className="chip-check">
                      <input
                        type="checkbox"
                        id={`al-${allergy.id}`}
                        checked={alergiasSel.includes(allergy.slug)}
                        onChange={() => {
                          setAlergiasSel((arr) => toggleArray(arr, allergy.slug));
                        }}
                        hidden
                      />
                      <label className="chip" htmlFor={`al-${allergy.id}`}>
                        {allergy.name}
                      </label>
                    </div>
                  ))
                )}
              </div>
            </article>

            {/* Condición física */}
            <article className="card">
              <header className="card__head">
                <h2 className="card__title">Condición física</h2>
              </header>

              <div className="chips-list">
                {loadingCats ? (
                  <span className="hint">Cargando condiciones…</span>
                ) : (
                  conditions.map((condition) => (
                    <div key={condition.id} className="chip-check">
                      <input
                        type="checkbox"
                        id={`cf-${condition.id}`}
                        checked={condSel.includes(condition.slug)}
                        onChange={() => {
                          setCondSel((arr) => toggleArray(arr, condition.slug));
                        }}
                        hidden
                      />
                      <label className="chip" htmlFor={`cf-${condition.id}`}>
                        {condition.name}
                      </label>
                    </div>
                  ))
                )}
              </div>
              <small className="hint">Selecciona todas las que apliquen.</small>
            </article>
          </section>

          {/* Acciones */}
          <div className="actions-bar">
            <button className="btn btn--ghost" type="button" onClick={() => router.push("/dashboard")}>Cancelar</button>
            <button className="btn btn--primary" type="submit" disabled={!canSubmit}>Guardar cambios</button>
          </div>
        </form>
      </div>
    </main>
  );
}
