"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation"; // ⬅️ para redirigir

type CatalogItem = { id: string; name: string } | string;

function normalize(items: CatalogItem[]): { id: string; name: string }[] {
  return items.map((it) =>
    typeof it === "string" ? { id: it, name: it } : { id: it.id, name: it.name }
  );
}

export default function CuestionarioPage() {
  const router = useRouter(); // ⬅️

  // form state
  const [peso, setPeso] = useState<string>("");
  const [estatura, setEstatura] = useState<string>("");
  const [nivel, setNivel] =
    useState<"BAJO" | "INTERMEDIO" | "AVANZADO">("BAJO");

  // catálogos desde BD
  const [alergiasCat, setAlergiasCat] = useState<{ id: string; name: string }[]>(
    []
  );
  const [condicionesCat, setCondicionesCat] = useState<
    { id: string; name: string }[]
  >([]);
  const [loadingCats, setLoadingCats] = useState(true);

  // selección
  const [alergiasSel, setAlergiasSel] = useState<string[]>([]);
  const [condSel, setCondSel] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [aRes, cRes] = await Promise.all([
          fetch("/api/catalogs/alergias"),
          fetch("/api/catalogs/condiciones"),
        ]);
        const aJson = aRes.ok ? await aRes.json() : [];
        const cJson = cRes.ok ? await cRes.json() : [];

        const alergias = normalize(aJson?.items ?? aJson ?? []);
        const condiciones = normalize(cJson?.items ?? cJson ?? []);

        setAlergiasCat(
          alergias.length
            ? alergias
            : normalize(["Lácteos", "Gluten", "Cacahuate", "Mariscos", "Huevo"])
        );
        setCondicionesCat(
          condiciones.length
            ? condiciones
            : normalize(["Asma", "Lesión de rodilla", "Dolor lumbar", "Hipertensión"])
        );
      } catch {
        setAlergiasCat(
          normalize(["Lácteos", "Gluten", "Cacahuate", "Mariscos", "Huevo"])
        );
        setCondicionesCat(
          normalize(["Asma", "Lesión de rodilla", "Dolor lumbar", "Hipertensión"])
        );
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

    const res = await fetch("/api/cuestionario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/dashboard"); // ⬅️ redirección
    }
  };

  return (
    <main className="app-content" role="main">
      <div className="content-wrap">
        {/* Cabecera centrada */}
        <header className="section-head section-head--center">
          <h1 className="section-title">Cuestionario inicial</h1>
          <p className="section-subtitle">
            Necesitamos estos datos para poder ayudarte con tus rutinas y
            recomendaciones.
          </p>
        </header>

        {/* Contenido centrado vertical/horizontal */}
        <div className="center-page">
          <form className="form-card form-card--wide" onSubmit={onSubmit} noValidate>
            {/* GRID: números */}
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
                    step="0.1"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    required
                    aria-invalid={peso !== "" && !pesoOK}
                  />
                  <span className="unit">kg</span>
                </div>
                {!pesoOK && peso !== "" && (
                  <small className="hint error">Rango válido: 20 a 400 kg.</small>
                )}
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
                    step="1"
                    value={estatura}
                    onChange={(e) => setEstatura(e.target.value)}
                    required
                    aria-invalid={estatura !== "" && !estOK}
                  />
                  <span className="unit">cm</span>
                </div>
                {!estOK && estatura !== "" && (
                  <small className="hint error">Rango válido: 100 a 250 cm.</small>
                )}
              </div>
            </div>

            {/* NIVEL */}
            <div className="form-group">
              <span className="form-label">Nivel</span>
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
            </div>

            {/* Alergias */}
            <div className="form-group">
              <span className="form-label">Alergias</span>
              <div className="chips-list">
                {loadingCats ? (
                  <span className="hint">Cargando alergias…</span>
                ) : (
                  alergiasCat.map((a) => (
                    <div key={a.id} className="chip-check">
                      <input
                        type="checkbox"
                        id={`al-${a.id}`}
                        checked={alergiasSel.includes(a.name)}
                        onChange={() =>
                          setAlergiasSel((arr) => toggleArray(arr, a.name))
                        }
                        hidden
                      />
                      <label htmlFor={`al-${a.id}`} className="chip">
                        {a.name}
                      </label>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Condiciones */}
            <div className="form-group">
              <span className="form-label">Condición física</span>
              <div className="chips-list">
                {loadingCats ? (
                  <span className="hint">Cargando condiciones…</span>
                ) : (
                  condicionesCat.map((c) => (
                    <div key={c.id} className="chip-check">
                      <input
                        type="checkbox"
                        id={`cf-${c.id}`}
                        checked={condSel.includes(c.name)}
                        onChange={() => setCondSel((arr) => toggleArray(arr, c.name))}
                        hidden
                      />
                      <label htmlFor={`cf-${c.id}`} className="chip">
                        {c.name}
                      </label>
                    </div>
                  ))
                )}
              </div>
              <small className="hint">Selecciona todas las que apliquen.</small>
            </div>

            <div className="form-actions" style={{ textAlign: "center" }}>
              <button type="submit" className="login-button" disabled={!canSubmit}>
                Guardar datos
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
