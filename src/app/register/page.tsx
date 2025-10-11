"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { registrationController } from "@/controllers/signUpController";

export default function RegistroPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const rawGender = String(data.get("genero") || "").toLowerCase();
    let gender: "masculino" | "femenino" | "otro" = "otro";
    if (rawGender === "masculino") gender = "masculino";
    else if (rawGender === "femenino") gender = "femenino";

    const payload = {
      firstName: String(data.get("nombre") || ""),
      lastName: String(data.get("apellido") || ""),
      email: String(data.get("email") || ""),
      password: String(data.get("password") || ""),
      gender,
      returnSecureToken: true,
    };
    const termsAccepted = data.get("terms");
    // Conecta aquí tu backend/Firebase
    try {
      // Llamar al controlador:
      const response = await registrationController.signUp(payload, Boolean(termsAccepted));
      console.log("Usuario registrado:", response);
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      // Redirigir a login
      window.location.href = "/login";
    } catch (error: any) {
      console.error("Error en el registro:", error.message);
      alert(`Error en el registro: ${error.message}`);
      setLoading(false);
    }
  };

  // Ripple con variables CSS
  const onRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    btn.style.setProperty("--ripple-x", `${x}px`);
    btn.style.setProperty("--ripple-y", `${y}px`);
    btn.style.setProperty("--ripple-size", `${size}px`);
    btn.classList.remove("is-rippling");
    void btn.offsetWidth; // reflow
    btn.classList.add("is-rippling");
  };

  return (
    <main className="register-page">
      {/* shapes de fondo */}
      <div className="background-shapes" aria-hidden>
        <div className={`shape shape-1 ${mounted ? "enter" : ""}`} />
        <div className={`shape shape-2 ${mounted ? "enter" : ""}`} />
        <div className={`shape shape-3 ${mounted ? "enter" : ""}`} />
        <div className={`shape shape-4 ${mounted ? "enter" : ""}`} />
      </div>

      {/* contenedor opcional (por si quieres centrar con grid) */}
      <div className="register-container">
        <div className={`register-card ${mounted ? "enter" : ""}`}>
          <h1 className="register-title">Regístrate</h1>
          <p className="register-subtitle">Crea una cuenta para continuar</p>

          <form className="register-form" onSubmit={onSubmit}>
            {/* Nombre + Apellido en dos columnas (responsive) */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  className="form-input"
                  placeholder="Diego"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="apellido">Apellido</label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  className="form-input"
                  placeholder="Ramírez"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Género */}
            <div className="form-group">
              <span className="form-label">Género</span>
              <div className="radio-group" role="radiogroup" aria-label="Género">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="genero"
                    value="femenino"
                    required
                    className="radio-input"
                  />
                  <span>Femenino</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="genero"
                    value="masculino"
                    className="radio-input"
                  />
                  <span>Masculino</span>
                </label>
              </div>
            </div>

            <div className="form-checkbox">
              <label className="checkbox-label">
                <input className="checkbox-input" id="terms" name="terms" type="checkbox" required />
                Acepto los términos y condiciones
              </label>
            </div>

            <button
              ref={btnRef}
              type="submit"
              className="register-button"
              onClick={onRipple}
              disabled={loading}
            >
              <span className="button-text">{loading ? "Creando..." : "Crear cuenta"}</span>
              <span className="button-ripple" aria-hidden />
            </button>

            <p className="login-link">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="login-link-text">Iniciar sesión</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
