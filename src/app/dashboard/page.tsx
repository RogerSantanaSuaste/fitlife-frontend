import Link from "next/link";

export default function DashboardPage() {
  // Datos de ejemplo (cámbialos por los reales)
  const rutinas: {
    id: string;
    nombre: string;
    dias: string[];
    ejercicios: unknown[]; // snapshots
    alimentos: unknown[];  // snapshots
  }[] = [
      {
        id: "r-001",
        nombre: "Mi rutina de fuerza",
        dias: ["lunes", "miercoles", "viernes"],
        ejercicios: [{}, {}, {}, {}],
        alimentos: [{}, {}],
      },
      {
        id: "r-002",
        nombre: "Cardio ligero",
        dias: ["martes", "jueves"],
        ejercicios: [{}, {}, {}],
        alimentos: [{}],
      },
      {
        id: "r-003",
        nombre: "Movilidad & Core",
        dias: ["sabado"],
        ejercicios: [{}, {}, {}, {}, {}],
        alimentos: [{}],
      },
    ];

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

        {/* Tabs (solo rutinas) */}
        <input type="radio" id="tabRut" name="tab" defaultChecked hidden />
        <nav className="tabs">
          <label className="tab" htmlFor="tabRut">Rutinas</label>
        </nav>

        {/* LISTA RUTINAS */}
        <section id="tab-rutinas" className="cards is-visible">
          {rutinas.map((r) => (
            <article className="card" key={r.id}>
              <header className="card__head">
                <h3 className="card__title">{r.nombre}</h3>

                {/* ❤️ favorito visual (CSS-only) */}
                <input type="checkbox" id={`fav-${r.id}`} className="fav" hidden />
                <label htmlFor={`fav-${r.id}`} className="icon-like" aria-label="Favorito">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </label>
              </header>

              <p className="card__text" style={{ marginBottom: 8 }}>
                {r.ejercicios.length} ejercicios • {r.alimentos.length} comidas
              </p>

              <div className="meta">
                <span className="badge">
                  {r.dias.length} día{r.dias.length !== 1 ? "s" : ""}
                </span>
                <span className="chips" style={{ flexWrap: "wrap" }}>
                  {r.dias.map((d, i) => (
                    <span className="chip" key={`${r.id}-d-${i}`} style={{ textTransform: "capitalize" }}>
                      {d}
                    </span>
                  ))}
                </span>
              </div>

              <div className="actions">
                {/* 👉 Redirige a /workout (sin id) */}
                <Link href="/workout" className="btn btn--ghost btn--pill btn--with-icon" aria-label="Ver rutina">
                  <span>Ver</span>
                 
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
