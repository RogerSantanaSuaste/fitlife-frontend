"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(true); // mostrar/ocultar sidebar (móvil)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useState(() => {
    const session = localStorage.getItem("userSession");
    if (session) {
      try {
        const user = JSON.parse(session);
        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");
      } catch (error: any) {
        console.error("Error parsing user session:", error.message);
        alert(`Error al obtener la sesión del usuario: ${error.message}`);
       }
    }
  });

  return (
    <>
      {/* SIDEBAR */}
      <aside className={`sidebar ${open ? "" : "hidden"}`}>
        <div className="logo-placeholder">
          {/* Pon el logo en /public/fit.png */}
          <img src="/fit.png" alt="Logo FitLife" />
        </div>

        <nav className="nav-menu">
          <Link href="/dashboard" className="nav-item">Inicio</Link>
          <Link href="/workout-u" className="nav-item">Mis Rutinas</Link>
          <Link href="#" className="nav-item">Mis Estadísticas</Link>
          <Link href="/reminder" className="nav-item">Recordatorios</Link>
          <Link href="/health-data" className="nav-item">Datos Salud</Link>
        </nav>

        <div className="nav-bottom">
          <Link href="/logout" className="nav-item logout">
            <svg className="power-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
              <line x1="12" y1="2" x2="12" y2="12"></line>
            </svg>
            Salida
          </Link>
        </div>
      </aside>

      {/* HEADER SUPERIOR */}
      <header className="top-bar">
        {/* botón hamburguesa para móvil */}
        <button
          className="menu-toggle"
          aria-label="Abrir/cerrar menú"
          onClick={() => setOpen(v => !v)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </button>

        {/* buscador */}
        {/*<div className="search-container">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input type="text" className="search-input" placeholder="Buscar" aria-label="Buscar" />
        </div>*/}

        {/* usuario */}
        <div className="user-profile">
          <div className="user-avatar" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="user-info">
            <div className="user-name">{firstName} {lastName}</div>
            <div className="user-role">Usuario</div>
          </div>
        </div>
      </header>
    </>
  );
}
