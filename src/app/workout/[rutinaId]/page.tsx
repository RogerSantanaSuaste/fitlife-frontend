"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Routine } from "@/models/routines";
import { routinesController } from "@/controllers/routinesController";

export default function WorkoutSinglePage() {
  // Primer paso, obtener el ID de la rutina desde los parámetros de la URL
  const { rutinaId } = useParams();
  const [rutina, setRutina] = useState<Routine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchRutina = async () => {
      try {
        if (!rutinaId) {
          setError("ID de rutina no proporcionado");
          alert("ID de rutina no proporcionado");
          return;
        }
        setLoading(true);
        const rutinaIdStr = Array.isArray(rutinaId) ? rutinaId[0] : rutinaId;
        const rutinaData = await routinesController.getRoutineDetails(rutinaIdStr);
        setRutina(rutinaData);
      } catch (error: any) {
        setError(error.message || "Error al obtener la rutina");
        alert(error.message || "Error al obtener la rutina");
      }
    }
    fetchRutina();
  }, [rutinaId]);
  // ⚠️ Ejemplo local — puedes traerlo del servidor/DB
  /*
  const rutina = {
    id: "f6a7b8c9-d0e1-2345-6789-0abcdef12345",
    nombre: "Núcleo de Acero",
    dias: ["MARTES", "JUEVES", "SABADO"],
    ejercicios: [
      {
        id: "ex-015",
        nombre: "Plancha",
        categoria: "CORE",
        contraindicaciones: ["PROBLEMAS_ESPALDA_BAJA", "HERNIA"],
        nivel: ["BAJO"],
        series_recomendadas: 3,
        repeticiones_recomendadas: 60,
        gifUrl:
          "https://fitcron.com/wp-content/uploads/2021/04/04631301-Front-Plank_waist-FIX_720.gif",
        musculo_principal: "Recto abdominal",
        musculo_secundario: "Oblicuos, Transverso, Erector espinal",
        instrucciones: [
          "Apoya antebrazos y puntas de pies",
          "Cuerpo en línea recta",
          "Contrae abdomen",
          "Mantén posición sin arquear espalda",
        ],
      },
      {
        id: "ex-014",
        nombre: "Escalador de Montaña",
        categoria: "CARDIO",
        contraindicaciones: ["PROBLEMAS_CARDIACOS", "LESION_HOMBRO", "PROBLEMAS_MUNECA"],
        nivel: ["BAJO"],
        series_recomendadas: 3,
        repeticiones_recomendadas: 30,
        gifUrl: "https://static.exercisedb.dev/media/RJgzwny.gif",
        musculo_principal: "Sistema cardiovascular",
        musculo_secundario: "Core, Hombros, Tríceps",
        instrucciones: [
          "Plancha alta con manos bajo hombros",
          "Rodilla derecha al pecho",
          "Alterna con la izquierda",
          "Mantén caderas bajas y core activo",
        ],
      },
      {
        id: "ex-006",
        nombre: "Giro 360",
        categoria: "CARDIO",
        contraindicaciones: ["PROBLEMAS_ESPALDA", "LESION_HOMBRO"],
        nivel: ["BAJO"],
        series_recomendadas: 3,
        repeticiones_recomendadas: 12,
        gifUrl: "https://static.exercisedb.dev/media/tnaj0mT.gif",
        musculo_principal: "Sistema cardiovascular",
        musculo_secundario: "Hombros, Core",
        instrucciones: [
          "Pies al ancho de hombros",
          "Brazos rectos al frente",
          "Activa el core y haz el giro",
        ],
      },
    ],
    alimentos: [
      {
        id: "food-014",
        nombre: "Yogur Griego",
        categoria: "PROTEINA",
        alergenos: ["LACTEOS"],
        imagen:
          "https://cocinista.b-cdn.net/download/bancorecursos/recetas/receta-yogur-griego.jpg",
        calorias: 59,
        proteinas: 10,
      },
      {
        id: "food-012",
        nombre: "Espinacas",
        categoria: "VEGETAL",
        alergenos: ["NINGUNO"],
        imagen: "https://www.gob.mx/cms/uploads/article/main_image/11271/espinass.jpg",
        calorias: 23,
        proteinas: 2.9,
      },
      {
        id: "food-004",
        nombre: "Aguacate",
        categoria: "GRASA",
        alergenos: ["NINGUNO"],
        imagen: "https://exoticfruitbox.com/wp-content/uploads/2015/10/aguacate.jpg",
        calorias: 160,
        proteinas: 2,
      },
    ],
  };
  
  */

  return (
    <main className="app-content">
      <div className="content-wrap">
        {loading && <p>Cargando rutina...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && rutina && (
          // === SECCIÓN ÚNICA ===
          <section className="workout-one">
        {/* Head */}
        <div className="one-head">
          <div>
            <h1 className="one-title">{rutina?.nombre}</h1>
            <p className="one-sub">Rutina publicada</p>
          </div>


        </div>

        {/* Meta / Resumen */}
        <div className="one-meta">
          <span className="badge">{rutina?.ejercicios.length} ejercicios</span>
          <span className="badge badge--hollow">{rutina?.alimentos.length} alimentos</span>
          <div className="chips">
            {rutina?.dias.map((d) => (
              <span key={d} className="chip" style={{ textTransform: "capitalize" }}>
                {d.toLowerCase()}
              </span>
            ))}
          </div>
        </div>

        <hr className="one-sep" />

        {/* Ejercicios */}
        <h2 className="block-title">Ejercicios</h2>
        <div className="ex-list">
          {rutina?.ejercicios.map((ex) => (
            <article className="ex-item" key={ex.id}>
              <img className="ex-thumb" src={ex.gif_url} alt={ex.nombre} />
              <div className="ex-body">
                <header className="ex-head">
                  <h3 className="ex-name">{ex.nombre}</h3>
                  <div className="ex-badges">
                    <span className="badge">{ex.categoria}</span>
                    <span className="badge badge--hollow">Series: {ex.series_recomendadas}</span>
                    <span className="badge badge--hollow">Reps: {ex.repeticiones_recomendadas}</span>
                    <span className="badge badge--dark">Nivel: {ex.nivel}</span>
                  </div>
                </header>

                <div className="meta-row">
                  <span className="meta-label">Músculo principal:</span>
                  <span className="meta-value">{ex.musculo_principal}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Secundario:</span>
                  <span className="meta-value">{ex.musculo_secundario}</span>
                </div>

                {ex.contraindicaciones.length > 0 && (
                  <div className="contras">
                    {ex.contraindicaciones.map((c) => (
                      <span className="contra" key={c}>
                        {c.toLowerCase().replaceAll("_", " ")}
                      </span>
                    ))}
                  </div>
                )}

                {ex.instrucciones?.length > 0 && (
                  <ol className="steps">
                    {ex.instrucciones.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Alimentos */}
        {rutina && rutina?.alimentos.length > 0 && (
          <>
            <h2 className="block-title">Alimentos</h2>
            <div className="food-list">
              {rutina.alimentos.map((f) => (
                <article className="food-item" key={f.id}>
                  <img className="food-thumb" src={f.imagen} alt={f.nombre} />
                  <div className="food-body">
                    <h3 className="food-title">{f.nombre}</h3>
                    <div className="food-tags">
                      <span className="tag">{f.categoria}</span>
                      {"calorias" in f && f.calorias != null && (
                        <span className="tag tag--kcal">{f.calorias} kcal</span>
                      )}
                      {"proteinas" in f && f.proteinas != null && (
                        <span className="tag">Prot: {f.proteinas}g</span>
                      )}
                      {f.alergenos?.length > 0 && (
                        <span className="tag">
                          {f.alergenos[0].toLowerCase().replaceAll("_", " ")}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
        )}
    </div>
    </main >
  );
}
