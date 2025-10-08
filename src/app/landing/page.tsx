// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <>
      {/* HEADER */}
      <header className="lp-header">
        <div className="lp-container lp-header__inner">
          <Link href="/" className="lp-brand">
            <Image
              className="lp-logo"
              src=""
              alt="Logo FitLife"
              width={36}
              height={36}
              priority
            />
            <span className="lp-brand__name" />
          </Link>

          <nav className="lp-nav">
            <Link href="/register" className="btn btn--ghost btn--pill">
              Regístrate
            </Link>
            <Link href="/login" className="btn btn--primary btn--pill">
              Empieza
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="lp-container hero__grid">
          <div className="hero__copy">
            <h1 className="hero__title">
              Transforma tu bienestar con <span>FitLife</span>
            </h1>
            <p className="hero__subtitle">
              Planes de ejercicio personalizados, nutrición inteligente y
              recordatorios que te mantienen motivado.
            </p>

            <div className="hero__cta">
              <Link href="/register" className="btn btn--primary btn--lg">
                Comenzar gratis
              </Link>
            </div>
          </div>

          <figure className="hero__media">
            <Image
              className="hero__img"
              src="/assets/img/landing-hero.png"
              alt="Vista previa de la app"
              width={720}
              height={520}
              priority
            />
          </figure>
        </div>
      </section>

      {/* SECCIÓN OSCURA: beneficios */}
      <section className="dark">
        <div className="lp-container dark__grid">
          <ul className="benefits">
            <li className="benefit">
              <span className="benefit__dot" />
              Planes de ejercicio personalizados adaptados a tu nivel y objetivos.
            </li>
            <li className="benefit">
              <span className="benefit__dot" />
              Recomendaciones nutricionales automáticas para mejorar tu alimentación.
            </li>
            <li className="benefit">
              <span className="benefit__dot" />
              Recordatorios inteligentes que te ayudan a no perder el ritmo.
            </li>
            <li className="benefit">
              <span className="benefit__dot" />
              Eventos y comunidad para mantener la motivación y compartir logros.
            </li>
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <div className="lp-container how__grid">
          <div className="how__copy">
            <h2 className="how__title">Así funciona FitLife</h2>
            <p className="how__text">
              No esperes más para sentirte mejor. FitLife te acompaña paso a paso
              en tu camino al bienestar.
            </p>
            <Link href="/registro" className="btn btn--primary btn--pill">
              Empieza ya
            </Link>
          </div>

          <ol className="steps">
            <li className="step">
              <div className="step__num">1</div>
              <div>
                <h3 className="step__title">Crea tu perfil</h3>
                <p className="step__text">Establece tus metas y preferencias.</p>
              </div>
            </li>
            <li className="step">
              <div className="step__num">2</div>
              <div>
                <h3 className="step__title">Recibe tu plan</h3>
                <p className="step__text">
                  Entrenamiento y nutrición personalizados al instante.
                </p>
              </div>
            </li>
            <li className="step">
              <div className="step__num">3</div>
              <div>
                <h3 className="step__title">Organiza tu día</h3>
                <p className="step__text">Activa recordatorios y mantén el hábito.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Acerca de</h3>
            <ul className="footer-links">
              <li><a href="#">Nosotros</a></li>
              <li><a href="#">Historia</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Recursos</h3>
            <ul className="footer-links">
              <li><a href="#">Documentación</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Legal</h3>
            <ul className="footer-links">
              <li><a href="#">Privacidad</a></li>
              <li><a href="#">Términos</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Síguenos</h3>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a4.935 4.935 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 FitLife. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}
