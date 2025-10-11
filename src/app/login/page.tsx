"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogInSchema, LogInInput } from "@/models/userLogin";
import { LogInController } from "@/controllers/logInController";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true); // dispara animaciones de entrada
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simula login (cámbialo por tu lógica real)
    const data = new FormData(e.currentTarget);
    const payload: LogInInput = {
      email: String(data.get("email") || ""),
      password: String(data.get("password") || ""),
      returnSecureToken: true,
    };
    LogInController.LogIn(payload)
      .then((response) => {
        console.log("Login successful:", response);
        // Redirige a /questionnaire para continuar obteniendo los datos de salud del usuario.
        window.location.href = "/questionnaire";
      })
      .catch((error) => {
        console.error("Login failed:", error);
        alert(`Error en el inicio de sesión: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="login-page">
      {/* Formas decorativas de fondo */}
      <div className="background-shapes" aria-hidden>
        <div className={`shape shape-1 ${mounted ? "enter" : ""}`} />
        <div className={`shape shape-2 ${mounted ? "enter" : ""}`} />
        <div className={`shape shape-3 ${mounted ? "enter" : ""}`} />
        <div className={`shape shape-4 ${mounted ? "enter" : ""}`} />
      </div>

      {/* Contenedor del formulario */}
      <div className="login-container">
        <div className={`login-card ${mounted ? "enter" : ""}`}>
          <h1 className="login-title">Inicio De Sesión</h1>
          <p className="login-subtitle">
            Por favor ingrese su email y contraseña para continuar
          </p>

          <form className="login-form" id="loginForm" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="diegoboston@gmail.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="••••••"
                required
              />
            </div>

            <div className="form-checkbox">
              <input type="checkbox" id="remember" className="checkbox-input" />
              <label htmlFor="remember" className="checkbox-label">
                Recuérdame
              </label>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Iniciando..." : "Iniciar Sesión"}
            </button>

            <p className="signup-link">
              ¿No tienes cuenta?{" "}
              <Link href="/register" className="signup-link-text">
                Crea una cuenta
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
